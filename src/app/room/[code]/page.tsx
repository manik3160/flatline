'use client';

import { useEffect, useState, useCallback, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/SupabaseProvider';
import { useGameStore } from '@/store/gameStore';
import { getSessionId } from '@/lib/utils';
import { LobbyScreen } from '@/components/game/LobbyScreen';
import { EkgLine } from '@/components/ui/EkgLine';
import type { PlayerRow, RoomRow, ScenarioCategory, GamePhase, VerdictResult } from '@/types';

interface RoomPageProps {
  params: Promise<{ code: string }>;
}

export default function RoomPage({ params }: RoomPageProps) {
  const { code: roomCode } = use(params);
  const router = useRouter();
  const supabase = useSupabase();
  const store = useGameStore();

  const [initialized, setInitialized] = useState(false);
  const [loadingError, setLoadingError] = useState('');

  // Initialize room data and player identity
  useEffect(() => {
    const init = async () => {
      const sessionId = getSessionId();

      // Fetch room
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('code', roomCode.toUpperCase())
        .single();

      if (roomError || !room) {
        setLoadingError('Room not found');
        return;
      }

      // Fetch players
      const { data: players } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', room.id)
        .order('created_at', { ascending: true });

      // Find this player
      const me = (players || []).find(
        (p: PlayerRow) => p.session_id === sessionId
      );

      if (!me) {
        // Not in this room — redirect to home
        router.push('/');
        return;
      }

      // Set store
      store.setIdentity({
        sessionId,
        playerId: me.id,
        playerName: me.name,
        character: me.character,
        isHost: me.is_host,
      });
      store.setRoom({
        roomCode: room.code,
        roomId: room.id,
        category: room.category as ScenarioCategory,
        totalRounds: room.total_rounds,
      });
      store.setPlayers((players || []) as PlayerRow[]);
      store.syncRoomData(room as RoomRow);

      // Determine phase from room status
      if (room.status === 'lobby') {
        store.setPhase('LOBBY');
      } else if (room.status === 'finished') {
        store.setPhase('GAME_OVER');
      }

      setInitialized(true);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomCode]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!initialized || !store.roomId) return;

    // Room changes
    const roomChannel = supabase
      .channel(`room-db-${roomCode}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `code=eq.${roomCode}`,
        },
        (payload) => {
          const newRoom = payload.new as RoomRow;
          store.syncRoomData(newRoom);
        }
      )
      .subscribe();

    // Player changes
    const playerChannel = supabase
      .channel(`players-db-${store.roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `room_id=eq.${store.roomId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            store.addPlayer(payload.new as PlayerRow);
          } else if (payload.eventType === 'UPDATE') {
            store.updatePlayer(payload.new as PlayerRow);
          }
        }
      )
      .subscribe();

    // Broadcast channel for game events
    const broadcastChannel = supabase
      .channel(`room:${roomCode}`)
      .on('broadcast', { event: 'PHASE_CHANGE' }, ({ payload }) => {
        if (payload?.phase) {
          store.setPhase(payload.phase as GamePhase);
          if (payload.roomData) {
            store.syncRoomData(payload.roomData as RoomRow);
          }
        }
      })
      .on('broadcast', { event: 'SCENARIO_DATA' }, ({ payload }) => {
        if (payload?.scenario) {
          store.setScenario(payload.scenario, payload.plotTwist, payload.roundId);
        }
      })
      .on('broadcast', { event: 'PLAYER_SUBMITTED' }, ({ payload }) => {
        if (payload?.playerId) {
          store.addSubmitted(payload.playerId);
        }
      })
      .on('broadcast', { event: 'VERDICT_REVEAL' }, ({ payload }) => {
        if (payload?.answers) {
          store.setVerdicts(
            payload.answers as VerdictResult[],
            payload.sharmaJiAnswer
          );
        }
      })
      .on('broadcast', { event: 'NEXT_ROUND' }, () => {
        store.resetRound();
      })
      .on('broadcast', { event: 'GAME_OVER' }, () => {
        store.setPhase('GAME_OVER');
      })
      .subscribe();

    return () => {
      roomChannel.unsubscribe();
      playerChannel.unsubscribe();
      broadcastChannel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, store.roomId, roomCode]);

  // ─── Host Actions ───
  const handleStartGame = useCallback(async () => {
    if (!store.isHost || !store.roomId) return;

    const activePlayers = store.players.filter((p) => p.is_active);
    if (activePlayers.length < 2) return;

    // Update room to playing
    await supabase
      .from('rooms')
      .update({ status: 'playing', current_round: 1 })
      .eq('id', store.roomId);

    // Generate first scenario
    const res = await fetch('/api/generate-scenario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: store.category,
        roomCode: store.roomCode,
        roundNumber: 1,
        playersCount: activePlayers.length,
      }),
    });

    const scenarioData = await res.json();

    if (res.ok) {
      // Broadcast countdown
      await supabase.channel(`room:${roomCode}`).send({
        type: 'broadcast',
        event: 'PHASE_CHANGE',
        payload: { phase: 'COUNTDOWN' },
      });

      store.setPhase('COUNTDOWN');

      // After 3s, show scenario
      setTimeout(async () => {
        // Broadcast scenario data
        await supabase.channel(`room:${roomCode}`).send({
          type: 'broadcast',
          event: 'SCENARIO_DATA',
          payload: {
            scenario: scenarioData.scenario,
            plotTwist: scenarioData.plotTwist,
            roundId: scenarioData.roundId,
          },
        });

        await supabase.channel(`room:${roomCode}`).send({
          type: 'broadcast',
          event: 'PHASE_CHANGE',
          payload: { phase: 'SCENARIO' },
        });

        store.setScenario(scenarioData.scenario, scenarioData.plotTwist, scenarioData.roundId);
        store.setPhase('SCENARIO');

        // After 5s read time, start answering
        setTimeout(async () => {
          // Set deadlines in DB
          const now = new Date();
          const answerDeadline = new Date(now.getTime() + 75 * 1000).toISOString();
          const plotTwistDeadline = new Date(now.getTime() + 45 * 1000).toISOString();

          await supabase
            .from('rooms')
            .update({ answer_deadline: answerDeadline, plot_twist_deadline: plotTwistDeadline })
            .eq('id', store.roomId);

          await supabase.channel(`room:${roomCode}`).send({
            type: 'broadcast',
            event: 'PHASE_CHANGE',
            payload: {
              phase: 'ANSWERING',
              roomData: { answer_deadline: answerDeadline, plot_twist_deadline: plotTwistDeadline },
            },
          });

          store.setPhase('ANSWERING');
          store.syncRoomData({
            answer_deadline: answerDeadline,
            plot_twist_deadline: plotTwistDeadline,
          } as Partial<RoomRow>);
        }, 5000);
      }, 3000);
    }
  }, [store, supabase, roomCode]);

  const handleUpdateSettings = useCallback(
    async (category: ScenarioCategory, rounds: number) => {
      if (!store.isHost || !store.roomId) return;

      await supabase
        .from('rooms')
        .update({ category, total_rounds: rounds })
        .eq('id', store.roomId);

      store.syncRoomData({ category, total_rounds: rounds } as Partial<RoomRow>);
    },
    [store, supabase]
  );

  // ─── Loading State ───
  if (loadingError) {
    return (
      <div className="game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', gap: '16px' }}>
        <h2 className="font-display" style={{ fontSize: '2rem', color: 'var(--red-flatline)' }}>
          FLATLINE
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>{loadingError}</p>
        <button className="btn btn-primary" onClick={() => router.push('/')}>
          GO HOME
        </button>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', gap: '16px' }}>
        <h2 className="font-display" style={{ fontSize: '2rem', color: 'var(--red-flatline)' }}>
          FLATLINE
        </h2>
        <EkgLine height={40} animationDuration={2} />
        <p className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          connecting...
        </p>
      </div>
    );
  }

  // ─── Render Phase ───
  return (
    <div className="game-container">
      {store.phase === 'LOBBY' && (
        <LobbyScreen
          onStartGame={handleStartGame}
          onUpdateSettings={handleUpdateSettings}
        />
      )}

      {store.phase === 'COUNTDOWN' && (
        <CountdownOverlay />
      )}

      {store.phase === 'SCENARIO' && (
        <ScenarioDisplay />
      )}

      {store.phase === 'ANSWERING' && (
        <AnsweringPhase roomCode={roomCode} />
      )}

      {store.phase === 'JUDGING' && (
        <JudgingDisplay />
      )}

      {store.phase === 'VERDICT_REVEAL' && (
        <VerdictRevealDisplay roomCode={roomCode} />
      )}

      {store.phase === 'SHARMA_JI' && (
        <SharmaJiDisplay roomCode={roomCode} />
      )}

      {store.phase === 'ROUND_SCORES' && (
        <RoundScoresDisplay roomCode={roomCode} />
      )}

      {store.phase === 'GAME_OVER' && (
        <GameOverDisplay />
      )}
    </div>
  );
}

// ─── Inline Phase Components (will be extracted later) ───

import { CountdownScreen } from '@/components/game/CountdownScreen';
import { ScenarioScreen } from '@/components/game/ScenarioScreen';
import { AnsweringScreen } from '@/components/game/AnsweringScreen';
import { JudgingScreen } from '@/components/game/JudgingScreen';
import { VerdictReveal } from '@/components/game/VerdictReveal';
import { SharmaJiReveal } from '@/components/game/SharmaJiReveal';
import { RoundScores } from '@/components/game/RoundScores';
import { GameOver } from '@/components/game/GameOver';

function CountdownOverlay() {
  return <CountdownScreen />;
}

function ScenarioDisplay() {
  const { scenario, currentRound, totalRounds, category } = useGameStore();
  return (
    <ScenarioScreen
      scenario={scenario || ''}
      roundNumber={currentRound}
      totalRounds={totalRounds}
      category={category}
    />
  );
}

function AnsweringPhase({ roomCode }: { roomCode: string }) {
  const store = useGameStore();
  const supabase = useSupabase();
  const timeUpTriggered = useRef(false);

  const handleSubmit = async () => {
    if (!store.playerId || !store.currentRoundId) return;

    store.setHasSubmitted(true);

    // Save answer to DB
    await supabase.from('answers').upsert({
      round_id: store.currentRoundId,
      player_id: store.playerId,
      answer_text: store.myAnswer || '',
    }, { onConflict: 'round_id,player_id' });

    // Broadcast submission
    await supabase.channel(`room:${roomCode}`).send({
      type: 'broadcast',
      event: 'PLAYER_SUBMITTED',
      payload: { playerId: store.playerId, name: store.playerName },
    });
  };

  const handleLifeline = async () => {
    if (store.lifelineUsed || !store.scenario) return;

    const res = await fetch('/api/lifeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario: store.scenario,
        plotTwist: store.plotTwist,
        playerName: store.playerName,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      store.markLifelineUsed(data.advice);

      // Update DB
      if (store.playerId) {
        await supabase
          .from('players')
          .update({ lifeline_used: true })
          .eq('id', store.playerId);
      }
    }
  };

  const handleTimeUp = async () => {
    if (timeUpTriggered.current) return;
    timeUpTriggered.current = true;

    if (!store.hasSubmitted) {
      // Auto-submit
      await handleSubmit();
    }

    // If host, trigger judging
    if (store.isHost) {
      // Small delay to ensure all auto-submits are in
      setTimeout(async () => {
        await supabase.channel(`room:${roomCode}`).send({
          type: 'broadcast',
          event: 'PHASE_CHANGE',
          payload: { phase: 'JUDGING' },
        });
        store.setPhase('JUDGING');

        // Call judge API
        const { data: answers } = await supabase
          .from('answers')
          .select('*, player:players(*)')
          .eq('round_id', store.currentRoundId);

        const players = store.players.filter((p) => p.is_active);
        const judgeAnswers = players.map((p) => {
          const ans = (answers || []).find(
            (a: Record<string, unknown>) => a.player_id === p.id
          );
          return {
            playerId: p.id,
            playerName: p.name,
            character: p.character,
            answerText: (ans as Record<string, unknown>)?.answer_text as string || '',
            usedLifeline: p.lifeline_used,
          };
        });

        const judgeRes = await fetch('/api/judge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roundId: store.currentRoundId,
            scenario: store.scenario,
            plotTwist: store.plotTwist,
            answers: judgeAnswers,
          }),
        });

        if (judgeRes.ok) {
          const judgeData = await judgeRes.json();

          // Broadcast verdicts
          await supabase.channel(`room:${roomCode}`).send({
            type: 'broadcast',
            event: 'VERDICT_REVEAL',
            payload: {
              answers: judgeData.results,
              sharmaJiAnswer: judgeData.sharmaJiAnswer,
            },
          });

          await supabase.channel(`room:${roomCode}`).send({
            type: 'broadcast',
            event: 'PHASE_CHANGE',
            payload: { phase: 'VERDICT_REVEAL' },
          });

          store.setVerdicts(judgeData.results, judgeData.sharmaJiAnswer);
          store.setPhase('VERDICT_REVEAL');
        }
      }, 2000);
    }
  };

  useEffect(() => {
    const activePlayersCount = store.players.filter((p) => p.is_active).length;
    if (
      store.isHost &&
      activePlayersCount > 0 &&
      store.submittedPlayerIds.length >= activePlayersCount
    ) {
      handleTimeUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.submittedPlayerIds.length, store.players, store.isHost]);

  return (
    <AnsweringScreen
      scenario={store.scenario || ''}
      plotTwist={store.plotTwist || ''}
      answerDeadline={store.answerDeadline}
      plotTwistDeadline={store.plotTwistDeadline}
      myAnswer={store.myAnswer}
      onAnswerChange={store.setMyAnswer}
      onSubmit={handleSubmit}
      hasSubmitted={store.hasSubmitted}
      submittedCount={store.submittedPlayerIds.length}
      totalPlayers={store.players.filter((p) => p.is_active).length}
      onLifeline={handleLifeline}
      lifelineUsed={store.lifelineUsed}
      lifelineAdvice={store.lifelineAdvice}
      onTimeUp={handleTimeUp}
      roundNumber={store.currentRound}
      totalRounds={store.totalRounds}
    />
  );
}

function JudgingDisplay() {
  return <JudgingScreen />;
}

function VerdictRevealDisplay({ roomCode }: { roomCode: string }) {
  const store = useGameStore();
  const supabase = useSupabase();

  const handleNext = async () => {
    await supabase.channel(`room:${roomCode}`).send({
      type: 'broadcast',
      event: 'PHASE_CHANGE',
      payload: { phase: 'SHARMA_JI' },
    });
    store.setPhase('SHARMA_JI');
  };

  return (
    <VerdictReveal
      results={store.verdictResults}
      myPlayerId={store.playerId || ''}
      isHost={store.isHost}
      onNext={handleNext}
    />
  );
}

function SharmaJiDisplay({ roomCode }: { roomCode: string }) {
  const store = useGameStore();
  const supabase = useSupabase();

  const handleNext = async () => {
    await supabase.channel(`room:${roomCode}`).send({
      type: 'broadcast',
      event: 'PHASE_CHANGE',
      payload: { phase: 'ROUND_SCORES' },
    });
    store.setPhase('ROUND_SCORES');
  };

  return (
    <SharmaJiReveal
      answer={store.sharmaJiAnswer || ''}
      scenario={store.scenario || ''}
      isHost={store.isHost}
      onNext={handleNext}
    />
  );
}

function RoundScoresDisplay({ roomCode }: { roomCode: string }) {
  const store = useGameStore();
  const supabase = useSupabase();

  const handleNextRound = async () => {
    const nextRound = store.currentRound + 1;

    if (nextRound > store.totalRounds) {
      // Game over
      await supabase
        .from('rooms')
        .update({ status: 'finished' })
        .eq('id', store.roomId);

      await supabase.channel(`room:${roomCode}`).send({
        type: 'broadcast',
        event: 'PHASE_CHANGE',
        payload: { phase: 'GAME_OVER' },
      });
      store.setPhase('GAME_OVER');
      return;
    }

    // Reset round state
    store.resetRound();

    // Generate next scenario
    const res = await fetch('/api/generate-scenario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: store.category,
        roomCode: store.roomCode,
        roundNumber: nextRound,
        playersCount: store.players.filter((p) => p.is_active).length,
      }),
    });

    const scenarioData = await res.json();

    // Update room
    await supabase
      .from('rooms')
      .update({ current_round: nextRound })
      .eq('id', store.roomId);

    // Broadcast
    await supabase.channel(`room:${roomCode}`).send({
      type: 'broadcast',
      event: 'NEXT_ROUND',
      payload: { roundNumber: nextRound },
    });

    await supabase.channel(`room:${roomCode}`).send({
      type: 'broadcast',
      event: 'PHASE_CHANGE',
      payload: { phase: 'COUNTDOWN' },
    });

    store.setPhase('COUNTDOWN');

    // Countdown -> Scenario -> Answering (same flow as start)
    setTimeout(async () => {
      await supabase.channel(`room:${roomCode}`).send({
        type: 'broadcast',
        event: 'SCENARIO_DATA',
        payload: {
          scenario: scenarioData.scenario,
          plotTwist: scenarioData.plotTwist,
          roundId: scenarioData.roundId,
        },
      });
      await supabase.channel(`room:${roomCode}`).send({
        type: 'broadcast',
        event: 'PHASE_CHANGE',
        payload: { phase: 'SCENARIO' },
      });
      store.setScenario(scenarioData.scenario, scenarioData.plotTwist, scenarioData.roundId);
      store.setPhase('SCENARIO');

      setTimeout(async () => {
        const now = new Date();
        const answerDeadline = new Date(now.getTime() + 75 * 1000).toISOString();
        const plotTwistDeadline = new Date(now.getTime() + 45 * 1000).toISOString();

        await supabase
          .from('rooms')
          .update({ answer_deadline: answerDeadline, plot_twist_deadline: plotTwistDeadline })
          .eq('id', store.roomId);

        await supabase.channel(`room:${roomCode}`).send({
          type: 'broadcast',
          event: 'PHASE_CHANGE',
          payload: {
            phase: 'ANSWERING',
            roomData: { answer_deadline: answerDeadline, plot_twist_deadline: plotTwistDeadline },
          },
        });

        store.setPhase('ANSWERING');
        store.syncRoomData({
          answer_deadline: answerDeadline,
          plot_twist_deadline: plotTwistDeadline,
        } as Partial<RoomRow>);
      }, 5000);
    }, 3000);
  };

  return (
    <RoundScores
      players={store.players.filter((p) => p.is_active)}
      verdictResults={store.verdictResults}
      currentRound={store.currentRound}
      totalRounds={store.totalRounds}
      isHost={store.isHost}
      onNextRound={handleNextRound}
    />
  );
}

function GameOverDisplay() {
  const store = useGameStore();
  const router = useRouter();

  return (
    <GameOver
      players={store.players.filter((p) => p.is_active)}
      onPlayAgain={() => router.push('/')}
    />
  );
}
