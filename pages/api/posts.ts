import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (!['POST', 'PUT'].includes(request.method)) {
    response.status(405).end();
    return;
  }

  try {
    const { author, ...post } = request.body;

    const prisma = new PrismaClient()
    const createdAuthor = await prisma.author.create({data: {...author}})

    if (request.method === 'POST') {
      await prisma.post.create({
        data: {
          ...post,
          author: {
            connect: {
              id: createdAuthor.id,
            },
          },
        },
      });  
    } else {
      await prisma.post.update({
        where: {
          slug: post.slug,
      },
      data: { ...post },
    });
  }



    return response.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
}
