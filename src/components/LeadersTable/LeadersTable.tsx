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

const LeadersTable = () => {
  return (
    <StyledTable>
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
      <tr>
        <td>1</td>
        <td>
          <a>Name</a>
        </td>
        <td>43</td>
        <td>FSU</td>
        <td>Scorps</td>
        <td>81.456</td>
        <td>6</td>
        <td>68.8</td>
        <td>true</td>
      </tr>
    </StyledTable>
  );
};

export default LeadersTable;
