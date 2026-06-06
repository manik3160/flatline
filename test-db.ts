import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function test() {
  const { data, error } = await supabase
    .from('rooms')
    .insert({
      code: 'TEST2',
      host_session_id: 'test_session',
      status: 'lobby',
      category: 'mixed',
      total_rounds: 5,
      current_round: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Success:', data);
  }
}

test();
