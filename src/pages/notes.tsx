import Typograf from 'typograf';
import { Article } from '@/utilities/getArticle';
import { getArticles } from '@/utilities/getArticles';
import NoteCard from '@/components/NoteCard';
import s from '@/resources/styles/pages/notes.module.css';

interface NotesPageProps {
  notes: Article[];
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
                  key={note.slug}
                  title={note.title}
                  description={note.description}
                  url={note.slug}
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

export async function getStaticProps() {
  const tp = new Typograf({ locale: ['ru', 'en-US'] });
  const articles = await getArticles('/notes');

  const notes: Article[] = articles.map((article) => {
    if (article.description) {
      article.description = tp.execute(article.description);
    }

    return article;
  });

  return { props: { notes } };
}
