import { MongoClient } from 'mongodb';
import 'dotenv/config'

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);
let database = client.db(dbName);


export {database, client};