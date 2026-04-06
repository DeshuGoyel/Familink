import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qpzogixvyfkdsdwtwsjo.supabase.co';
const supabaseKey = 'sb_publishable_tNKc0yAwkGR21MtanQBj6Q_9XrJOGDv';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing insert...');
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email: 'test-' + Date.now() + '@example.com' }])
    .select();
    
  if (error) {
    console.error('Insert Error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
