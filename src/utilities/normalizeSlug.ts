import { normalize, join } from 'path';

export function normalizeSlug(slug: string) {
  slug = normalize(slug);
  slug = join('/', slug);
  slug = slug.replace(/\\+/g, '/');

  return slug;
}
