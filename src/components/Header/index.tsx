import { useState, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import SidebarNav from '@/components/SidebarNav';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import s from './Header.module.css';

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

const Header = () => {
  const [isSidebarNavOpen, setIsSidebarNavOpen] = useState(false);
  const openSidebarNavButtonRef = useRef(null);

  return (
    <>
      <SidebarNav
        menuItems={menuItems}
        open={isSidebarNavOpen}
        onClose={() => {
          setIsSidebarNavOpen(false);
          openSidebarNavButtonRef.current.focus();
        }}
      />
      <div className={s.headerSpacer}>
        <header className={s.header}>
          <div className="wrapper">
            {/* Desktop layout */}
            <div className={clsx(s.headerLayout, s.desktop)}>
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

            {/* Mobile layout */}
            <div className={clsx(s.headerLayout, s.mobile)}>
              <div></div>
              <button
                className={s.menuButton}
                aria-label="Open menu"
                onClick={() => setIsSidebarNavOpen(true)}
                ref={openSidebarNavButtonRef}>
                <svg
                  className={s.menuButtonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-5 -7 24 24">
                  <path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};
export default Header;
