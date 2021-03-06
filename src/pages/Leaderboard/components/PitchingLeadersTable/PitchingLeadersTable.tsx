import { leaderboardService } from '@/services/leaderboardService';
import { Unpromise } from '@/types/commonTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledTable from '@/components/StyledTable';

interface ILeadersTableProps {
  leaderboardItems: Unpromise<
    ReturnType<typeof leaderboardService.getPitchingLeaderboard>
  >;
  toggleFavorite: (id: number, isInFavor: boolean) => void;
}

const LeaderPitchingTable = ({
  leaderboardItems = [],
  toggleFavorite,
}: ILeadersTableProps) => {
  console.log(leaderboardItems);
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Batter Name</th>
          <th>Age</th>
          <th>School</th>
          <th>Teams</th>
          <th>Pitch Type</th>
          <th>Velocity</th>
          <th>Spin Rate</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardItems.map((leader, index) => (
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/profile/${leader.pitcher_datraks_id}`}>
                {leader.pitcher_name}
              </Link>
            </td>
            <td>{leader.age}</td>
            <td>{leader.school.name}</td>
            <td>{leader.teams[0].name}</td>
            <td>{leader.pitch_type}</td>
            <td>{leader.velocity}</td>
            <td>{leader.spin_rate}</td>
            <td>
              <a
                onClick={() =>
                  toggleFavorite(leader.pitcher_datraks_id, leader.favorite)
                }
              >
                {leader.favorite ? 'Love' : 'Hate'}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default LeaderPitchingTable;
