import dotenv from 'dotenv';
dotenv.config();

export default {
  service: {
    port: 3000
  },
  source: {
    url: "https://cat-fact.herokuapp.com"
  },
  db_port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
}