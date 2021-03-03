import { useCallback, useMemo, useState } from 'react';

interface IUsePaginationProps {
  initialPage: number;
  itemsPerPage: number;
  itemsAmount: number;
}

export const usePagination = ({
  initialPage,
  itemsAmount,
  itemsPerPage,
}: IUsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const pagesAmount = useMemo(() => Math.ceil(itemsAmount / itemsPerPage), [
    itemsAmount,
    itemsPerPage,
  ]);

  const nextPage = () => {
    if (currentPage >= pagesAmount) return;

    setCurrentPage((page) => page + 1);
  };

  const previousPage = () => {
    if (currentPage === 1) return;

    setCurrentPage((page) => page - 1);
  };

  const goToPage = useCallback(
    (pageNumber) => {
      if (pageNumber < 1) setCurrentPage(1);
      if (pageNumber > pagesAmount) setCurrentPage(pagesAmount);

      setCurrentPage(pageNumber);
    },
    [setCurrentPage, pagesAmount]
  );

  const Link = useCallback(
    ({
      isActive,
      title,
      ...args
    }: React.HTMLAttributes<HTMLLinkElement> & {
      title: string;
      isActive: boolean;
    }) => {
      return <a className={isActive ? 'active' : ''}>{title}</a>;
    },
    [pagesAmount, currentPage, goToPage]
  );

  const PageLinks = useCallback(
    ({ ...args }: React.HTMLAttributes<HTMLUListElement>) => {
      const pages = [];
      for (let i = 1; i <= pagesAmount; i++) {
        pages.push(
          <li
            style={{ padding: '0 0.5em', cursor: 'pointer' }}
            key={`page${i}`}
            onClick={() => goToPage(i)}
          >
            <Link isActive={currentPage === i} title={i.toString()} />
          </li>
        );
      }
      return (
        <ul {...args}>
          <li onClick={previousPage}>
            <a>{'<<'}</a>
          </li>
          {pages}
          <li onClick={nextPage}>
            <a>{'>>'}</a>
          </li>
        </ul>
      );
    },
    [pagesAmount, currentPage, goToPage]
  );

  return {
    currentPage,
    itemsPerPage,
    pagesAmount,
    nextPage,
    previousPage,
    goToPage,
    PageLinks,
  };
};
