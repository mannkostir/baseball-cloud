import styled from 'styled-components/macro';

export const DataItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitleContainer = styled.div`
  position: relative;
  margin: 15px 0;
  &::before {
    content: '';
    position: absolute;
    top: 11px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
`;

export const SectionTitle = styled.h3`
  display: inline-block;
  position: relative;
  padding-right: 12px;
  font-weight: 900;
  color: #414f5a;
  z-index: 2;
  background-color: #ffffff;
`;

export const Heading = styled.span`
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: #667784;
  margin-bottom: 3px;
  text-align: left;
`;

export const Value = styled.span`
  font-size: 16px;
  color: #667784;
  margin-bottom: 11px;
`;

export const InlineInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    flex: 0 0 48%;
  }
`;
