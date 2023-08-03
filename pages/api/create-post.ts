import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    response.status(405).end();
    return
  }

  try {
    const { author, ...post } = request.body;

    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
      data: {
        ...author,
        posts: {
          create: [
            { ...post },
          ],
        },
      },
    })

    return response.status(200).json({ message: "ブログ記事が作成されました。" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
}
