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
    let targetPage = currentPage + 1;

    if (currentPage >= pagesAmount) targetPage = 1;

    setCurrentPage(targetPage);
  };

  const previousPage = () => {
    let targetPage = currentPage - 1;

    if (currentPage === 1) targetPage = pagesAmount;

    setCurrentPage(targetPage);
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

  const getPreviousPageNumber = () => {
    if (currentPage - 1 <= 1) return;
    return (
      <>
        {currentPage - 2 > 1 && (
          <li>
            <a aria-disabled={true}>...</a>
          </li>
        )}
        <li
          key={`page${currentPage - 1}`}
          onClick={() => goToPage(currentPage - 1)}
        >
          <Link
            isActive={currentPage === currentPage - 1}
            title={(currentPage - 1).toString()}
          />
        </li>
      </>
    );
  };

  const getNextPageNumber = () => {
    if (currentPage >= pagesAmount - 1) return;
    return (
      <>
        <li
          key={`page${currentPage + 1}`}
          onClick={() => goToPage(currentPage + 1)}
        >
          <Link
            isActive={currentPage === currentPage + 1}
            title={(currentPage + 1).toString()}
          />
        </li>
        {currentPage === 1 && (
          <li
            key={`page${currentPage + 2}`}
            onClick={() => goToPage(currentPage + 2)}
          >
            <Link
              isActive={currentPage === currentPage + 2}
              title={(currentPage + 2).toString()}
            />
          </li>
        )}
        {currentPage + 2 < pagesAmount && (
          <li>
            <a aria-disabled={true}>...</a>
          </li>
        )}
      </>
    );
  };

  const getCurrentPageNumber = () => {
    if (currentPage === 1 || currentPage === pagesAmount) return;
    return (
      <li key={`page${currentPage}`} onClick={() => goToPage(currentPage)}>
        <Link
          isActive={currentPage === currentPage}
          title={currentPage.toString()}
        />
      </li>
    );
  };

  const PageLinks = useCallback(
    ({ ...args }: React.HTMLAttributes<HTMLUListElement>) => {
      const pages = [];
      for (let i = 1; i <= pagesAmount; i++) {
        pages.push(
          <li key={`page${i}`} onClick={() => goToPage(i)}>
            <Link isActive={currentPage === i} title={i.toString()} />
          </li>
        );
      }
      return (
        <ul {...args}>
          <li onClick={previousPage}>
            <a>{'<<'}</a>
          </li>
          {pagesAmount ? (
            <>
              <li key={`page${1}`} onClick={() => goToPage(1)}>
                <Link isActive={currentPage === 1} title={'1'} />
              </li>
              {getPreviousPageNumber()}
              {getCurrentPageNumber()}
              {getNextPageNumber()}
              {pagesAmount > 1 && (
                <li
                  key={`page${pagesAmount}`}
                  onClick={() => goToPage(pagesAmount)}
                >
                  <Link
                    isActive={currentPage === pagesAmount}
                    title={pagesAmount.toString()}
                  />
                </li>
              )}
            </>
          ) : (
            <li>
              <a aria-disabled={true}>...</a>
            </li>
          )}
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
