import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.body._method !== 'delete') {
    response.status(405).end();
    return
  }

  try {
    const stringId = request.query.id
    const id = Number(stringId)

    const prisma = new PrismaClient()
    const deletedPost = await prisma.post.delete({
      where: { id }
    })
    console.log(deletedPost)

    return response.status(200).json({ message: "ブログ記事が削除されました。" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
}