import React from 'react';
import StyledTable from '../StyledTable';

const PlayersTable = () => {
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
        <tr>
          <td>Name</td>
          <td>-</td>
          <td>FSU</td>
          <td>Scorps</td>
          <td>20</td>
          <td>false</td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default PlayersTable;
