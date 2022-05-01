import { normalize, join } from "path";

export function normalizeSlug(slug: string) {
    slug = normalize(slug);
    slug = join('/', slug);
    slug = slug.replaceAll('\\', '/');
    slug = slug.replaceAll('//', '/');

    return slug;
}