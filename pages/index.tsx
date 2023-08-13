import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Link from 'next/link'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { useSession, signIn, signOut } from "next-auth/react"
import SideMenu from '../components/side-menu'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  const SideMenuContent = () => {
    const { data: session } = useSession()
    return (session
      ?
        <>
          <div>
            <Link href="/author-form">会員情報</Link>
          </div>
          <div>
            <Link href="/post-form">新規投稿</Link>
          </div>
          <div>
            <button onClick={() => signOut()}>サインアウト</button>
          </div>
        </>
      :
        <div>
          <button onClick={() => signIn()}>サインイン</button>
        </div>
    );
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <SideMenu>
          <SideMenuContent />
        </SideMenu>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverimage={heroPost.coverimage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getServerSideProps = async () => {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverimage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
