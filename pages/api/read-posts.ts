import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const posts = await sql`SELECT * FROM Post;`;
  return response.status(200).json({ posts });
}