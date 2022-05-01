import Link from 'next/link';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import s from './Header.module.css';

const Header = () => {
  interface MenuItem {
    text: string;
    url: string;
  }

  const menuItems: MenuItem[] = [
    {
      text: 'Главная',
      url: '/',
    },
    {
      text: 'Конспекты',
      url: '/notes',
    },
    {
      text: 'Инструменты',
      url: '/tools',
    },
  ];

  return (
    <div className={s.headerSpacer}>
      <header className={s.header}>
        <div className="wrapper">
          <div className={s.headerLayout}>
            <nav className={s.headerNav}>
              <ul className={s.headerNavList}>
                {menuItems.map((item) => {
                  return (
                    <li key={item.url} className={s.headerNavListItem}>
                      <Link href={item.url}>
                        <a className={s.headerNavListLink}>{item.text}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className={s.headerPreferences}>
              <ThemeSwitcher className={s.headerThemeSwitcher} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
