// import { sql } from '@vercel/postgres';
import { PrismaClient } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
  ) {
  const prisma = new PrismaClient()
  const posts = await prisma.post.findMany()
  console.log(posts)
  // const posts = await sql`SELECT * FROM Post;`;
  return response.status(200).json({ posts });
}