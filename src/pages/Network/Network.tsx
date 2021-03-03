import Filters from '@/components/Filters';
import LoadingScreen from '@/components/LoadingScreen';
import PlayersTable from '@/components/PlayersTable';
import { usePagination } from '@/hooks/usePagination';
import { profilesService } from '@/services/profilesService';
import {
  GetProfilesQuery,
  ProfileRecord,
} from '@/services/profilesService/profileServiceTypes';
import { useProfileService } from '@/services/profilesService/useProfileService';
import { notificationsActions } from '@/store/notifications';
import {
  FormValue,
  PlayerPosition,
  ReactSelectOptions,
} from '@/types/commonTypes';
import { parseFormValues } from '@/utils/parseFormValues';
import React, { useEffect, useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';
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

const Pagination = styled.div`
  margin-top: 20px;
  li > a {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #414f5a;
    border: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    border-radius: 4px;
    margin: 0 2px;
    background-color: #f7f8f9;
  }
  li > a.active {
    pointer-events: none;
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: #48bbff;
    border: none;
  }
`;

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

const PositionOptions: ReactSelectOptions<PlayerPosition | null> = [
  { value: null, label: 'All' },
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

let timeout: number | null;

const Network = () => {
  const defaultQuery: GetProfilesQuery = {
    profiles_count: 10,
    offset: 0,
  };

  const dispatch = useDispatch();

  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [query, setQuery] = useState<typeof defaultQuery>();
  const [profilesTotalCount, setProfilesTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { PageLinks, currentPage } = usePagination({
    initialPage: 1,
    itemsAmount: profilesTotalCount,
    itemsPerPage: query?.profiles_count || 10,
  });

  const { toggleMyHolyFavor } = useProfileService();

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

  useEffect(() => {
    if (!query?.profiles_count) return;

    setQuery({ ...defaultQuery, ...query, offset: 10 });

    (async () => {
      await fetchNetwork({
        ...defaultQuery,
        ...query,
        offset: query?.profiles_count * currentPage - query?.profiles_count,
      });
    })();
  }, [currentPage]);

  const onSubmit = async (values: FormValues) => {
    const submitValues = parseFormValues(values);

    setQuery({ ...defaultQuery, ...submitValues });
    await fetchNetwork({ ...submitValues });
  };

  const toggleFavor = async (id: number, isInFavor: boolean) => {
    await toggleMyHolyFavor(id, isInFavor);
    await fetchNetwork({ ...query });

    let message: string;

    if (isInFavor) {
      message = 'Removed from favorite';
    } else {
      message = 'Added to favorite';
    }

    dispatch(
      notificationsActions.addNotification({
        status: 'success',
        message,
      })
    );
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
                initialValue={PositionOptions[0]}
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
                initialValue={FavoriteOptions[0]}
              />
              <Field
                name="profiles_count"
                placeholder="Show"
                component={Filters.SelectInput}
                options={ProfilesCountOptions}
                initialValue={ProfilesCountOptions[0]}
              />
              <Field
                name="player_name"
                placeholder="Search"
                component={Filters.TextInput}
              />
              <FormSpy
                subscription={{ values: true }}
                onChange={(values: FormValues) => {
                  if (timeout) return;
                  timeout = window.setTimeout(async () => {
                    timeout = null;
                    await onSubmit(values);
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
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <div style={{ padding: '0 20px', marginTop: '20px' }}>
                <PlayersTable
                  toggleFavorite={toggleFavor}
                  profiles={profiles}
                />
              </div>
              <Pagination>
                <>
                  <PageLinks
                    style={{ display: 'flex', justifyContent: 'center' }}
                  />
                </>
              </Pagination>
            </>
          )}
        </div>
      </main>
    </Container>
  );
};

export default Network;
