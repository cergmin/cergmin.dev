import { join } from 'path';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getArticle, Article } from '@/utilities/getArticle';
import { getArticles } from '@/utilities/getArticles';
import { parseMDX } from '@/utilities/parseMDX';
import clsx from 'clsx';
import s from '@/resources/styles/pages/note.module.css';
import Callout from '@/components/Callout';

interface NotePageProps {
  note: Article;
  mdxSource: MDXRemoteSerializeResult;
  error: number;
}

function NotePage({ note, mdxSource, error }: NotePageProps) {
  if (error) {
    return (
      <main>
        <div className="wrapper">
          <div className={s.layout}>
            <h1 className="pageTitle">Ошибка {error}</h1>
          </div>
        </div>
      </main>
    );
  }

  const mdxComponents = {
    Callout,
  };

  return (
    <main>
      <div className="wrapper">
        <div className={s.layout}>
          <article className={clsx(s.note, 'article')}>
            <h1 className="pageTitle">{note?.title}</h1>
            <MDXRemote {...mdxSource} components={mdxComponents} />
          </article>
        </div>
      </div>
    </main>
  );
}

export default NotePage;

export async function getStaticProps(context) {
  let { slug } = context.params;
  slug = join('notes', ...(Array.isArray(slug) ? slug : [slug]));

  let note: Article = null;
  let mdxSource: MDXRemoteSerializeResult<Record<string, unknown>> = null;
  let error = null;

  try {
    note = await getArticle(slug);
  } catch (e) {
    console.error(e);
    error = 404;
  }

  try {
    if (!error) {
      const parsedMDX = await parseMDX(note.content);
      mdxSource = parsedMDX.source;
    }
  } catch (e) {
    console.error('MDX parsing error!');
    console.error(e);
    error = 500;
  }

  return { props: { note, mdxSource, error } };
}

export async function getStaticPaths() {
  const articles = await getArticles('/notes');
  const paths = articles.map((article) => ({
    params: { slug: article.slug.split('/').slice(2) },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
