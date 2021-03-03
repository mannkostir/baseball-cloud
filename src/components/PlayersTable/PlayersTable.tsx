import { ProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledTable from '../StyledTable';

interface IPlayersTableProps {
  profiles: ProfileRecord[];
}

const PlayersTable = ({ profiles }: IPlayersTableProps) => {
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
            <td>{profile.favorite ? 'Love' : 'Hate'}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default PlayersTable;
