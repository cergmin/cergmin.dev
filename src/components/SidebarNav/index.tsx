import { AnimationEventHandler, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import getScrollbarWidth from '@/utilities/getScrollbarWidth';
import s from './SidebarNav.module.css';

interface SidebarNavProps {
  className?: string;
  menuItems: {
    text: string;
    url: string;
  }[];
  open?: boolean;
  onClose?: () => void;
}

const SidebarNav = ({
  className,
  menuItems,
  open,
  onClose,
}: SidebarNavProps) => {
  const [isVisisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef(null);
  const themeSwitcherRef = useRef(null);

  const closeHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    const { code } = e;
    if (code === 'Escape') {
      closeHandler();
    }
  };

  const animationEndHandler: AnimationEventHandler = () => {
    if (!open) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    setIsVisible(true);

    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  useEffect(() => {
    if (!isVisisible) {
      return;
    }

    window.addEventListener('keydown', keyDownHandler);
    closeButtonRef.current.focus();

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isVisisible]);

  if (!isVisisible) {
    return <></>;
  }

  return (
    <>
      <div
        className={clsx(
          s.sidebarShade,
          open ? s.animationFadeEnter : s.animationFadeLeave,
        )}
        onClick={closeHandler}
      />
      <nav
        className={clsx(
          s.sidebar,
          open ? s.animationSlideEnter : s.animationSlideLeave,
          className,
        )}
        role="dialog"
        aria-label="Sidebar"
        onAnimationEnd={animationEndHandler}>
        <div
          className={s.focusTrap}
          tabIndex={0}
          aria-hidden="true"
          onFocus={() => themeSwitcherRef.current.focus()}
        />
        <div className={s.topSection}>
          <div className={s.topBar}>
            <h2 className={s.title}>Меню</h2>
            <button
              className={s.closeButton}
              onClick={closeHandler}
              aria-label="Close menu"
              ref={closeButtonRef}>
              <svg
                className={s.closeButtonIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-6 -6 24 24">
                <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path>
              </svg>
            </button>
          </div>
          <ol className={s.menu}>
            {menuItems.map((item) => {
              return (
                <li className={s.menuItem} key={item.url}>
                  <Link href={item.url}>
                    <a className={s.menuItemLink} onClick={closeHandler}>
                      {item.text}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={s.bottomSection}>
          <ThemeSwitcher className={s.themeSwitcher} ref={themeSwitcherRef} />
        </div>
        <div
          className={s.focusTrap}
          tabIndex={0}
          aria-hidden="true"
          onFocus={() => closeButtonRef.current.focus()}
        />
      </nav>
    </>
  );
};
export default SidebarNav;
