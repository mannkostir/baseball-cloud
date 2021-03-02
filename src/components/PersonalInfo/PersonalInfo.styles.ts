import styled from 'styled-components/macro';

export const Container = styled.div``;

export const TraitsList = styled.ul`
  display: flex;
  flex-flow: column;
`;

export const TraitsItem = styled.li`
  display: flex;
  padding: 16px 0;
  justify-content: space-between;
  align-items: flex-start;
  color: #333333;
`;

export const TraitTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TraitTitle = styled.span``;

export const TraitIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;
