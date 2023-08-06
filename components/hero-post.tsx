import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Link from 'next/link'
import CoverImage from './cover-image'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  name: string
  picture: string
  slug: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  name,
  picture,
  slug,
}: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Hero Post
      </h2>
      <div className="flex flex-col md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div className="w-2/4 mb-5 hover:opacity-60 hover:duration-300">
          <CoverImage title={title} src={coverImage} slug={slug} />
        </div>
        <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>
        <div className="mb-4 md:mb-0 text-lg">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        <Avatar name={name} picture={picture} />
      </div>
    </section>
  )
}

export default HeroPost
