import pg from 'pg';

const pool = new pg.Pool({
    user: 'kipkemoi',
    password: '',
    host: 'localhost',
    port: 5433
});

export default pool;