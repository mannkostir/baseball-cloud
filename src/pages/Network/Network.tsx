import FlexContainer from '@/components/FlexContainer';
import Filters from '@/components/Filters';
import Icons from '@/components/Icons';
import LoadingScreen from '@/components/LoadingScreen';
import NetworkFilters from './components/NetworkFilters';
import Pagination from '@/components/Pagination';
import PlayersTable from './components/PlayersTable';
import { GetProfilesQuery } from '@/api/profiles/profilesAPITypes';
import { useProfileService } from '@/api/profiles/useProfilesAPI';
import { notificationsActions } from '@/store/notifications';
import { parseFormValues } from '@/utils/parseFormValues';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useNetwork } from './useNetwork';

const Header = styled.header`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

type FormValues = {
  [key: string]: { label: string; value: string } | string | number | any;
};

const Network = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState<Partial<GetProfilesQuery>>();

  const {
    fetchNetwork,
    profiles,
    profilesTotalCount,
    isLoading,
  } = useNetwork();

  const { toggleMyHolyFavor } = useProfileService();

  useEffect(() => {
    if (!query) return;

    fetchNetwork(query);
    // Exclude fetchNetwork from dependency (doable without disabling, revisit later)
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPageChange = (currentPage: number) => {
    if (!query || !query?.profiles_count) return;

    setQuery((prevQuery) => ({
      ...prevQuery,
      offset: query?.profiles_count
        ? query?.profiles_count * currentPage - query?.profiles_count
        : 0,
    }));
  };

  const onFiltersChange = async (values: FormValues) => {
    const submitValues = parseFormValues(values);

    setQuery(submitValues);
  };

  const toggleFavor = async (id: number, isInFavor: boolean) => {
    if (!query) return;

    await toggleMyHolyFavor(id, isInFavor);
    await fetchNetwork(query);

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
    <FlexContainer>
      <Header>
        <h2>Network</h2>
        <NetworkFilters onFiltersChange={onFiltersChange} />
      </Header>
      <main>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          <div>Available Players ({profilesTotalCount})</div>
          <Filters.TextInput
            width="120px"
            type="text"
            placeholder="Player Name"
            Icon={() => <Icons.Search />}
            placeholderColor="#788b99"
            position="left"
            onChange={(e) =>
              onFiltersChange({
                ...query,
                player_name: `${e.target.value}`,
              })
            }
          />
        </div>
        <div>
          <div
            style={{
              padding: '0 20px',
              marginTop: '20px',
              minHeight: '436px',
            }}
          >
            {isLoading ? (
              <LoadingScreen style={{ minHeight: '436px' }} />
            ) : (
              <PlayersTable
                isLoading={isLoading}
                toggleFavorite={toggleFavor}
                profiles={profiles}
              />
            )}
          </div>
          <Pagination
            initialPage={1}
            itemsAmount={profilesTotalCount}
            itemsPerPage={query?.profiles_count || 10}
            onPageChange={onPageChange}
          />
        </div>
      </main>
    </FlexContainer>
  );
};

export default Network;
