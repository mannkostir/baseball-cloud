import { ProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledTable from '../StyledTable';
import { ReactComponent as LikeIcon } from '@/assets/images/heart.svg';
import { ReactComponent as FilledLikeIcon } from '@/assets/images/like.svg';
import LoadingScreen from '../LoadingScreen';

interface IPlayersTableProps {
  profiles: ProfileRecord[];
  isLoading: boolean;
  toggleFavorite: (id: number, isInFavor: boolean) => void;
}

const PlayersTable = ({
  profiles,
  toggleFavorite,
  isLoading,
}: IPlayersTableProps) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Sessions</th>
          <th>School</th>
          <th>Teams</th>
          <th>Age</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile) => (
          <tr key={profile.id}>
            <td>
              <Link to={`/profile/${profile.id}`}>
                {profile.first_name} {profile.last_name}
              </Link>
            </td>
            <td>-</td>
            <td>{profile.school ? profile.school.name : '-'}</td>
            <td>{profile.teams[0] ? profile.teams[0].name : '-'}</td>
            <td>{profile.age}</td>
            <td>
              <a onClick={() => toggleFavorite(+profile.id, profile.favorite)}>
                {profile.favorite ? (
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

export default PlayersTable;
