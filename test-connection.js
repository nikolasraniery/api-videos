import { query } from './db';

async function testConnection() {
  try {
    const res = await query('SELECT NOW()');
    console.log('Conexão bem-sucedida! Hora do servidor:', res.rows[0]);
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

testConnection();
