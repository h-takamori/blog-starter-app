import { PrismaClient } from '@prisma/client'

export async function getAllPosts(fields: string[] = []) {
  // データベースからすべての投稿を取得
  const prisma = new PrismaClient()
  const posts = await prisma.$queryRaw`SELECT "post".*, "user".* FROM "post" JOIN "user" ON "post"."authorid" = "user"."id";`

  // sort posts by date in descending order
  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts.map((post) => {
    type Items = {
      [key: string]: string
    }

    const items: Items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = post.slug
      }
      if (field === 'content') {
        items[field] = post.content
      }

      if (typeof post[field] !== 'undefined') {
        items[field] = post[field]
      }
    })

    return items
  })
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  // データベースからslugに一致する投稿を取得
  const prisma = new PrismaClient()
  const posts = await prisma.$queryRaw`
    SELECT "post".*, "user".*
    FROM "post"
    INNER JOIN "user" ON "post"."authorid" = "user"."id"
    WHERE "post"."slug" = ${slug};
  `
  const post = posts[0]

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // 投稿が取得できなかったときは404エラーになるように処置をする
  if (!post) {
    items.slug = null
    return items
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = post.slug
    }
    if (field === 'content') {
      items[field] = post.content
    }

    if (typeof post[field] !== 'undefined') {
      items[field] = post[field]
    }
  })

  return items
}
