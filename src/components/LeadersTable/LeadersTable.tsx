import { LeaderboardRecord } from '@/services/leaderboardService/leaderboardServiceTypes';
import React from 'react';
import styled from 'styled-components/macro';

const StyledTable = styled.table`
  width: 100%;
  th {
    font-weight: 400;
    font-size: 14px;
    color: #667784;
    text-align: left;
  }
`;

interface ILeadersTableProps {
  leaderboardItems: LeaderboardRecord[];
}

const LeadersTable = ({ leaderboardItems = [] }: ILeadersTableProps) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Batter Name</th>
          <th>Age</th>
          <th>School</th>
          <th>Teams</th>
          <th>Exit Velocity</th>
          <th>Launch Angle</th>
          <th>Distance</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardItems.map((leader, index) => (
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>
              <a>{leader.batter_name}</a>
            </td>
            <td>{leader.age}</td>
            <td>{leader.school.name}</td>
            <td>{leader.teams[0].name}</td>
            <td>{leader.exit_velocity}</td>
            <td>{leader.launch_angle}</td>
            <td>{leader.distance}</td>
            <td>{leader.favorite}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default LeadersTable;
