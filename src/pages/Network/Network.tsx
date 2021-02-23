import PlayersTable from '@/components/PlayersTable';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.header`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const Network = () => {
  return (
    <Container>
      <Header>
        <h2>Network</h2>
      </Header>
      <main>
        <div>Available Players (-)</div>
        <div>
          <PlayersTable />
        </div>
      </main>
    </Container>
  );
};

export default Network;
