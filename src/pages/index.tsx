import s from '@/resources/styles/pages/home.module.css';

function HomePage() {
  return (
    <main>
      <div className="wrapper">
        <div className={s.layout}>
          <h1 className={s.introductionTitle}>
            Привет, меня&nbsp;зовут
            <br />
            <span className={s.name}>Минаков Сергей.</span>
          </h1>
          <p className={s.introductionDescription}>
            Я фронтенд разработчик!
            <br />
            Пишу приложения на JavaScript,
            <br />
            обычно использую React и Next.js.
          </p>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
