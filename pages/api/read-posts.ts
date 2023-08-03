import { PrismaClient } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
  ) {
  const prisma = new PrismaClient()
  const users = await prisma.usertable.findMany()
  const posts = await prisma.post.findMany()
  return response.status(200).json({ users, posts });
}