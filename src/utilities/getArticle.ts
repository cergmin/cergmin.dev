import { existsSync, readFileSync } from 'fs';
import { join, relative, dirname, basename } from 'path';
import matter from 'gray-matter';
import { Article } from '@/utilities/getArticles';

export interface ArticleWithContent extends Article {
  content: string;
}

export async function getArticle(
  sourcePath: string,
): Promise<ArticleWithContent> {
  if (!existsSync(sourcePath)) {
    throw Error(`Folder '${sourcePath}' does not exists!`);
  }

  const pathToIndex = join(sourcePath, 'index.mdx');

  if (!existsSync(pathToIndex)) {
    throw Error(`Index MDX file '${pathToIndex}' does not exists!`);
  }

  const articleFileContent = readFileSync(pathToIndex, 'utf8');

  const { content, data: frontMatter } = matter(articleFileContent);

  return {
    path: pathToIndex,
    relativePath: relative(sourcePath, pathToIndex),
    title: frontMatter.title ?? basename(dirname(pathToIndex)),
    description: frontMatter.description ?? null,
    frontMatter: frontMatter,
    content: content,
  };
}
