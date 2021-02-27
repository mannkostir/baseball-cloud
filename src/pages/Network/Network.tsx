import Filters from '@/components/Filters';
import PlayersTable from '@/components/PlayersTable';
import { profilesService } from '@/services/profilesService';
import { ProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
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
  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [profilesTotalCount, setProfilesTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const profilesResponse = await profilesService.getProfiles({
          offset: 0,
          profiles_count: 10,
        });

        setProfiles(profilesResponse.profiles);
        setProfilesTotalCount(profilesResponse.total_count);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Container>
      <Header>
        <h2>Network</h2>
        <Form onSubmit={() => {}}>
          {(props) => (
            <form
              style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
            >
              <Field
                name="school"
                placeholder="School"
                component={Filters.TextInput}
              />
              <Field
                name="team"
                placeholder="Team"
                component={Filters.TextInput}
              />
              <Field
                name="position"
                placeholder="Position"
                component={Filters.SelectInput}
              />
              <Field
                name="age"
                placeholder="Age"
                component={Filters.TextInput}
              />
            </form>
          )}
        </Form>
      </Header>
      <main>
        <div>Available Players (-)</div>
        <div>
          <PlayersTable profiles={profiles} />
        </div>
      </main>
    </Container>
  );
};

export default Network;
