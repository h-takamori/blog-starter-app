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

  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      picture: 'https://example.com/alice.jpg',
      posts: {
        create: [
          {
            slug: 'hello-prisma',
            title: 'Hello, Prisma!',
            excerpt: 'This is my first post with Prisma.',
            coverimage: 'https://example.com/hello-prisma.jpg',
            date: '2023-08-01',
            content: 'Prisma is a great tool for working with databases.',
            ogimage: 'https://example.com/hello-prisma-og.jpg',
          },
        ],
      },
    },
  })


  return response.status(200).json({ newUser });
}
