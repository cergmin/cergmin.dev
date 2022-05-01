import { useState, useEffect } from 'react';

export const themeOptions = [
  {
    value: 'light',
    label: 'Светлая',
  },
  {
    value: 'auto',
    label: 'Авто',
  },
  {
    value: 'dark',
    label: 'Тёмная',
  },
];

export function getColorTheme(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const colorTheme = localStorage.getItem('color-theme');

  let isValidColorTheme = false;
  for (const themeOption of themeOptions) {
    if (themeOption.value === colorTheme) {
      isValidColorTheme = true;
      break;
    }
  }

  if (!isValidColorTheme) {
    localStorage.removeItem('color-theme');
    return 'auto';
  }

  return colorTheme;
}

export function setColorTheme(colorTheme: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (colorTheme === 'auto') {
    localStorage.removeItem('color-theme');
  } else {
    localStorage.setItem('color-theme', colorTheme);
  }

  const colorThemeChangeEvent = new Event('colorThemeChange');
  window.dispatchEvent(colorThemeChangeEvent);
}

export function useColorTheme() {
  const [colorThemeState, setColorThemeState] = useState(getColorTheme());

  const updateState = () => setColorThemeState(getColorTheme());

  useEffect(() => {
    window.addEventListener('colorThemeChange', updateState);

    return () => {
      window.removeEventListener('colorThemeChange', updateState);
    };
  }, []);

  return colorThemeState;
}

(function () {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('storage', () => {
    const colorThemeChangeEvent = new Event('colorThemeChange');
    window.dispatchEvent(colorThemeChangeEvent);
  });
})();

(function () {
  if (typeof window === 'undefined') {
    return;
  }

  function updateColorThemeStyleTag() {
    const colorTheme = getColorTheme();
    const lightColorThemeStyleTag = document.getElementById(
      'lightColorThemeStyleTag',
    );
    const darkColorThemeStyleTag = document.getElementById(
      'darkColorThemeStyleTag',
    );

    let lightColorThemeStyleTagMedia = '(prefers-color-scheme: light)';
    let darkColorThemeStyleTagMedia = '(prefers-color-scheme: dark)';

    if (colorTheme === 'light') {
      lightColorThemeStyleTagMedia = 'all';
      darkColorThemeStyleTagMedia = 'not all';
    } else if (colorTheme === 'dark') {
      lightColorThemeStyleTagMedia = 'not all';
      darkColorThemeStyleTagMedia = 'all';
    }

    lightColorThemeStyleTag.setAttribute('media', lightColorThemeStyleTagMedia);
    darkColorThemeStyleTag.setAttribute('media', darkColorThemeStyleTagMedia);
  }

  window.addEventListener('colorThemeChange', updateColorThemeStyleTag);
  updateColorThemeStyleTag();
})();
