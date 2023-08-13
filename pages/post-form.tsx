import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { getPostBySlug } from '../lib/api'
import { useSession, signIn, signOut } from "next-auth/react"
import type PostType from '../interfaces/post'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SideMenu from "../components/side-menu"
import Link from 'next/link'

// フォームの型定義
type FormValues = {
  id: number | null;
  slug: string;
  title: string;
  excerpt: string;
  coverimage?: string;
  date: string;
  content: string;
  signinmail: string;
};
  
// バリデーションスキーマを定義
const schema = yup.object().shape({
  slug: yup.string().required("ブログ記事のURLは必須です").max(100, "ブログ記事のURLは100文字以内で入力してください"), // ブログ記事のURLは文字列で必須かつ最大100文字
  title: yup.string().required("タイトルは必須です"), // タイトルは文字列で必須
  excerpt: yup.string().required("概要は必須です").max(300, "概要は300文字以内で入力してください"), // 概要は文字列で必須かつ最大300文字
  coverimage: yup.string(), // カバー画像は文字列で任意
  date: yup.date().required("日付は必須です").max(new Date(), "日付は今日以前で入力してください"), // 日付はDate型で必須かつ今日以前
  content: yup.string().required("本文は必須です").max(100000, "本文は100000文字以内で入力してください"), // 本文は文字列で必須かつ最大100000文字
});

type Props = {
  post: PostType
}

// フォームコンポーネント
export default function PostForm({ post }: Props) {
  // postが空オブジェクトなら新規投稿モード、そうでないなら編集モード
  const mode = Object.keys(post).length === 0 ? "create" : "edit";

  // Next.jsのAPIに送信する関数
  const submitForm = async (data: FormValues) => {
    try {
      const response = await fetch("/api/posts", {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert(`ブログ記事が${mode === "create" ? "作成" : "更新"}されました`);
      } else {
        alert("エラーが発生しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data: session } = useSession()

  // React Hook Formとyupを使ってフォームを管理する
  const { register, setValue, watch, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      id: post?.id || null,
      slug: post?.slug || "",
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      coverimage: post?.coverimage || "",
      date: post?.date || "",
      content: post?.content || "",
      signinmail: session?.user.email || "",
    },
  });

  // フォームにエラーがあるかどうか
  const hasError = Object.keys(formState.errors).length > 0;

  // signinmailをフォームの状態に設定する
  React.useEffect(() => {
    setValue("signinmail", session?.user.email);
  }, [session, setValue]);

  // signinmailをフォームの状態から取得する
  const signinmail = watch("signinmail");

  if (!session) {
    return (
      <>
        <SideMenu>
          <button onClick={() => signIn()}>サインイン</button>
        </SideMenu>
        <div>
          記事の投稿や編集を行いたい方はサインインをしてください。
        </div>
      </>
    )
  }

  const otherAuthor = mode === "edit" && session?.user?.email !== post.author.signinmail
  if (otherAuthor) {
    return (
      <>
        <div>
          他人の記事の編集はできません。
        </div>
      </>
    )
  }

  const SideMenuContent = () => {
    return (
        <>
          <div>
            <Link href="/author-form">会員情報</Link>
          </div>
          {mode === "edit"
            ?
              <div>
                <Link href="/post-form">新規投稿</Link>
              </div>
            :
              null
          }
          <div>
            <button onClick={() => signOut()}>サインアウト</button>
          </div>
        </>
    );
  }

  return (
    <>
      <SideMenu>
        <SideMenuContent />
      </SideMenu>
      <h1 className="mt-16 ml-32 text-5xl font-bold tracking-tighter leading-tight">{mode === "create" ? "新規投稿" : "記事の編集"}</h1>
      <form onSubmit={handleSubmit(submitForm)} className="mt-16 mb-16 ml-32">
        <div className="space-y-4">
          <div>
            <span className="bg-red-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">必須</span>
            <label htmlFor="slug" className="font-medium leading-6 text-gray-900">ブログ記事のURL</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id="slug"
                type="text"
                {...register("slug")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.slug && (
                <p className="error">{formState.errors.slug.message}</p>
              )}
            </div>
          </div>

          <div>
            <span className="bg-red-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">必須</span>
            <label htmlFor="title" className="font-medium leading-6 text-gray-900">タイトル</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id="title" 
                type="text" 
                {...register("title")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.title && (
                <p className="error">{formState.errors.title.message}</p>
              )}
            </div>
          </div>

          <div>
            <span className="bg-red-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">必須</span>
            <label htmlFor="excerpt" className="font-medium leading-6 text-gray-900">要約</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="excerpt" type="text" {...register("excerpt")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.excerpt && (
                <p className="error">{formState.errors.excerpt.message}</p>
              )}
            </div>
          </div>

          <div>
            <span className="bg-blue-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">任意</span>
            <label htmlFor="coverimage" className="font-medium leading-6 text-gray-900">カバー画像のURL</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="coverimage" type="text" {...register("coverimage")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.coverimage && (
                <p className="error">{formState.errors.coverimage.message}</p>
              )}
            </div>
          </div>

          <div>
            <span className="bg-red-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">必須</span>
            <label htmlFor="date" className="font-medium leading-6 text-gray-900">日付</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="date" type="date" {...register("date")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.date && (
                <p className="error">{formState.errors.date.message}</p>
              )}
            </div>
          </div>

          <div>
            <span className="bg-red-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">必須</span>
            <label htmlFor="content" className="font-medium leading-6 text-gray-900">本文</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <textarea id="content" rows={10} cols={50} {...register("content")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.content && (
                <p className="error">{formState.errors.content.message}</p>
              )}
            </div>
          </div>

          {mode === "edit" ? <input name="id" value={post.id} hidden /> : null}

          <input type="hidden" name="signinmail" value={signinmail} readOnly />

          <button
            type="submit"
            disabled={hasError}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            送信
          </button>
        </div>
      </form>
    </>
  );
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<Params>
) => {
  const { mode: modeOrArray, slug: slugOrArray } = context.query;
  const mode = Array.isArray(modeOrArray) ? modeOrArray[0] : modeOrArray;
  const slug = Array.isArray(slugOrArray) ? slugOrArray[0] : slugOrArray;
  const post = mode === "edit" && slug
  ? // 編集モード
    await getPostBySlug(slug, [
      'id',
      'slug',
      'title',
      'excerpt',
      'coverimage',
      'date',
      'author',
      'content',
    ])
  : // 新規投稿モード
    {};

  return {
    props: {
      post, // 編集モードでなければ空のオブジェクトになる
    },
  };
}
