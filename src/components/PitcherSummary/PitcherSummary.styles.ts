import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 16px 24px 0 0;
`;

export const SummaryValue = styled.span`
  font-weight: 700;
`;
