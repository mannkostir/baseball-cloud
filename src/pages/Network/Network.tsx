import Filters from '@/components/Filters';
import PlayersTable from '@/components/PlayersTable';
import { profilesService } from '@/services/profilesService';
import {
  GetProfilesQuery,
  ProfileRecord,
} from '@/services/profilesService/profileServiceTypes';
import {
  FormValue,
  PlayerPosition,
  ReactSelectOptions,
} from '@/types/commonTypes';
import React, { useEffect, useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
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

type FormValues = {
  school: string;
  team: string;
  position: PlayerPosition;
  age: number;
  favorite: 1;
  profiles_count: number;
  player_name: string;
  offset: number;
};

const FavoriteOptions: ReactSelectOptions<1 | null> = [
  { value: null, label: 'All' },
  { value: 1, label: 'Favorite' },
];

const ProfilesCountOptions: ReactSelectOptions<10 | 15 | 25> = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 25, label: '25' },
];

const PositionOptions: ReactSelectOptions<PlayerPosition> = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const currentPage = 0;

const Network = () => {
  const defaultQuery: GetProfilesQuery = {
    profiles_count: 10,
    offset: 10 * currentPage,
  };

  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [query, setQuery] = useState<typeof defaultQuery>({
    ...defaultQuery,
  });
  const [profilesTotalCount, setProfilesTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const profilesResponse = await profilesService.getProfiles({
          ...defaultQuery,
          ...query,
        });

        setProfiles(profilesResponse.profiles);
        setProfilesTotalCount(profilesResponse.total_count);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]);

  const onSubmit = (values: FormValues) => {
    setQuery({ ...values });
  };

  return (
    <Container>
      <Header>
        <h2>Network</h2>
        <Form onSubmit={onSubmit}>
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
                options={PositionOptions}
              />
              <Field
                name="age"
                placeholder="Age"
                component={Filters.TextInput}
              />
              <Field
                name="favorite"
                placeholder="Favorite"
                component={Filters.SelectInput}
                options={FavoriteOptions}
              />
              <Field
                name="profiles_count"
                placeholder="Show"
                component={Filters.SelectInput}
                options={ProfilesCountOptions}
              />
              <Field
                name="player_name"
                placeholder="Search"
                component={Filters.TextInput}
              />
              <FormSpy
                onChange={() => {
                  setTimeout(() => {
                    props.handleSubmit();
                  }, 0);
                }}
              ></FormSpy>
            </form>
          )}
        </Form>
      </Header>
      <main>
        <div>Available Players ({profilesTotalCount})</div>
        <div>
          <PlayersTable profiles={profiles} />
        </div>
      </main>
    </Container>
  );
};

export default Network;
