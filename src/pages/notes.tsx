import React from 'react';
import { join, dirname } from 'path';
import { getArticles } from '@/utilities/getArticles';
import NoteCard from '@/components/NoteCard';
import s from '@/resources/styles/pages/notes.module.css';

interface Note {
  url: string;
  title: string;
  description?: string;
  background?: string;
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
            {notes.map((note, i) => {
              const widthInCells = i % 11 == 6 ? 2 : 1;
              const heightInCells = i % 9 == 2 ? 2 : 1;

              return (
                <NoteCard
                  className={s.note}
                  key={note.url}
                  title={note.title}
                  description={note.description}
                  url={note.url}
                  background={note.background}
                  widthInCells={widthInCells}
                  heightInCells={heightInCells}
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
  const articles = await getArticles(join(process.cwd(), 'content/notes'));

  const notes: Note[] = articles.map((article) => {
    let noteUrl = article.relativePath;
    noteUrl = join('notes', noteUrl);
    noteUrl = dirname(noteUrl);

    return {
      url: noteUrl,
      title: article.title,
      description: article.description,
      background: article.background,
    };
  });

  return { props: { notes } };
}
