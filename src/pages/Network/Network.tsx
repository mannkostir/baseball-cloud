import Container from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import NetworkFilters from '@/components/NetworkFilters';
import Pagination from '@/components/Pagination';
import PlayersTable from '@/components/PlayersTable';
import { usePagination } from '@/hooks/usePagination';
import { GetProfilesQuery } from '@/services/profilesService/profileServiceTypes';
import { useProfileService } from '@/services/profilesService/useProfileService';
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
  }, [query]);

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
    <Container>
      <Header>
        <h2>Network</h2>
        <NetworkFilters onFiltersChange={onFiltersChange} />
      </Header>
      <main>
        <div>Available Players ({profilesTotalCount})</div>
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
    </Container>
  );
};

export default Network;
