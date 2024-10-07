import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/db';
import { hashPassword } from '$lib/auth';

export const post: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return {
      status: 400,
      body: { error: 'Username and password are required' }
    };
  }

  const db = await getDb();
  const hashedPassword = await hashPassword(password);

  try {
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return {
      status: 201,
      body: { message: 'User registered successfully' }
    };
  } catch (error) {
    return {
      status: 400,
      body: { error: 'Username already exists' }
    };
  }
};
