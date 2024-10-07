import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { hashPassword } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return json({ error: 'Username and password are required' }, { status: 400 });
  }

  const db = await getDb();
  const hashedPassword = await hashPassword(password);

  try {
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return json({ error: 'Username already exists or database error' }, { status: 400 });
  }
};
