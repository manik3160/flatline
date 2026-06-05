import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('playerId');
    const roundId = searchParams.get('roundId');
    const format = searchParams.get('format') || 'story'; // 'story' (9:16) or 'square' (1:1)

    if (!playerId || !roundId) {
      return NextResponse.json({ error: 'Missing playerId or roundId' }, { status: 400 });
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
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    const player = answer.player as Record<string, string>;
    const verdict = answer.verdict as string;
    const narration = answer.narration as string;

    // Generate a simple SVG verdict card
    const width = format === 'square' ? 600 : 540;
    const height = format === 'square' ? 600 : 960;

    const verdictColors: Record<string, string> = {
      JUGAAD: '#ffd700',
      BACH_GAYA: '#22c55e',
      BARBAD: '#f97316',
      ANTIM_SANSKAR: '#a855f7',
    };

    const verdictEmojis: Record<string, string> = {
      JUGAAD: '🔥',
      BACH_GAYA: '😅',
      BARBAD: '💀',
      ANTIM_SANSKAR: '☠️',
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

    // Simple SVG card
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="100%" style="stop-color:#111111"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)" rx="20"/>

      <!-- EKG Line Decoration -->
      <line x1="40" y1="${height - 80}" x2="${width - 40}" y2="${height - 80}" stroke="#ff2d2d" stroke-width="1" opacity="0.2"/>

      <!-- FLATLINE Branding -->
      <text x="${width / 2}" y="60" font-family="sans-serif" font-size="28" font-weight="700" fill="#ff2d2d" text-anchor="middle" letter-spacing="6">FLATLINE</text>

      <!-- Character + Name -->
      <text x="${width / 2}" y="${format === 'square' ? 140 : 200}" font-family="sans-serif" font-size="48" text-anchor="middle">${characterEmojis[player.character] || '🎮'}</text>
      <text x="${width / 2}" y="${format === 'square' ? 180 : 250}" font-family="sans-serif" font-size="22" font-weight="600" fill="#f5f5f5" text-anchor="middle">${player.name}</text>

      <!-- Verdict -->
      <text x="${width / 2}" y="${format === 'square' ? 260 : 370}" font-family="sans-serif" font-size="56" text-anchor="middle">${verdictEmojis[verdict] || ''}</text>
      <text x="${width / 2}" y="${format === 'square' ? 320 : 440}" font-family="sans-serif" font-size="42" font-weight="700" fill="${color}" text-anchor="middle" letter-spacing="4">${verdictLabels[verdict] || verdict}</text>

      <!-- Narration -->
      <foreignObject x="40" y="${format === 'square' ? 350 : 480}" width="${width - 80}" height="200">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: sans-serif; font-size: 16px; color: #888888; text-align: center; line-height: 1.5; font-style: italic;">
          "${narration || ''}"
        </div>
      </foreignObject>

      <!-- Footer -->
      <text x="${width / 2}" y="${height - 30}" font-family="monospace" font-size="11" fill="#444444" text-anchor="middle">flatline — survive the chaos</text>
    </svg>`;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Verdict card error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
