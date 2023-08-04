import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// フォームの型定義
type FormValues = {
  slug: string;
  title: string;
  excerpt: string;
  coverimage?: string;
  date: string;
  author: {
    name: string;
    picture?: string;
  };
  ogimage: string;
  content: string;
};
  
// バリデーションスキーマを定義
const schema = yup.object().shape({
  slug: yup.string().required("ブログ記事のURLは必須です").max(100, "ブログ記事のURLは100文字以内で入力してください"), // ブログ記事のURLは文字列で必須かつ最大100文字
  title: yup.string().required("タイトルは必須です"), // タイトルは文字列で必須
  excerpt: yup.string().required("概要は必須です").max(300, "概要は300文字以内で入力してください"), // 概要は文字列で必須かつ最大300文字
  coverimage: yup.string(), // カバー画像は文字列で任意
  date: yup.date().required("日付は必須です").max(new Date(), "日付は今日以前で入力してください"), // 日付はDate型で必須かつ今日以前
  author: yup.object().shape({ // 著者はオブジェクトで以下の形式
    name: yup.string().required("著者名は必須です"), // 著者名は文字列で必須
    picture: yup.string(), // 著者画像は文字列で任意
  }),
  ogimage: yup.string(), // OG画像のURLは文字列で任意
  content: yup.string().required("本文は必須です").max(100000, "本文は100000文字以内で入力してください"), // 本文は文字列で必須かつ最大100000文字
});

// フォームコンポーネント
export default function BlogForm() {
  // Next.jsのAPIに送信する関数
  const submitForm = async (data: FormValues) => {
    try {
      const response = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("ブログ記事が作成されました");
      } else {
        alert("エラーが発生しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // React Hook Formとyupを使ってフォームを管理する
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      slug: "",
      title: "",
      excerpt: "",
      coverimage: "",
      date: "",
      author: {
        name: "",
        picture: "",
      },
      ogimage: "",
      content: "",
    },
  });

  // フォームにエラーがあるかどうか
  const hasError = Object.keys(formState.errors).length > 0;

  return (
    <>
      <h1 className="mt-16 ml-32 text-5xl font-bold tracking-tighter leading-tight">新規投稿</h1>
      <form onSubmit={handleSubmit(submitForm)} className="mt-16 mb-16 ml-32">
        <div className="space-y-4">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">ブログ記事のURL</label>
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
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">タイトル</label>
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
            <label htmlFor="excerpt" className="block text-sm font-medium leading-6 text-gray-900">要約</label>
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
            <label htmlFor="coverimage" className="block text-sm font-medium leading-6 text-gray-900">カバー画像のURL</label>
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
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">日付</label>
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
            <label htmlFor="authorName" className="block text-sm font-medium leading-6 text-gray-900">著者名</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="authorName" type="text" {...register("author.name")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              {formState.errors.author?.name && (
                <p className="error">{formState.errors.author?.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="authorPicture" className="block text-sm font-medium leading-6 text-gray-900">著者画像のURL</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="authorPicture" type="text" {...register("author.picture")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              {formState.errors.author?.picture && (
                <p className="error">{formState.errors.author?.picture.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="ogimage" className="block text-sm font-medium leading-6 text-gray-900">OG画像のURL</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="ogimage" type="text" {...register("ogimage")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              {formState.errors.ogimage && (
                <p className="error">{formState.errors.ogimage.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">本文</label>
            {/* <input id="content" type="text" {...register("content")} /> */}
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <textarea id="content" rows={10} cols={50} {...register("content")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              {formState.errors.content && (
                <p className="error">{formState.errors.content.message}</p>
              )}
            </div>
          </div>

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
