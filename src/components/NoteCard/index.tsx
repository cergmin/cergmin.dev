import { CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import s from './NoteCard.module.css';

interface NoteCardProps {
  className?: string;
  style?: CSSProperties;
  title: string;
  description?: string;
  date?: string;
  tag?: string;
  url: string;
}

const NoteCard = ({
  className,
  style,
  title,
  description,
  date,
  tag,
  url,
}: NoteCardProps) => {
  if (tag) {
    tag = tag.toString().split(' ').join(' • ').toUpperCase();
  }

  return (
    <article className={clsx(s.card, className)} style={style}>
      <Link href={url}>
        <a className={s.cardLink}>
          <div className={s.cardLayout}>
            <h2 className={s.cardTitle}>{title}</h2>
            {description && <p className={s.cardDescription}>{description}</p>}
            {(date || tag) && (
              <p className={s.cardMeta}>
                <span>{date}</span>
                <span>{tag}</span>
              </p>
            )}
          </div>
        </a>
      </Link>
    </article>
  );
};
export default NoteCard;
