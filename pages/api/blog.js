import matter from 'gray-matter'
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return
  }

  const { slug, content, ...data } = req.body;
  const markdown = matter.stringify(content, data);
  const filePath = `_posts/${slug}.md`;

  fs.writeFile(filePath, markdown, (err) => {
    if (err) {
      res.json({ message: 'Failed to save the file', error: err });
    } else {
      res.json({ message: 'Successfully saved the file' });
    }
  });
}
