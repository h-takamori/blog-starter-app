// import fs from 'fs'
// import { join } from 'path'
// import matter from 'gray-matter'

// const postsDirectory = join(process.cwd(), '_posts')

// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory)
// }

// export function getPostBySlug(slug: string, fields: string[] = []) {
//   const realSlug = slug.replace(/\.md$/, '')
//   const fullPath = join(postsDirectory, `${realSlug}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')
//   const { data, content } = matter(fileContents)

//   type Items = {
//     [key: string]: string
//   }

//   const items: Items = {}

//   // Ensure only the minimal needed data is exposed
//   fields.forEach((field) => {
//     if (field === 'slug') {
//       items[field] = realSlug
//     }
//     if (field === 'content') {
//       items[field] = content
//     }

//     if (typeof data[field] !== 'undefined') {
//       items[field] = data[field]
//     }
//   })

//   return items
// }

// export function getAllPosts(fields: string[] = []) {
//   const slugs = getPostSlugs()
//   const posts = slugs
//     .map((slug) => getPostBySlug(slug, fields))
//     // sort posts by date in descending order
//     .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
//   return posts
// }

import { PrismaClient } from '@prisma/client'

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

    // authorのデータも追加
    // items['author'] = post.author
    console.log(`items['author'] = ${items['author']}`)
    
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

  // // authorのデータも追加
  // items['author'] = post.author.name
  // items['authorpicture'] = post.author.picture

  return items
}
