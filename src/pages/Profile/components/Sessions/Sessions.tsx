import Datepicker from '@/components/Datepicker';
import Filters from '@/components/Filters';
import StyledTable from '@/components/StyledTable';
import { profilesService } from '@/services/profilesService';
import { ReactSelectOptions, Unpromise } from '@/types/commonTypes';
import { parseFormValues } from '@/utils/parseFormValues';
import React, { useEffect, useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { components } from 'react-select';

type EventType = '' | 'Game' | 'Practice';

type FilterFormValues = {
  event_type: { label: string; value: EventType };
  date: string;
  count: number;
  offset: number;
  profile_id: string;
};

const eventTypeOptions: ReactSelectOptions<
  FilterFormValues['event_type']['value']
> = [
  { value: '', label: 'None' },
  { value: 'Game', label: 'Game' },
  { value: 'Practice', label: 'Practice' },
];

interface IDatepickerMenuComponent {
  menuProps: any;
  datepickerProps?: React.ComponentProps<typeof Datepicker>;
}

const DatepickerMenuComponent = ({
  menuProps,
  datepickerProps,
}: IDatepickerMenuComponent) => {
  return (
    <>
      <components.Menu {...menuProps}>
        <Datepicker {...datepickerProps} />
      </components.Menu>
    </>
  );
};

const Sessions = ({
  profile_id,
  events,
}: {
  profile_id: string;
  events: Unpromise<
    ReturnType<typeof profilesService.getProfile>
  >['recent_events'];
}) => {
  const defaultFiltersQuery: Partial<FilterFormValues> = {
    count: 10,
    offset: 0,
    profile_id,
  };

  const [currentSessions, setCurrentSessions] = useState<
    Unpromise<ReturnType<typeof profilesService.getProfileEvents>>['events']
  >([]);
  const [sessionsTotalAmount, setSessionsTotalAmount] = useState<number>(0);

  const [query, setQuery] = useState<typeof defaultFiltersQuery>(
    defaultFiltersQuery
  );

  const [date, setDate] = useState(new Date());

  const SessionsFilterForm = withTypes<FilterFormValues>();

  useEffect(() => {
    if (!query) return;

    onFiltersChange(query);
  }, [query]);

  const onDateChange = (date: Date) => {
    setDate(date);
  };

  const onFiltersChange = async (filtersQuery: typeof query) => {
    if (!Object.keys(filtersQuery).length) return;

    const { events, total_count } = await profilesService.getProfileEvents({
      ...defaultFiltersQuery,
      ...filtersQuery,
      count: 10,
      offset: 0,
      date: date.toLocaleDateString().replaceAll('/', '-'),
      event_type:
        filtersQuery.event_type?.value || defaultFiltersQuery.event_type?.value,
      profile_id: '715',
    });

    setCurrentSessions(events);
    setSessionsTotalAmount(total_count);
  };

  return (
    <section style={{ width: '100%' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: '100px',
        }}
      >
        <h2>Sessions</h2>
        <SessionsFilterForm.Form onSubmit={() => {}}>
          {(props) => (
            <form>
              <Field name="date">
                {(fieldProps) => (
                  <Filters.SelectInput
                    placeholder="Date"
                    {...fieldProps}
                    components={{
                      Menu: (props) => (
                        <DatepickerMenuComponent
                          menuProps={props}
                          datepickerProps={{
                            onChange: (date) => {
                              onDateChange(date);
                              fieldProps.input.onChange({
                                label: `Date (${date
                                  .toLocaleDateString()
                                  .replaceAll('/', '-')})`,
                                value: date,
                              });
                            },
                            selected: date,
                          }}
                        />
                      ),
                    }}
                  />
                )}
              </Field>
              <Field
                name="event_type"
                format={(value) =>
                  !value?.value
                    ? { label: 'Type' }
                    : { label: `Type (${value.value})` }
                }
              >
                {(fieldProps) => (
                  <Filters.SelectInput
                    placeholder="Type"
                    options={eventTypeOptions}
                    {...fieldProps}
                  />
                )}
              </Field>
              <SessionsFilterForm.FormSpy
                subscription={{ values: true, modifiedSinceLastSubmit: true }}
                onChange={(formState) => {
                  setTimeout(() => {
                    setQuery(formState.values);
                  }, 0);
                }}
              />
            </form>
          )}
        </SessionsFilterForm.Form>
      </header>
      {sessionsTotalAmount ? (
        <StyledTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Name</th>
              <th>Purchased</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.map((session) => (
              <tr>
                <td>{session.date}</td>
                <td>{session.event_type}</td>
                <td>{session.event_name}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
          }}
        >
          The player haven't had any sessions yet!
        </div>
      )}
    </section>
  );
};

export default Sessions;
