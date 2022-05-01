import s from '@/resources/styles/pages/home.module.css';

function HomePage() {
  return (
    <main>
      <div className="wrapper">
        <div className={s.layout}>
          <h1 className="pageTitle">Главная</h1>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
