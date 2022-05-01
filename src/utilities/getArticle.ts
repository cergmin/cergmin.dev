import { existsSync, readFileSync } from 'fs';
import { join, normalize } from 'path';
import matter from 'gray-matter';
import { normalizeSlug } from '@/utilities/normalizeSlug';

export const CONTENT_FOLDER_PATH = join(process.cwd(), 'content');

export interface ArticleMetaData {
  cardAppearance?: string;
  [key: string]: any;
}

export interface Article {
  slug: string;
  title: string;
  description?: string;
  content: string;
  frontMatter: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
  metaData: ArticleMetaData;
}

export async function getArticleMetaData(
  articleSlug: string,
): Promise<ArticleMetaData> {
  articleSlug = normalizeSlug(articleSlug);

  let metaData = {};
  const fullPath = join(CONTENT_FOLDER_PATH, articleSlug);

  if (!existsSync(fullPath)) {
    console.error(`Folder '${fullPath}' does not exists!`);
    return {};
  }

  const possibleMetaPath = join(fullPath, 'meta.json');
  if (existsSync(possibleMetaPath)) {
    metaData = JSON.parse(readFileSync(possibleMetaPath, 'utf8'));
  }
  
  const upperSlug = join('/', articleSlug, '..');
  if (normalizeSlug(articleSlug) === normalizeSlug(upperSlug)) {
    return metaData;
  }

  return {
    ...(await getArticleMetaData(upperSlug)),
    ...metaData,
  };
}

export async function getArticle(articleSlug: string): Promise<Article> {
  articleSlug = normalizeSlug(articleSlug);
  
  const fullPath = join(CONTENT_FOLDER_PATH, articleSlug);
  if (!existsSync(fullPath)) {
    throw Error(`Folder '${fullPath}' does not exists!`);
  }

  const pathToIndex = join(fullPath, 'index.mdx');
  if (!existsSync(pathToIndex)) {
    throw Error(`Index MDX file '${pathToIndex}' does not exists!`);
  }

  const articleFileContent = readFileSync(pathToIndex, 'utf8');

  const { content, data: frontMatter } = matter(articleFileContent);
  const metaData = await getArticleMetaData(articleSlug);

  return {
    slug: articleSlug,
    title: frontMatter.title ?? articleSlug,
    description: frontMatter.description ?? null,
    frontMatter: frontMatter,
    metaData: metaData,
    content: content,
  };
}
