import pg from 'pg';
import config from '../config.js';

const pool = new pg.Pool({
    user: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.db_port
});

export default pool;