import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { model } from '@/lib/ai/client';
import { JUDGING_SYSTEM_PROMPT, buildJudgingUserPrompt } from '@/lib/ai/prompts';
import { getSupabaseServer } from '@/lib/supabase/server';
import { calculateScore } from '@/lib/game/scoring';
import type { VerdictTier, CharacterType } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roundId, scenario, plotTwist, answers } = body;

    if (!roundId || !scenario || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    // Call AI for judging
    let judgeData: {
      results: Array<{
        playerId: string;
        verdict: VerdictTier;
        narration: string;
        roastText?: string;
      }>;
      sharmaJiAnswer: string;
    };

    try {
      const { text } = await generateText({
        model,
        system: JUDGING_SYSTEM_PROMPT,
        prompt: buildJudgingUserPrompt(scenario, plotTwist, answers),
        temperature: 0.7,
        maxOutputTokens: 2000,
      });

      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      judgeData = JSON.parse(cleaned);

      // Validate structure
      if (!judgeData.results || !Array.isArray(judgeData.results)) {
        throw new Error('Invalid judge response structure');
      }
    } catch (aiError) {
      console.error('AI judging error, retrying:', aiError);

      // Retry once
      try {
        const { text } = await generateText({
          model,
          system: JUDGING_SYSTEM_PROMPT,
          prompt: buildJudgingUserPrompt(scenario, plotTwist, answers),
          temperature: 0.5,
          maxOutputTokens: 2000,
        });

        const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        judgeData = JSON.parse(cleaned);
      } catch (retryError) {
        console.error('AI judging retry failed, using fallback:', retryError);

        // Fallback: give everyone BACH_GAYA
        judgeData = {
          results: answers.map((a: { playerId: string; playerName: string; answerText: string }) => ({
            playerId: a.playerId,
            verdict: a.answerText ? 'BACH_GAYA' : 'BARBAD',
            narration: a.answerText
              ? 'AI had a brain freeze, but you probably survived. Theek hai.'
              : 'No answer submitted. RIP.',
          })),
          sharmaJiAnswer: 'Sharma Ji Ka Beta would have handled it perfectly, but even the AI broke trying to judge this round.',
        };
      }
    }

    // Apply character modifiers and calculate scores
    const processedResults = judgeData.results.map((result) => {
      const playerAnswer = answers.find(
        (a: { playerId: string }) => a.playerId === result.playerId
      );
      const character = (playerAnswer?.character || 'topper') as CharacterType;
      const { finalVerdict, points } = calculateScore(result.verdict as VerdictTier, character);

      return {
        ...result,
        playerName: playerAnswer?.playerName || 'Unknown',
        character,
        verdict: finalVerdict,
        points,
      };
    });

    // Update database
    for (const result of processedResults) {
      // Upsert answer with verdict
      await supabase.from('answers').upsert(
        {
          round_id: roundId,
          player_id: result.playerId,
          answer_text: answers.find((a: { playerId: string }) => a.playerId === result.playerId)?.answerText || '',
          verdict: result.verdict,
          points_awarded: result.points,
          narration: result.narration,
          roast_text: result.roastText || null,
        },
        { onConflict: 'round_id,player_id' }
      );

      // Update player score
      const { data: player } = await supabase
        .from('players')
        .select('score')
        .eq('id', result.playerId)
        .single();

      if (player) {
        await supabase
          .from('players')
          .update({ score: player.score + result.points })
          .eq('id', result.playerId);
      }
    }

    // Update round with Sharma Ji answer
    await supabase
      .from('rounds')
      .update({ sharma_ji_answer: judgeData.sharmaJiAnswer })
      .eq('id', roundId);

    return NextResponse.json({
      results: processedResults,
      sharmaJiAnswer: judgeData.sharmaJiAnswer,
    });
  } catch (error) {
    console.error('Judge error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
