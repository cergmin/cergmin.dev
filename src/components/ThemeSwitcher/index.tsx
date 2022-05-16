import {
  useState,
  useId,
  ChangeEvent,
  useEffect,
  forwardRef,
  Ref,
} from 'react';
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

const ThemeSwitcher = ({ className }: ThemeSwitcherProps, ref: Ref<any>) => {
  const id = useId();
  const [selectedTheme, setSelectedTheme] = useState('');
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorOffset, setIndicatorOffset] = useState(0);

  const updateSelectedColorTheme = () => setSelectedTheme(getColorTheme());

  useEffect(() => {
    updateSelectedColorTheme();
    window.addEventListener('colorThemeChange', updateSelectedColorTheme);

    return () => {
      window.removeEventListener('colorThemeChange', updateSelectedColorTheme);
    };
  }, []);

  useEffect(() => {
    const themeSwitcher = document.getElementById(`theme_switcher_${id}`);
    const selectedThemeLabel = document.getElementById(
      `${selectedTheme}_color_theme_label_${id}`,
    );

    if (!themeSwitcher || !selectedThemeLabel) {
      setIndicatorWidth(0);
      return;
    }

    setIndicatorWidth(selectedThemeLabel.clientWidth);
    setIndicatorOffset(
      selectedThemeLabel.getBoundingClientRect().left -
        themeSwitcher.getBoundingClientRect().left,
    );
  }, [selectedTheme]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(e.currentTarget.value);
    setColorTheme(e.currentTarget.value);
  };

  return (
    <fieldset
      className={clsx(s.switcher, className)}
      id={`theme_switcher_${id}`}>
      <legend className={s.switcherLegend}>Тема</legend>
      {themeOptions.map((option) => (
        <label
          key={`${option.value}_color_theme_label_${id}`}
          id={`${option.value}_color_theme_label_${id}`}
          className={clsx(
            s.switcherButton,
            option.value === selectedTheme && s.switcherButtonSelected,
          )}
          htmlFor={`${option.value}_color_theme_radio_${id}`}>
          <span className={s.switcherButtonText}>{option.label}</span>
        </label>
      ))}
      {themeOptions.map((option) => (
        <input
          key={`${option.value}_color_theme_radio_${id}`}
          id={`${option.value}_color_theme_radio_${id}`}
          ref={ref}
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
        className={s.switcherIndicator}
        style={{
          display: indicatorWidth === 0 ? 'none' : 'block',
          width: indicatorWidth,
          transform: `translateX(${indicatorOffset}px)`,
        }}
      />
    </fieldset>
  );
};

export default forwardRef(ThemeSwitcher);
