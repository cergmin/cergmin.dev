import { CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import s from './NoteCard.module.css';

interface NoteCardProps {
  className?: string;
  style?: CSSProperties;
  title: string;
  description?: string;
  url: string;
  appearance?: string;
}

const NoteCard = ({
  className,
  style,
  title,
  description,
  url,
  appearance,
}: NoteCardProps) => {
  appearance = appearance ?? 'default';

  return (
    <article
      className={clsx(s.card, className)}
      style={style}
      data-appearance={appearance}>
      <Link href={url}>
        <a className={s.cardLink}>
          <div className={s.cardLayout}>
            <h2 className={s.cardTitle}>{title}</h2>
            {description && <p className={s.cardDescription}>{description}</p>}
          </div>
        </a>
      </Link>
    </article>
  );
};
export default NoteCard;
