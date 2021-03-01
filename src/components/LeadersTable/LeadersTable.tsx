import { LeaderboardRecord } from '@/services/leaderboardService/leaderboardServiceTypes';
import { profilesService } from '@/services/profilesService';
import { profileActions } from '@/store/profile';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';
import StyledTable from '../StyledTable';

interface ILeadersTableProps {
  leaderboardItems: LeaderboardRecord[];
  toggleFavorite: (id: number, isInFavor: boolean) => void;
  isLoading: boolean;
}

const LeadersTable = ({
  leaderboardItems = [],
  toggleFavorite,
  isLoading,
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
                {leader.favorite ? 'Love' : 'Hate'}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default LeadersTable;
