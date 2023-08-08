import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'DELETE') {
    response.status(405).end();
    return
  }

  try {
    const slug = request.query.slug

    const prisma = new PrismaClient()
    const deletedPost = await prisma.post.delete({
      where: { slug }
    })
    console.log(deletedPost)

    return response.status(200).json({ message: "ブログ記事が削除されました。" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
}
