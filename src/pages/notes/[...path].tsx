import { join } from 'path';
import React from 'react';
import { NextPageContext } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize as MDXSerialize } from 'next-mdx-remote/serialize';
import Typograf from 'typograf';
import { getArticle, ArticleWithContent } from '@/utilities/getArticle';
import s from '@/resources/styles/pages/note.module.css';
import clsx from 'clsx';

interface NotePageProps {
  note: ArticleWithContent;
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
            <h1 className="pageTitle">{note.title}</h1>
            <MDXRemote {...mdxSource} />
          </article>
        </div>
      </div>
    </main>
  );
}

export default NotePage;

export async function getServerSideProps(context: NextPageContext) {
  let { path: notePath } = context.query;
  notePath = join(
    process.env.ROOT_PATH,
    'src/content/notes',
    ...(Array.isArray(notePath) ? notePath : [notePath]),
  );

  let note: ArticleWithContent = null;
  let error = null;

  try {
    note = await getArticle(notePath);
  } catch {
    error = 404;
  }

  const tp = new Typograf({ locale: ['ru', 'en-US'] });

  const mdxSource = await MDXSerialize(tp.execute(note.content));

  return { props: { note, mdxSource, error } };
}
