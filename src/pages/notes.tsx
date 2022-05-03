import Typograf from 'typograf';
import { getArticles } from '@/utilities/getArticles';
import NoteCard from '@/components/NoteCard';
import s from '@/resources/styles/pages/notes.module.css';

interface NoteCardData {
  slug: string;
  title: string;
  description: string;
}

interface NotesPageProps {
  noteCardsData: NoteCardData[];
}

function NotesPage({ noteCardsData }: NotesPageProps) {
  return (
    <main>
      <div className="wrapper">
        <div className={s.layout}>
          <h1 className="pageTitle">Конспекты</h1>
          <div className={s.notes}>
            {noteCardsData.map((data) => {
              return (
                <NoteCard
                  className={s.note}
                  key={data.slug}
                  title={data.title}
                  description={data.description}
                  url={data.slug}
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

  const noteCardsData: NoteCardData[] = articles.map((article) => ({
    slug: article.slug,
    title: tp.execute(article.title),
    description: article.description ? tp.execute(article.description) : null,
  }));

  return { props: { noteCardsData } };
}
