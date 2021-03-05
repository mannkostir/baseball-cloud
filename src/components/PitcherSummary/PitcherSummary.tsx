import { profilesService } from '@/services/profilesService';
import { Unpromise } from '@/types/commonTypes';
import React, { useMemo } from 'react';
import Card from '../Card';
import ProgressLine from '../ProgressLine';
import * as Styled from './PitcherSummary.styles';

interface IPitcherSummaryProps {
  summary: Pick<
    Unpromise<ReturnType<typeof profilesService.getProfile>>,
    'batter_summary'
  >;
}

const PitcherSummary = ({ summary }: IPitcherSummaryProps) => {
  const summaryValues = useMemo(() => {
    const sum = summary.batter_summary.reduce(
      (acc, curr) => {
        acc.exit_velocity += curr.exit_velocity;
        acc.distance += curr.distance;
        acc.launch_angle += curr.launch_angle;

        return acc;
      },
      { exit_velocity: 0, distance: 0, launch_angle: 0 }
    );

    return sum;
  }, [summary]);
  return (
    <Card>
      <h3>Top Batting Values</h3>
      <Styled.Content>
        <Styled.SummaryItem>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span>Exit Velocity</span>
            <Styled.SummaryValue>
              {summaryValues.exit_velocity || 'N/A'}
            </Styled.SummaryValue>
          </div>
          <ProgressLine
            progressPercents={(summaryValues.exit_velocity / 142) * 100}
          />
        </Styled.SummaryItem>
        <Styled.SummaryItem>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span>Carry Distance</span>
            <Styled.SummaryValue>
              {summaryValues.distance || 'N/A'}
            </Styled.SummaryValue>
          </div>
          <ProgressLine
            progressPercents={(summaryValues.distance / 365) * 100}
          />
        </Styled.SummaryItem>
        <Styled.SummaryItem>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span>Launch Angle</span>
            <Styled.SummaryValue>
              {summaryValues.launch_angle || 'N/A'}
            </Styled.SummaryValue>
          </div>
          <ProgressLine
            progressPercents={(summaryValues.launch_angle / 50) * 100}
          />
        </Styled.SummaryItem>
      </Styled.Content>
    </Card>
  );
};

export default PitcherSummary;
