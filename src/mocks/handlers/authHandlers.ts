import { http, HttpResponse } from 'msw';
import { mockUsers } from '../data/users';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as any;
    if (body.email && body.password) {
      return HttpResponse.json({
        token: 'mock-jwt-token-12345',
        user: mockUsers[0]
      });
    }
    return new HttpResponse(null, { status: 401 });
  })
];
