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
    const { signinmail, ...post } = request.body;

    if (!post.coverimage) {
      post.coverimage = "/assets/blog/download/default-image.jpg"
    }

    const prisma = new PrismaClient()
    const author = await prisma.author.findUnique({
      where: {
        signinmail,
      },
    })
    console.log(author)

    if (request.method === 'POST') {
      // Postモデルのidは@default(autoincrement())であるためcreateに値（null含む）を渡すとエラー
      const { id, ...postWithoutId } = post; // dataに含めないよう分離する。idは使わない
      const createdPost = await prisma.post.create({
        data: {
          ...postWithoutId,
          author: {
            connect: {
              id: author.id,
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
