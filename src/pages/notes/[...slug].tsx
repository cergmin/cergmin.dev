import { join } from 'path';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize as MDXSerialize } from 'next-mdx-remote/serialize';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkTypograf from '@mavrin/remark-typograf';
import { getArticle, Article } from '@/utilities/getArticle';
import { getArticles } from '@/utilities/getArticles';
import clsx from 'clsx';
import s from '@/resources/styles/pages/note.module.css';

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

  return (
    <main>
      <div className="wrapper">
        <div className={s.layout}>
          <article className={clsx(s.note, 'article')}>
            <h1 className="pageTitle">{note?.title}</h1>
            <MDXRemote {...mdxSource} />
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
      mdxSource = await MDXSerialize(note.content, {
        mdxOptions: {
          // ts-ignore reasons:
          // https://github.com/hashicorp/next-mdx-remote/issues/86
          remarkPlugins: [
            // @ts-ignore
            remarkParse,
            // @ts-ignore
            remarkMath,
            [remarkTypograf, { locale: ['ru', 'en-US'] }],
          ],
          // @ts-ignore
          rehypePlugins: [rehypeKatex],
        },
      });
    }
  } catch (e) {
    console.error('MDXSerialize error!');
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
