import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"

export async function getAllPosts(fields: string[] = []) {
  // データベースからすべての投稿を取得
  const prisma = new PrismaClient()
  const posts = await prisma.post.findMany({
    // authorのデータも取得
    include: {
      author: true,
    },
  })

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
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    // authorのデータも取得
    include: {
      author: true,
    },
  })

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

export async function getAuthorBySession(fields: string[] = [], context) {
  const session = await getSession(context)

  // 訪問者がサインインしているかを管理する変数
  const visitorIsSignedIn = !!session

  if (!visitorIsSignedIn) {
    return {
      author: {},
      signinmail: "",
      visitorIsSignedIn,
    };
  }

  const signinmail = session?.user?.email as string
  // データベースからsigninmailに一致する会員情報を取得
  const prisma = new PrismaClient()
  const unfilteredAuthor = await prisma.author.findUnique({
    where: {
      signinmail,
    },
  })

  // サインイン済みだが会員情報未登録の場合
  if (!unfilteredAuthor) {
    return {
      author: {},
      signinmail,
      visitorIsSignedIn,
    };
  }

  // これ以降は訪問者がサインイン済みかつ会員情報登録済みの場合
  const author = {}
  
  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (typeof unfilteredAuthor[field] !== 'undefined') {
      author[field] = unfilteredAuthor[field]
    }
  })

  return {
    author,
    signinmail,
    visitorIsSignedIn,
  };

}