import { profilesService } from '@/services/profilesService';
import { Unpromise } from '@/types/commonTypes';
import React from 'react';
import Card from '@/components/Card';

interface IRecentEvents {
  events: Pick<
    Unpromise<ReturnType<typeof profilesService.getProfile>>,
    'recent_events'
  >;
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
