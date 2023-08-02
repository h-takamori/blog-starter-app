---
title: '更新履歴および更新予定'
excerpt: '更新履歴および更新予定をここに記載していきます。'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-01-01T05:35:07.322Z'
author:
  name: h-takamori
  picture: 
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

### 更新済み

- ・更新履歴ページを追加
- ・ページ最上部の説明書き（Alertコンポーネント）を変更
- ・トップページ上部にスライドショー形式のトップ画像を追加
- ・トップページにおける最新投稿のプレビューを「Hero Post」として明示化
- ・Hero Postのカバーイメージのサイズを調整し、その他の要素も含めて縦積みに変更
- ・トップページの「More Stories」（投稿一覧のプレビュー）のグリッド列数をPC閲覧時のみ3列に変更
- ・More Storiesをグリッド丸ごとクリック可能に変更し、ホバーエフェクトを追加
- ・記事の投稿機能を追加
- ・SSGからSSRに変更

### 更新予定

- ・この更新予定をGitHubのIssueに移動
- ・すべてのページから記事の投稿ページへのリンクを貼る
- ・記事の投稿時にdateを入力せずに済むようにする
- ・記事の投稿ページのレスポンシブ対応の見直し
- ・pages/blog-form.tsx、pages/api/blog.jsのファイル名を再考する
- ・pages/api/blog.jsをTypeScript化する
- ・slugのバリデーションを厳格にする
- ・記事の編集機能
- ・記事の編集時にdateをどうするか検討する
- ・既存の投稿ページからそのページの編集画面へのリンクを貼る
- ・記事の削除機能
- ・既存の投稿ページからそのページの削除画面（またはポップアップ）へのリンクを貼る
- ・coverImageとogImage-urlを分けて管理するのをやめる
- ・coverImage、author-picture、ogImage-urlのアップロード機能
- ・トップ画像のアップロード機能
- ・記事の投稿ページのファビコンを設定する
- ・サインアップ・サインイン機能
- ・ユーザーページの追加（author-pictureの設定、自分の投稿のCRUD操作、adminのみトップ画像やファビコンの設定）
- ・投稿の保存形式をMarkdownからVercel Postgres+Prismaに変更
- ・「Hero Post」を「Latest Post」に名称変更し、ファイル名およびコンポーネント名を変更する
- ・「More Stories」を「More Posts」に名称変更し、ファイル名およびコンポーネント名を変更する
