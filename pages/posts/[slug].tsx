import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import SideMenu from "../../components/side-menu"
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`

  // 記事削除リンクのコンポーネント
  const DeleteLink = ({ slug, children }) => {
    // Next.jsのAPIに送信する関数
    const submitForm = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("ブログ記事が削除されました");
        } else {
          alert("エラーが発生しました");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleClick = (event) => {
      event.preventDefault();
      const result = window.confirm("本当に削除しますか？");
      if (result) {
        submitForm();
      }
    };

    return (
      <Link href="#" onClick={handleClick}>
        {children}
      </Link>
    );
  };

  const SideMenuContent = () => {
    const { data: session } = useSession()
    const visitorIsAuthor = session?.user?.email === post.author.signinmail
    return (session
      ?
        <>
          <div>
            <Link href="/author-form">会員情報</Link>
          </div>
          <div>
            <Link href="/post-form">新規投稿</Link>
          </div>
          {visitorIsAuthor
            ? // サインイン済みかつ本人の記事の場合のみ表示
              <>
                <div>
                  <Link href={`/post-form?mode=edit&slug=${post.slug}`}>記事編集</Link>
                </div>
                <div>
                  <DeleteLink slug={post.slug}>記事削除</DeleteLink>
                </div>
              </>
            : // サインイン済みだが他人の記事の場合
              null
          }
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
    <Layout preview={preview}>
      <SideMenu>
        <SideMenuContent />
      </SideMenu>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.coverimage} />
              </Head>
              <PostHeader
                title={post.title}
                coverimage={post.coverimage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getServerSideProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'coverimage',
    'author',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
