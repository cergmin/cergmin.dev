import Link from 'next/link';
import clsx from 'clsx';
import s from './NoteCard.module.css';

interface NoteCardProps {
  className?: string;
  title: string;
  description?: string;
  url: string;
  background?: string;
  widthInCells?: number;
  heightInCells?: number;
}

const NoteCard = ({
  className,
  title,
  description,
  url,
  background,
  widthInCells,
  heightInCells,
}: NoteCardProps) => {
  widthInCells ??= 1;
  heightInCells ??= 1;

  return (
    <article
      className={clsx(s.card, className)}
      style={{
        background: background,
        gridColumn: `span ${widthInCells}`,
        gridRow: `span ${heightInCells}`,
      }}>
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
