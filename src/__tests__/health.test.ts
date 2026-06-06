import request from 'supertest';
import { app } from '../app';
import { setupSwagger } from '../swagger';

// Apply swagger setup to app for testing
setupSwagger(app);

describe('Health Endpoint', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('OK');
    expect(response.body.message).toBe('Server is running successfully');
  });

  it('should include timestamp in response', async () => {
    const response = await request(app).get('/health');
    expect(response.body.data.timestamp).toBeDefined();
  });

  it('should include environment in response', async () => {
    const response = await request(app).get('/health');
    expect(response.body.data.environment).toBeDefined();
  });
});