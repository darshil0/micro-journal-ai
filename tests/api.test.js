import { describe, it, expect, beforeAll, afterAll } from 'vitest';

/**
 * API Integration Tests
 * Tests the backend API endpoints
 */

const API_URL = 'http://localhost:3000';

describe('API Health Check', () => {
  it('should return 200 on health check', async () => {
    const response = await fetch(`${API_URL}/api/health`);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.timestamp).toBeDefined();
  });
});

describe('API Insights Endpoint', () => {
  it('should reject empty entry', async () => {
    const response = await fetch(`${API_URL}/api/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: '' }),
    });
    
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });

  it('should reject invalid entry type', async () => {
    const response = await fetch(`${API_URL}/api/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: 123 }),
    });
    
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain('string');
  });

  it('should reject too long entry', async () => {
    const longEntry = 'a'.repeat(10001);
    const response = await fetch(`${API_URL}/api/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: longEntry }),
    });
    
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain('too long');
  });

  it('should return insights for valid entry', async () => {
    const response = await fetch(`${API_URL}/api/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        entry: 'Today was a great day. I felt happy and accomplished.' 
      }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.mood).toBeDefined();
    expect(Array.isArray(data.data.insights)).toBe(true);
    expect(data.data.reflection).toBeDefined();
  }, 30000); // 30 second timeout for AI response

  it('should handle rate limiting', async () => {
    // Make multiple rapid requests
    const requests = Array(12).fill(null).map(() => 
      fetch(`${API_URL}/api/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry: 'Test entry' }),
      })
    );

    const responses = await Promise.all(requests);
    const rateLimited = responses.some(r => r.status === 429);
    
    expect(rateLimited).toBe(true);
  }, 60000); // 60 second timeout
});

describe('API 404 Handler', () => {
  it('should return 404 for unknown API routes', async () => {
    const response = await fetch(`${API_URL}/api/nonexistent`);
    expect(response.status).toBe(404);
    
    const data = await response.json();
    expect(data.error).toContain('not found');
  });
});
