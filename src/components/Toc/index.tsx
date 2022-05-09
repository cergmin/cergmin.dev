import { MouseEvent } from 'react';
import clsx from 'clsx';
import s from './Toc.module.css';

interface Heading {
  title: string;
  slug: string;
  level: number;
}

interface NestedHeading extends Heading {
  sub: NestedHeading[];
}

interface TocProps {
  className?: string;
  headings: Heading[];
}

function getNestedHeadings(headings: Heading[]): NestedHeading[] {
  if (headings.length === 0) {
    return [];
  }

  const nestedHeadings: NestedHeading[] = [
    {
      ...headings[0],
      sub: [],
    },
  ];

  for (let i = 1; i < headings.length; i++) {
    const lastTopNested = nestedHeadings[nestedHeadings.length - 1];

    const sub = [];
    while (i < headings.length && lastTopNested.level < headings[i].level) {
      sub.push(headings[i]);
      i++;
    }

    lastTopNested.sub = getNestedHeadings(sub);

    if (i < headings.length) {
      nestedHeadings.push({ ...headings[i], sub: [] });
    }
  }

  return nestedHeadings;
}

function getHeadingsList(nestedHeadings: NestedHeading[]) {
  function clickHandler(e: MouseEvent<HTMLAnchorElement>) {
    const headingSelector = e.currentTarget.getAttribute('href');
    const heading = document.querySelector(headingSelector);

    if (heading) {
      e.preventDefault();
      heading.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  return (
    <ol className={s.tocList}>
      {nestedHeadings.map((heading) => {
        return (
          <li className={s.tocListItem} key={heading.slug}>
            <a
              className={s.tocListItemLink}
              href={`#${heading.slug}`}
              onClick={clickHandler}>
              {heading.title}
            </a>
            {heading.sub.length > 0 && getHeadingsList(heading.sub)}
          </li>
        );
      })}
    </ol>
  );
}

const Toc = ({ className, headings }: TocProps) => {
  const nestedHeadings = getNestedHeadings(headings);

  return (
    <nav className={clsx(s.toc, className)}>
      <h2 className={s.tocHeading}>Содержание</h2>
      <div className={s.scrollable}>{getHeadingsList(nestedHeadings)}</div>
    </nav>
  );
};

export default Toc;
