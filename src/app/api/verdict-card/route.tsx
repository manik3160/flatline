import { NextRequest } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';
import { ImageResponse } from '@vercel/og';

// @vercel/og supports rendering React elements natively without importing React
// It's recommended to export config to edge if possible, but we're relying on Supabase client
// so keeping it standard is fine, or we can use edge if our Supabase client supports it.
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('playerId');
    const roundId = searchParams.get('roundId');
    const format = searchParams.get('format') || 'story'; // 'story' (9:16) or 'square' (1:1)

    if (!playerId || !roundId) {
      return new Response('Missing playerId or roundId', { status: 400 });
    }

    const supabase = getSupabaseServer();

    // Get answer + player data
    const { data: answer } = await supabase
      .from('answers')
      .select('*, player:players(*)')
      .eq('round_id', roundId)
      .eq('player_id', playerId)
      .single();

    if (!answer) {
      return new Response('Answer not found', { status: 404 });
    }

    const player = answer.player as Record<string, string>;
    const verdict = answer.verdict as string;
    const narration = answer.narration as string;
    const roastText = answer.roast_text as string;

    const width = format === 'square' ? 600 : 540;
    const height = format === 'square' ? 600 : 960;

    const verdictColors: Record<string, string> = {
      JUGAAD: '#ffd700',
      BACH_GAYA: '#22c55e',
      BARBAD: '#f97316',
      ANTIM_SANSKAR: '#a855f7',
    };

    const verdictLabels: Record<string, string> = {
      JUGAAD: 'JUGAAD',
      BACH_GAYA: 'BACH GAYA',
      BARBAD: 'BARBAD',
      ANTIM_SANSKAR: 'ANTIM SANSKAR',
    };

    const characterEmojis: Record<string, string> = {
      topper: '🎓',
      jugaadu: '🔧',
      sharma_ji: '📚',
      it_uncle: '💻',
    };

    const color = verdictColors[verdict] || '#f5f5f5';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at center, #1a1a1a 0%, #080808 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            fontFamily: 'sans-serif',
          }}
        >
          {/* EKG Decoration */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: '#ff2d2d',
              opacity: 0.15,
              transform: 'translateY(-50%)',
            }}
          />

          {/* FLATLINE Top Right / Center depending on format */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '0.15em',
              fontSize: 24,
              color: '#ff2d2d',
              fontWeight: 700,
            }}
          >
            FLATLINE
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              border: `2px solid ${color}44`,
              borderRadius: '20px',
              backgroundColor: '#111111',
              boxShadow: `0 0 30px ${color}33`,
              width: format === 'square' ? '80%' : '85%',
              gap: '1rem',
              zIndex: 10,
            }}
          >
            {/* Player Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '3rem' }}>{characterEmojis[player.character] || '🎮'}</span>
              <span style={{ fontSize: '1.5rem', color: '#f5f5f5', fontWeight: 600 }}>
                {player.name}
              </span>
            </div>

            {/* Verdict */}
            <div
              style={{
                display: 'flex',
                fontSize: '4rem',
                color: color,
                fontWeight: 800,
                letterSpacing: '0.05em',
                textShadow: `0 0 20px ${color}66`,
                marginTop: '1rem',
              }}
            >
              {verdictLabels[verdict] || verdict}
            </div>

            {/* Narration */}
            <div
              style={{
                display: 'flex',
                fontSize: '1.25rem',
                color: '#888888',
                textAlign: 'center',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginTop: '2rem',
              }}
            >
              &quot;{roastText || narration}&quot;
            </div>
          </div>

          {/* Footer watermark */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              fontSize: 14,
              color: '#444444',
              letterSpacing: '0.05em',
            }}
          >
            survive the chaos
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (error) {
    console.error('Verdict card error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
