import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwfxgweiggqmtdmwlhnz.supabase.co';
const supabaseKey = 'sb_publishable_fI-X5oQu8bMaW7SXEQJaag_fMpxXFyY';
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
