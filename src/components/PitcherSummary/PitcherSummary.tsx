import { ExtendedProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
import Card from '../Card';
import * as Styled from './PitcherSummary.styles';

interface IPitcherSummaryProps {
  summary: Pick<ExtendedProfileRecord, 'batter_summary'>;
}

const PitcherSummary = ({ summary }: IPitcherSummaryProps) => {
  return (
    <Card>
      <h3>Top Batting Values</h3>
      <Styled.Content>
        <Styled.SummaryItem>
          <span>Exit Velocity</span>
          <Styled.SummaryValue>
            {summary.batter_summary[0]?.exit_velocity || 'N/A'}
          </Styled.SummaryValue>
        </Styled.SummaryItem>
        <Styled.SummaryItem>
          <span>Carry Distance</span>
          <Styled.SummaryValue>
            {summary.batter_summary[0]?.distance || 'N/A'}
          </Styled.SummaryValue>
        </Styled.SummaryItem>
        <Styled.SummaryItem>
          <span>Launch Angle</span>
          <Styled.SummaryValue>
            {summary.batter_summary[0]?.launch_angle || 'N/A'}
          </Styled.SummaryValue>
        </Styled.SummaryItem>
      </Styled.Content>
    </Card>
  );
};

export default PitcherSummary;
