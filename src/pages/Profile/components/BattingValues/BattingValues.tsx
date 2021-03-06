import React from 'react';
import StyledTable from '@/components/StyledTable';
import { BattingSummary } from '@/types/commonTypes';

interface IBattingValuesProps {
  battingSummary: {
    top_values: BattingSummary[];
    average_values: BattingSummary[];
  };
}

const BattingValues = ({ battingSummary }: IBattingValuesProps) => {
  return (
    <div style={{ width: '100%' }}>
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
            <tr key={value.id}>
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
            <tr key={value.id}>
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
