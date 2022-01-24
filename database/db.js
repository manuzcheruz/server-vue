import pg from 'pg';

const pool = new pg.Pool({
    user: 'kipkemoi',
    password: '',
    database: 'cat_facts_database',
    host: 'localhost',
    port: 5432
});

export default pool;