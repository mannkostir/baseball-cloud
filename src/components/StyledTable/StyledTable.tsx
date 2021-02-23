import React, { TableHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

const Table = styled.table`
  width: 100%;
  th {
    font-weight: 400;
    font-size: 14px;
    color: #667784;
    text-align: left;
  }
`;

interface StyledTableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: JSX.Element | JSX.Element[];
}

const StyledTable = ({ children, ...props }: StyledTableProps) => {
  return <Table {...props}>{children}</Table>;
};

export default StyledTable;
