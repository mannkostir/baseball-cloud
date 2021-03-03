import Filters from '@/components/Filters';
import LoadingScreen from '@/components/LoadingScreen';
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
import { parseFormValues } from '@/utils/parseFormValues';
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

// type FormValues = {
//   school: string;
//   team: string;
//   position: PlayerPosition;
//   age: number;
//   favorite: 1;
//   profiles_count: number;
//   player_name: string;
//   offset: number;
// };

type FormValues = {
  [key: string]: { label: string; value: string } | string | number | any;
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
  const [query, setQuery] = useState<typeof defaultQuery>();
  const [profilesTotalCount, setProfilesTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNetwork = async (fetchQuery: Partial<typeof query>) => {
    try {
      setIsLoading(true);

      const profilesResponse = await profilesService.getProfiles({
        ...defaultQuery,
        ...fetchQuery,
      });

      setProfiles(profilesResponse.profiles);
      setProfilesTotalCount(profilesResponse.total_count);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const submitValues = parseFormValues(values);

    setQuery({ ...defaultQuery, ...submitValues });
    await fetchNetwork({ ...submitValues });
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
                parse={(value) => (+value > 0 ? +value : null)}
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
                subscription={{ values: true }}
                onChange={(values: FormValues) => {
                  setTimeout(() => {
                    onSubmit(values);
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
          {isLoading ? <LoadingScreen /> : <PlayersTable profiles={profiles} />}
        </div>
      </main>
    </Container>
  );
};

export default Network;
