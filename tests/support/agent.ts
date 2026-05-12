import supertest, { type Test } from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll } from 'vitest';

import MockOrm from '../../src/repos/MockOrm.js';
import app from '../../src/server.js';

/******************************************************************************
                                    Run
******************************************************************************/

let agent: TestAgent<Test>;

beforeAll(async () => {
  agent = supertest.agent(app);
  await MockOrm.cleanDb();
});

/******************************************************************************
                                    Export
******************************************************************************/

export { agent };
