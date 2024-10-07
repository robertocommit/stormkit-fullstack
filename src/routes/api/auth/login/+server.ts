import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { comparePasswords, generateToken } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return json({ error: 'Username and password are required' }, { status: 400 });
  }

  const db = await getDb();
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

  if (!user || !(await comparePasswords(password, user.password))) {
    return json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const token = generateToken(user.id);

  return json({ token });
};