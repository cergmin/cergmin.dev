import { existsSync, readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { basename, dirname, join, relative } from 'path';
import matter from 'gray-matter';

export interface Article {
  path: string;
  relativePath: string;
  title: string;
  description?: string;
  background?: string;
}

async function getArticleDataPaths(
  sourcePath: string,
  metaPath?: string,
): Promise<{ articlePath: string; metaPath?: string }[]> {
  let filesDebug = readdirSync(join(sourcePath, '..'), { withFileTypes: true });
  for (const file of filesDebug) {
    console.log(join(sourcePath, '..', file.name));
  }

  filesDebug = readdirSync(join(sourcePath, '../..'), { withFileTypes: true });
  for (const file of filesDebug) {
    console.log(join(sourcePath, '../..', file.name));
  }

  if (!existsSync(sourcePath)) {
    console.error(`Folder '${sourcePath}' does not exists!`);
    return [];
  }

  const possibleMetaPath = join(sourcePath, 'meta.json');
  if (existsSync(possibleMetaPath)) {
    metaPath = possibleMetaPath;
  }

  const possibleIndexPath = join(sourcePath, 'index.mdx');
  if (existsSync(possibleIndexPath)) {
    return [{ articlePath: possibleIndexPath, metaPath: metaPath }];
  }

  const files = readdirSync(sourcePath, { withFileTypes: true });
  const folders: string[] = [];
  for (const file of files) {
    const pathToFile = join(sourcePath, file.name);

    if (file.isDirectory()) {
      folders.push(pathToFile);
    }
  }

  const articles = await Promise.all(
    folders.map((folderPath) => getArticleDataPaths(folderPath, metaPath)),
  );

  return articles.flat();
}

export async function getArticles(sourcePath: string): Promise<Article[]> {
  const articleDataPaths = await getArticleDataPaths(sourcePath);

  const articleDataPromises: Promise<{
    articlePath: string;
    articleContent: string;
    metaContent: string;
  }>[] = [];

  for (const articleDataPath of articleDataPaths) {
    const { articlePath, metaPath } = articleDataPath;

    const articleContentPromise = readFile(articlePath, 'utf8');
    const metaContentPromise = metaPath
      ? readFile(metaPath, 'utf8')
      : Promise.resolve(null);

    const articleArrayDataPromise = Promise.all([
      articlePath,
      articleContentPromise,
      metaContentPromise,
    ]);
    const articleDataPromise = articleArrayDataPromise.then(
      ([articlePath, articleContent, metaContent]) => ({
        articlePath,
        articleContent,
        metaContent,
      }),
    );

    articleDataPromises.push(articleDataPromise);
  }

  const articleData = await Promise.all(articleDataPromises);

  const articles = articleData.map(
    ({ articlePath, articleContent, metaContent }) => {
      const metaData = JSON.parse(metaContent);
      const { data: frontMatter } = matter(articleContent);

      const articleData: Article = {
        path: articlePath,
        relativePath: relative(sourcePath, articlePath),
        title: frontMatter.title ?? basename(dirname(articlePath)),
        description: frontMatter.description ?? null,
        background: metaData.background ?? null,
      };

      return articleData;
    },
  );

  return articles;
}
