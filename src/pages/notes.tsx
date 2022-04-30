import { join, dirname } from 'path';
import React, { CSSProperties } from 'react';
import Typograf from 'typograf';
import { Article, getArticles } from '@/utilities/getArticles';
import NoteCard from '@/components/NoteCard';
import s from '@/resources/styles/pages/notes.module.css';

interface Note extends Article {
  url: string;
}

interface NotesPageProps {
  notes: Note[];
}

function NotesPage({ notes }: NotesPageProps) {
  return (
    <main>
      <div className="wrapper">
        <div className={s.layout}>
          <h1 className="pageTitle">Конспекты</h1>
          <div className={s.notes}>
            {notes.map((note) => {
              return (
                <NoteCard
                  className={s.note}
                  key={note.url}
                  title={note.title}
                  description={note.description}
                  url={note.url}
                  appearance={note.metaData.cardAppearance}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotesPage;

export async function getServerSideProps() {
  const tp = new Typograf({ locale: ['ru', 'en-US'] });
  const articles = await getArticles(join(process.cwd(), 'content/notes'));

  const notes: Note[] = articles.map((article) => {
    let noteUrl = article.relativePath;
    noteUrl = join('/notes', noteUrl);
    noteUrl = dirname(noteUrl);
    noteUrl = noteUrl.replaceAll('\\', '/');
    noteUrl = noteUrl.replaceAll('//', '/');

    if (article.description) {
      article.description = tp.execute(article.description);
    }

    return {
      ...article,
      url: noteUrl,
    };
  });

  return { props: { notes } };
}
