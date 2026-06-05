import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { model } from '@/lib/ai/client';
import { LIFELINE_SYSTEM_PROMPT, buildLifelinePrompt } from '@/lib/ai/prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scenario, plotTwist, playerName } = body;

    if (!scenario) {
      return NextResponse.json({ error: 'Missing scenario' }, { status: 400 });
    }

    try {
      const { text } = await generateText({
        model,
        system: LIFELINE_SYSTEM_PROMPT,
        prompt: buildLifelinePrompt(scenario, plotTwist || ''),
        temperature: 0.8,
        maxOutputTokens: 200,
      });

      return NextResponse.json({ advice: text.trim() });
    } catch (aiError) {
      console.error('Lifeline AI error:', aiError);
      // Fallback mom advice
      return NextResponse.json({
        advice: `Beta ${playerName || ''}, pehle chai piyo, phir sochna. Aur haan, Bunty aunty ka beta isse easily handle kar leta. But you focus on yourself, okay? And eat something, you look thin.`,
      });
    }
  } catch (error) {
    console.error('Lifeline error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
