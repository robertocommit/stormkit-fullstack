import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/db';
import { comparePasswords, generateToken } from '$lib/auth';

export const post: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return {
      status: 400,
      body: { error: 'Username and password are required' }
    };
  }

  const db = await getDb();
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

  if (!user || !(await comparePasswords(password, user.password))) {
    return {
      status: 401,
      body: { error: 'Invalid username or password' }
    };
  }

  const token = generateToken(user.id);

  return {
    status: 200,
    body: { token }
  };
};
