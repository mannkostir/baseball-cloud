import { profilesService } from '@/services/profilesService';
import React, { useEffect, useState } from 'react';
import StyledTable from '../StyledTable';
import { BattingSummary, Unpromise } from '@/types/commonTypes';

interface IBattingValuesProps {
  playerId: string;
}

const BattingValues = ({ playerId }: IBattingValuesProps) => {
  const [battingSummary, setBattingSummary] = useState<{
    average_values: BattingSummary[];
    top_values: BattingSummary[];
  }>();

  useEffect(() => {
    (async () => {
      const data = await profilesService.getBattingSummary({ id: playerId });

      setBattingSummary(data);
    })();
  }, []);

  return (
    <div>
      <h3>Top Batting Values</h3>
      <StyledTable>
        <thead>
          <tr>
            <th>Pitch Type</th>
            <th>Distance</th>
            <th>Launch Angle</th>
            <th>Exit Velocity</th>
          </tr>
        </thead>
        <tbody>
          {battingSummary?.top_values.map((value) => (
            <tr>
              <td>{value.pitch_type}</td>
              <td>{value.distance}</td>
              <td>{value.launch_angle}</td>
              <td>{value.exit_velocity}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <h3>Average Batting Values</h3>
      <StyledTable>
        <thead>
          <tr>
            <th>Pitch Type</th>
            <th>Distance</th>
            <th>Launch Angle</th>
            <th>Exit Velocity</th>
          </tr>
        </thead>
        <tbody>
          {battingSummary?.average_values.map((value) => (
            <tr>
              <td>{value.pitch_type}</td>
              <td>{value.distance}</td>
              <td>{value.launch_angle}</td>
              <td>{value.exit_velocity}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default BattingValues;
