import {
  FormValues,
  PlayerPosition,
  ReactSelectOptions,
} from '@/types/commonTypes';
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Filters from '../Filters';

const DateOptions: ReactSelectOptions<'all' | 'last_week' | 'last_month'> = [
  { value: 'all', label: 'All' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
];

const FavoriteOptions: ReactSelectOptions<1 | null> = [
  { value: null, label: 'All' },
  { value: 1, label: 'Favorite' },
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

interface ILeaderboardFiltersProps {
  onFiltersChange: (value: FormValues) => void;
}

const LeaderboardFilters = ({ onFiltersChange }: ILeaderboardFiltersProps) => {
  return (
    <div style={{ paddingRight: '40px', lineHeight: '1.2' }}>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form
            style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
          >
            <Field
              name="date"
              placeholder="Date"
              options={DateOptions}
              component={Filters.SelectInput}
              initialValue={DateOptions[0]}
            />
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
            <FormSpy
              subscription={{ values: true }}
              onChange={(values: FormValues) => {
                console.log(values);
                if (timeout) return;
                timeout = window.setTimeout(async () => {
                  timeout = null;
                  onFiltersChange(values);
                }, 0);
              }}
            />
          </form>
        )}
      </Form>
    </div>
  );
};

export default LeaderboardFilters;
