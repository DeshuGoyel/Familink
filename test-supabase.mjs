import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwfxgweiggqmtdmwlhnz.supabase.co';
const supabaseKey = 'sb_publishable_fI-X5oQu8bMaW7SXEQJaag_fMpxXFyY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  console.log('Connecting to Supabase...');
  try {
    const { data, error } = await supabase.from('waitlist').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Connection successful, but error accessing "waitlist" table:');
      console.error(error.message);
      if (error.code === '42P01') {
        console.error('HINT: The table "waitlist" does not exist. You need to run the SQL schema!');
      }
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Waitlist table exists. Current entries:', data);
    }
  } catch (err) {
    console.error('Failed to connect:', err);
  }
}

checkConnection();
