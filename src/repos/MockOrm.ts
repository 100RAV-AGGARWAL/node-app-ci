import jsonfile from 'jsonfile';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tspo from 'tspo';

import EnvVars, { NodeEnvs } from '../common/constants/env.js';
import type { IUser } from '../models/User.model.js';

/******************************************************************************
                                Constants
******************************************************************************/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_FILE_PATH =
  __dirname +
  '/common' +
  (EnvVars.NodeEnv === NodeEnvs.TEST
    ? '/database.test.json'
    : '/database.json');

/******************************************************************************
                                Types
******************************************************************************/

type Database = {
  users: IUser[];
};

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Fetch the json from the file.
 */
async function openDb(): Promise<Database> {
  const db = await (jsonfile.readFile(DATABASE_FILE_PATH) as Promise<Database>);
  if (!('users' in db)) {
    return tspo.addEntry(db, ['users', []]);
  }
  return db;
}

/**
 * Update the file.
 */
function saveDb(db: Database): Promise<void> {
  return jsonfile.writeFile(DATABASE_FILE_PATH, db);
}

/**
 * Empty the database
 */
function cleanDb(): Promise<void> {
  return jsonfile.writeFile(DATABASE_FILE_PATH, {});
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  openDb,
  saveDb,
  cleanDb,
} as const;
