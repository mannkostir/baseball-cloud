import { usePagination } from '@/hooks/usePagination';
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const StyledPagination = styled.div`
  margin-top: 20px;
  position: sticky;
  bottom: 0;
  margin-bottom: 20px;
  height: 30px;
  ul {
    display: flex;
    justify-content: center;
  }
  li > button {
    position: relative;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #414f5a;
    border: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    border-radius: 4px;
    margin: 0 2px;
    background-color: #f7f8f9;
  }
  li > button.active {
    pointer-events: none;
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: #48bbff;
    border: none;
  }
`;

interface IPaginationProps {
  initialPage: number;
  itemsAmount: number;
  itemsPerPage: number;
  onPageChange: (currentPage: number) => void;
}

const Pagination = ({
  initialPage,
  itemsAmount,
  itemsPerPage,
  onPageChange,
}: IPaginationProps) => {
  const { PageLinks, currentPage } = usePagination({
    initialPage,
    itemsAmount,
    itemsPerPage,
  });

  useEffect(() => {
    onPageChange(currentPage);
    // Don't want to pass or mess with useCallback for onPageChange
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledPagination>
      <PageLinks />
    </StyledPagination>
  );
};

export default Pagination;
