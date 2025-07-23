import { http, HttpResponse } from 'msw';
import filesData from '../data/files.json';

export const handlers = [
  http.get('/api/files', () => {
    return HttpResponse.json(filesData);
  }),
];
