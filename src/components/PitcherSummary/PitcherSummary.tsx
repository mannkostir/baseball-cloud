import React from 'react';
import Card from '../Card';
import * as Styled from './PitcherSummary.styles';

const PitcherSummary = () => {
  return (
    <Card>
      <h3>Top Batting Values</h3>
      <Styled.Content>
        <Styled.SummaryItem>
          <span>Exit Velocity</span>
          <Styled.SummaryValue>N/A</Styled.SummaryValue>
        </Styled.SummaryItem>
        <Styled.SummaryItem>
          <span>Carry Distance</span>
          <Styled.SummaryValue>N/A</Styled.SummaryValue>
        </Styled.SummaryItem>
        <Styled.SummaryItem>
          <span>Launch Angle</span>
          <Styled.SummaryValue>N/A</Styled.SummaryValue>
        </Styled.SummaryItem>
      </Styled.Content>
    </Card>
  );
};

export default PitcherSummary;
