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

// 削除リンクのコンポーネント
const DeleteLink = ({ id }) => {
  // Next.jsのAPIに送信する関数
  const submitForm = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
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
    <Link href="#" className="text-blue-500 underline hover:text-blue-700" onClick={handleClick}>
      削除
    </Link>
  );
};

  return (
    <Layout preview={preview}>
      <Link href="/post-form" style={{position: "fixed", zIndex: 1}} className="top-2.5 right-2.5 px-2.5 py-2.5">新規投稿</Link>
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
              <DeleteLink
                id={post.id}
              />
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
    'id',
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverimage',
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
