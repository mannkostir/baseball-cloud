import React, { TableHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 4px;
  thead > tr {
    height: 80px;
  }
  th {
    font-weight: 400;
    font-size: 14px;
    color: #667784;
    text-align: left;
  }
  tbody > tr {
    align-items: center;
    border-radius: 4px;
    background-color: #f7f8f9;
  }
  & > tr {
    display: flex;
    > td {
      flex: 1;
    }
  }
  tbody > td {
    padding: 15px 0;
    margin-bottom: 10px;
  }
  td {
    padding: 15px 0;
  }
`;

interface StyledTableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: JSX.Element | JSX.Element[];
}

const StyledTable = ({ children, ...props }: StyledTableProps) => {
  return <Table {...props}>{children}</Table>;
};

export default StyledTable;
