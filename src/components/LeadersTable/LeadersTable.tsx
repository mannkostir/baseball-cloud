import { leaderboardService } from '@/services/leaderboardService';
import { Unpromise } from '@/types/commonTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledTable from '../StyledTable';
import { ReactComponent as LikeIcon } from '@/assets/images/heart.svg';
import { ReactComponent as FilledLikeIcon } from '@/assets/images/like.svg';

interface ILeadersTableProps {
  leaderboardItems: Unpromise<
    ReturnType<typeof leaderboardService.getLeaderboard>
  >;
  toggleFavorite: (id: number, isInFavor: boolean) => void;
  isLoading: boolean;
  type: 'batting' | 'pitching';
}

const LeadersTable = ({
  leaderboardItems = [],
  toggleFavorite,
  isLoading,
  type,
}: ILeadersTableProps) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Batter Name</th>
          <th>Age</th>
          <th>School</th>
          <th>Teams</th>
          <th>{type === 'batting' ? 'Exit Velocity' : 'Pitch Type'}</th>
          <th>{type === 'batting' ? 'Launch Angle' : 'Velocity'}</th>
          <th>{type === 'batting' ? 'Distance' : 'Spin Rate'}</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardItems.map((leader, index) => (
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/profile/${leader.batter_datraks_id}`}>
                {leader.batter_name}
              </Link>
            </td>
            <td>{leader.age}</td>
            <td>{leader.school.name}</td>
            <td>{leader.teams[0].name}</td>
            <td>{leader.exit_velocity}</td>
            <td>{leader.launch_angle}</td>
            <td>{leader.distance}</td>
            <td>
              <a
                onClick={() =>
                  toggleFavorite(leader.batter_datraks_id, leader.favorite)
                }
              >
                {leader.favorite ? (
                  <FilledLikeIcon width="17px" height="17px" fill="#48bbff" />
                ) : (
                  <LikeIcon width="17px" height="17px" fill="#48bbff" />
                )}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default LeadersTable;
