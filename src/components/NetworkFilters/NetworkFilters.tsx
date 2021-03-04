import {
  FormValues,
  PlayerPosition,
  ReactSelectOptions,
} from '@/types/commonTypes';
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Filters from '../Filters';

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

interface INetworkFiltersProps {
  onFiltersChange: (value: FormValues) => void;
}

const NetworkFilters = ({ onFiltersChange }: INetworkFiltersProps) => {
  return (
    <Form onSubmit={() => {}}>
      {(props) => (
        <form style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <Field
            name="school"
            placeholder="School"
            component={Filters.TextInput}
          />
          <Field name="team" placeholder="Team" component={Filters.TextInput} />
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
                onFiltersChange(values);
              }, 0);
            }}
          ></FormSpy>
        </form>
      )}
    </Form>
  );
};

export default NetworkFilters;
