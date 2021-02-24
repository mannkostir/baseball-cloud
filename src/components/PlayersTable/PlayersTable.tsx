import { ProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
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
            <td>{profile.first_name}</td>
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
