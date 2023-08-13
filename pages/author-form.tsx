import React from "react";
import { GetServerSideProps } from "next";
import { getAuthorBySession } from "../lib/api";
import { signIn, signOut } from "next-auth/react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SideMenu from "../components/side-menu"
import Link from 'next/link'

// フォームの型定義
type FormValues = {
  name: string;
  picture: string;
  signinmail: string;
};

// バリデーションスキーマを定義
const schema = yup.object().shape({
  name: yup.string().max(300, "著者名は200文字以内で入力してください"), // 著者名は文字列で任意、最大200文字
  picture: yup.string().max(300, "著者画像のパスは200文字以内で入力してください"), // 著者画像は文字列で任意、最大200文字
});

// フォームコンポーネント
export default function AuthorForm({ author, signinmail, visitorIsSignedIn }) {
  if (!visitorIsSignedIn) {
    return (
      <>
        <SideMenu>
          <button onClick={() => signIn()}>サインイン</button>
        </SideMenu>
        <div>
          会員情報を登録・編集したい方はサインインをしてください。
        </div>
      </>
    )
  }

  // authorが空オブジェクトなら登録モード、そうでないなら編集モード
  const mode = Object.keys(author).length === 0 ? "create" : "edit";

  // Next.jsのAPIに送信する関数
  const submitForm = async (data: FormValues) => {
    try {
      const response = await fetch("/api/author", {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert(`会員情報が${mode === "create" ? "登録" : "更新"}されました`);
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
      name: author?.name || "",
      picture: author?.picture || "",
      signinmail,
    },
  });

  // フォームにエラーがあるかどうか
  const hasError = Object.keys(formState.errors).length > 0;

  const SideMenuContent = () => {
    return (
        <>
          <div>
            <Link href="/post-form">新規投稿</Link>
          </div>
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
      <h1 className="mt-16 ml-32 text-5xl font-bold tracking-tighter leading-tight">{mode === "create" ? "会員情報の登録" : "会員情報の編集"}</h1>
      <form onSubmit={handleSubmit(submitForm)} className="mt-16 mb-16 ml-32">
        <div className="space-y-4">
          <div>
            <span className="bg-blue-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">任意</span>
            <label htmlFor="authorName" className="font-medium leading-6 text-gray-900">著者名</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="authorName" type="text" {...register("name")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.name && (
                <p className="error">{formState.errors.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <span className="bg-blue-500 text-white font-bold text-xs px-2 py-0.5 mr-1 rounded focus:outline-none focus:shadow-outline">任意</span>
            <label htmlFor="authorPicture" className="font-medium leading-6 text-gray-900">著者画像のURL</label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input id="authorPicture" type="text" {...register("picture")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              {formState.errors.picture && (
                <p className="error">{formState.errors.picture.message}</p>
              )}
            </div>
          </div>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { author, signinmail, visitorIsSignedIn } = await getAuthorBySession(
    ["name", "picture"],
    context
  );

  return {
    props: {
      author,
      signinmail,
      visitorIsSignedIn,
    },
  };
};
