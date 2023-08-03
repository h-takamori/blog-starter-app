// import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client'
// import { db } from '@vercel/postgres';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    response.status(405).end();
    return
  }

  try {
    // const authorColumns = Object.keys(author);
    // const authorColumnsString = authorColumns.join(",");
    // console.log(authorColumnsString);
    // const authorValues = Object.values(author);
    // const authorValuesString = `'${authorValues.join("','")}'`;
    // console.log(authorValuesString);

    // console.log("name,picture" === authorColumnsString);
    // console.log(`'ccccc',''` === authorValuesString);
    // // トランザクションを開始
    // await sql`BEGIN;`;

    // Blog_userテーブルにデータを登録し、idカラムの値を取得
    // const result = await sql`INSERT INTO Blog_user (${authorColumnsString}) VALUES (${authorValuesString}) RETURNING id;`;
    // 文字列リテラルだと登録に成功する。テンプレートリテラルの埋め込みがうまくいっていないのでその調査から再スタート
    // const blog_userInsertSql = `INSERT INTO Blog_user (${authorColumnsString}) VALUES (${authorValuesString});`;
    // console.log(blog_userInsertSql);
    // console.log(blog_userInsertSql === "INSERT INTO Blog_user (name,picture) VALUES ('ccccc','');");
    // const result = await sql`${blog_userInsertSql}`;
    // console.log(result);

    // const client = await db.connect();
    // await client.sql`${blog_userInsertSql}`;
    

    // // resultは配列なので、最初の要素を取り出す
    // const row = result[0];
    // console.log(row);

    // // idカラムの値を変数に代入
    // const id = row.id;

    // // idカラムの値をコンソールに出力
    // console.log(id);

    // post.authorId = id
    // const postColumns = Object.keys(post);
    // const postColumnsString = postColumns.join(",");
    // console.log(postColumnsString);
    // const postValues = Object.values(post);
    // const postValuesString = `'${postValues.join("','")}'`;
    // console.log(postValuesString);

    // // Postテーブルにデータを登録
    // await sql`INSERT INTO Post (${postColumnsString}) VALUES (${postValuesString});`;

    // // トランザクションを確定
    // await sql`COMMIT;`;
    // const petName = request.query.petName as string;
    // const ownerName = request.query.ownerName as string;
    // if (!petName || !ownerName) throw new Error('Pet and owner names required');
    // await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;

    const { author, ...post } = request.body;

    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
      data: {
        ...author,
        posts: {
          create: [
            { ...post },
          ],
        },
      },
    })

    return response.status(200).json({ message: "ブログ記事が作成されました。" });
  } catch (error) {
    console.log(error);
    // // トランザクションを取り消し
    // await sql`ROLLBACK;`;
    return response.status(500).json({ error });
  }


  // const markdown = matter.stringify(content, data);
  // const filePath = `_posts/${slug}.md`;

  // fs.writeFile(filePath, markdown, (err) => {
  //   if (err) {
  //     response.json({ message: 'Failed to save the file', error: err });
  //   } else {
  //     response.json({ message: 'Successfully saved the file' });
  //   }
  // });
}
