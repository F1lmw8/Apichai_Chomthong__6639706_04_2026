const { Client } = require('pg');

async function testConnection(url, name) {
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log(`[SUCCESS] Connected to ${name}`);
    await client.end();
  } catch (err) {
    console.log(`[FAILED] ${name}: ${err.message}`);
  }
}

async function run() {
  const urls = [
    { name: 'Direct DB Host (IPv4)', url: 'postgresql://postgres:NongFilmPewPew@db.yjuidfygprljzwvssvlw.supabase.co:5432/postgres' },
    { name: 'Session Pooler', url: 'postgresql://postgres.yjuidfygprljzwvssvlw:NongFilmPewPew@aws-1-ap-south-1.pooler.supabase.com:5432/postgres' },
    { name: 'Transaction Pooler', url: 'postgresql://postgres.yjuidfygprljzwvssvlw:NongFilmPewPew@aws-1-ap-south-1.pooler.supabase.com:6543/postgres' }
  ];

  for (const item of urls) {
    await testConnection(item.url, item.name);
  }
}

run();
