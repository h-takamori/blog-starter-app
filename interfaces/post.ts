import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverimage: string
  author: Author
  excerpt: string
  content: string
}

export default PostType
