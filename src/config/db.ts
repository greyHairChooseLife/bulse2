import env from 'dotenv';
env.config();
import mariadb from 'mysql2';

const {DB_SCHEMA, DB_USER, DB_PW, DB_HOST } = process.env;

const pool = mariadb.createPool({
	host : DB_HOST,
	user : DB_USER,
	password : DB_PW,
	database : DB_SCHEMA,
	connectionLimit : 10,
});

module.exports = pool;
