import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverimage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  coverimage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className="hover:opacity-60 hover:duration-300">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
      >
        <div className="mb-5">
          <CoverImage title={title} src={coverimage} />
        </div>
        <h3 className="text-3xl mb-3 leading-snug">
            {title}
        </h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
      </Link>
    </div>
  )
}

export default PostPreview
