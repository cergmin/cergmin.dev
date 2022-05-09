import { ReactNode } from 'react';
import clsx from 'clsx';
import s from './Callout.module.css';

interface CalloutProps {
  className?: string;
  type?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const Callout = ({
  className,
  type,
  title,
  subtitle,
  children,
}: CalloutProps) => {
  return (
    <div className={clsx(s.callout, className)} data-type={type}>
      {(title || subtitle) && (
        <p className={s.calloutHeading}>
          <span className={s.calloutHeadingTitle}>{title}</span>
          {title && subtitle && ' '}
          <span className={s.calloutHeadingSubitle}>{subtitle}</span>
        </p>
      )}
      {children}
    </div>
  );
};

export default Callout;
