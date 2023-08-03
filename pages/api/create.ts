import { PrismaClient } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
  ) {
  const prisma = new PrismaClient()

  const user = await prisma.user.create({
    data: {
      name: 'Elsa Prisma',
      picture: 'elsa@prisma.io',
    },
  })

  return response.status(200).json({ user });
}
