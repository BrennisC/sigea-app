const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Conectando a Supabase...');
  console.log('URL:', supabaseUrl);
  
  const sql = `
    -- Test connection
    SELECT version();
  `;
  
  const { data, error } = await supabase.rpc('exec_sql', { query: sql });
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Conexión exitosa:', data);
  }
}

setupDatabase();
