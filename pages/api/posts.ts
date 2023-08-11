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
    const { author, signinmail, ...post } = request.body;

    const prisma = new PrismaClient()
    const createdAuthor = await prisma.author.create({data: {...author, signinmail}})
    console.log(createdAuthor)

    if (request.method === 'POST') {
      // Postモデルのidは@default(autoincrement())であるためcreateに値（null含む）を渡すとエラー
      const { id, ...postWithoutId } = post; // dataに含めないよう分離する。idは使わない
      const createdPost = await prisma.post.create({
        data: {
          signinmail,
          ...postWithoutId,
          author: {
            connect: {
              signinmail: createdAuthor.signinmail,
            },
          },
        },
      });  
      console.log(createdPost)
    } else {
      const updatedPost = await prisma.post.update({
        where: {
          id: post.id,
        },
        data: { ...post },
      });
      console.log(updatedPost)
    }
    return response.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
}
