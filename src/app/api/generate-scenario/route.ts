import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { model } from '@/lib/ai/client';
import { SCENARIO_SYSTEM_PROMPT, buildScenarioUserPrompt } from '@/lib/ai/prompts';
import { getSupabaseServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, roomCode, roundNumber, playersCount } = body;

    if (!roomCode || !roundNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    // Get room
    const { data: room } = await supabase
      .from('rooms')
      .select('id')
      .eq('code', roomCode)
      .single();

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Generate scenario via AI
    let scenarioData: { scenario: string; plotTwist: string };

    try {
      const { text } = await generateText({
        model,
        system: SCENARIO_SYSTEM_PROMPT,
        prompt: buildScenarioUserPrompt(category || 'mixed', roundNumber),
        temperature: 0.9,
        maxOutputTokens: 500,
      });

      // Parse JSON (AI might wrap in markdown code blocks)
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      scenarioData = JSON.parse(cleaned);
    } catch (aiError) {
      console.error('AI generation error, using fallback:', aiError);
      // Fallback scenario
      scenarioData = {
        scenario: "You're stuck in a packed Mumbai local train, it's 5:30 PM rush hour, your phone is at 2% and your boss just texted 'come to office NOW'. The AC isn't working and someone's eating biryani right next to you.",
        plotTwist: "The train just stopped between stations and the announcement says 'technical difficulty, please wait'.",
      };
    }

    // Insert round into DB
    const { data: round, error: roundError } = await supabase
      .from('rounds')
      .insert({
        room_id: room.id,
        round_number: roundNumber,
        category: category || 'mixed',
        scenario: scenarioData.scenario,
        plot_twist: scenarioData.plotTwist,
      })
      .select()
      .single();

    if (roundError) {
      console.error('Round insert error:', roundError);
      return NextResponse.json({ error: 'Failed to create round' }, { status: 500 });
    }

    return NextResponse.json({
      scenario: scenarioData.scenario,
      plotTwist: scenarioData.plotTwist,
      category: category || 'mixed',
      roundId: round.id,
    });
  } catch (error) {
    console.error('Generate scenario error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
