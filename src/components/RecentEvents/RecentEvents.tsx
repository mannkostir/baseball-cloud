import { ExtendedProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
import Card from '../Card';
import * as Styled from './RecentEvents.styles';

interface IRecentEvents {
  events: Pick<ExtendedProfileRecord, 'recent_events'>;
}

const RecentEvents = ({ events }: IRecentEvents) => {
  return (
    <Card>
      <h3>Recent Session Reports</h3>
      {events.recent_events?.length ? (
        <div>
          Some events are present but idk display format. Why u need em anyway?
        </div>
      ) : (
        <div>No data currently linked to this profile</div>
      )}
    </Card>
  );
};

export default RecentEvents;
