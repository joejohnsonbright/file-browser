import { describe, it, expect } from 'vitest';
import filesData from '../data/files.json';

describe('Mock API', () => {
  it('should return files data from /api/files endpoint', async () => {
    const response = await fetch('/api/files');

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);

    expect(data).toEqual(filesData);
  });

  it('should return JSON content type', async () => {
    const response = await fetch('/api/files');

    expect(response.headers.get('content-type')).toContain('application/json');
  });
});
