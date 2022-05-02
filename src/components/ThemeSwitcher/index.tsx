import { useState, ChangeEvent, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  getColorTheme,
  setColorTheme,
  themeOptions,
} from '@/utilities/colorTheme';
import s from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [selectedTheme, setSelectedTheme] = useState('');

  const updateSelectedColorTheme = () => setSelectedTheme(getColorTheme());

  useEffect(() => {
    updateSelectedColorTheme();
    window.addEventListener('colorThemeChange', updateSelectedColorTheme);

    return () => {
      window.removeEventListener('colorThemeChange', updateSelectedColorTheme);
    };
  }, []);

  const selectedThemeIndex = useMemo(
    () =>
      Object.values(themeOptions)
        .map((option) => option.value)
        .indexOf(selectedTheme),
    [selectedTheme],
  );

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(e.currentTarget.value);
    setColorTheme(e.currentTarget.value);
  };

  return (
    <fieldset className={clsx(s.switcher, className)}>
      <legend className={s.switcherLegend}>Тема</legend>
      {themeOptions.map((option) => (
        <label
          key={`${option.value}_color_theme_label`}
          className={clsx(
            s.switcherButton,
            option.value === selectedTheme && s.switcherButtonSelected,
          )}
          htmlFor={`${option.value}_color_theme_radio`}>
          <span className={s.switcherButtonText}>{option.label}</span>
        </label>
      ))}
      {themeOptions.map((option) => (
        <input
          key={`${option.value}_color_theme_radio`}
          id={`${option.value}_color_theme_radio`}
          className={s.switcherRadio}
          type="radio"
          name="color-theme"
          value={option.value}
          checked={option.value === selectedTheme}
          aria-label={option.label}
          onChange={handleValueChange}
        />
      ))}
      <div className={s.switcherOutline} />
      <div
        className={s.switcherStatus}
        style={{
          display: selectedThemeIndex === -1 ? 'none' : 'block',
          transform: `
            translateX(
              calc(
                (
                  var(--switcher-button-width) +
                  var(--switcher-button-gap)
                ) * ${selectedThemeIndex}
              )
            )`,
        }}
      />
    </fieldset>
  );
};
export default ThemeSwitcher;
