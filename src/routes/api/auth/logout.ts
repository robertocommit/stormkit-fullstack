import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async () => {
  // In this simple implementation, we don't need to do anything server-side
  // The client will handle removing the token from storage
  return {
    status: 200,
    body: { message: 'Logged out successfully' }
  };
};
