import type Author from './author'

type PostType = {
  id?: number
  slug: string
  title: string
  date: string
  coverimage: string
  author: Author
  excerpt: string
  content: string
}

export default PostType
