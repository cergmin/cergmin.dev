import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import {
  Article,
  getArticle,
  CONTENT_FOLDER_PATH,
} from '@/utilities/getArticle';
import { normalizeSlug } from '@/utilities/normalizeSlug';

async function getArticleSlugs(rootSlug: string): Promise<string[]> {
  rootSlug = normalizeSlug(rootSlug);
  const folderPath = join(CONTENT_FOLDER_PATH, rootSlug);

  if (!existsSync(folderPath)) {
    console.error(`Folder '${folderPath}' does not exists!`);
    return [];
  }

  const possibleIndexPath = join(folderPath, 'index.mdx');
  if (existsSync(possibleIndexPath)) {
    return [rootSlug];
  }

  const subSlugs: string[] = [];
  const files = readdirSync(folderPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      subSlugs.push(join(rootSlug, file.name));
    }
  }

  const articles = await Promise.all(subSlugs.map(getArticleSlugs));
  return articles.flat();
}

export async function getArticles(rootSlug: string): Promise<Article[]> {
  rootSlug = normalizeSlug(rootSlug);
  const articleSlugs = await getArticleSlugs(rootSlug);

  return Promise.all(articleSlugs.map(getArticle));
}
