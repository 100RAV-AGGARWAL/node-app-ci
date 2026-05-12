import HttpStatusCodes from '../src/common/constants/HttpStatusCodes.js';
import type { TestRes } from './common/supertest-types.js';
import { agent } from './support/agent.js';

describe('ServerRoutes', () => {
  it('should return a health response', async () => {
    const res: TestRes<{ status: string }> = await agent.get('/health');

    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body.status).toBe('ok');
  });

  it('should expose the OpenAPI document', async () => {
    const res: TestRes<{ openapi: string }> = await agent.get('/api-docs.json');

    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body.openapi).toBe('3.0.3');
  });

  it('should not serve the generated users UI route', async () => {
    const res = await agent.get('/users');

    expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
  });
});
