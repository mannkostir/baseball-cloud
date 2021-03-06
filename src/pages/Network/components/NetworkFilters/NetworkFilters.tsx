import {
  PlayerPosition,
  ReactSelectOptions,
  School,
  Team,
} from '@/types/commonTypes';
import React from 'react';
import { Field, withTypes } from 'react-final-form';
import Filters from '@/components/Filters';

type FiltersFormTypes = {
  school: { label: string; value: School };
  team: { label: string; value: Team }[];
  position: { label: string; value: PlayerPosition | '' };
  age: number;
  favorite: 1 | '';
  profiles_count: 10 | 15 | 25;
};

const FavoriteOptions: ReactSelectOptions<FiltersFormTypes['favorite']> = [
  { value: '', label: 'All' },
  { value: 1, label: 'Favorite' },
];

const ProfilesCountOptions: ReactSelectOptions<
  FiltersFormTypes['profiles_count']
> = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 25, label: '25' },
];

const PositionOptions: ReactSelectOptions<
  FiltersFormTypes['position']['value']
> = [
  { value: '', label: 'All' },
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
  onFiltersChange: (value: FiltersFormTypes) => void;
}

const NetworkFilters = ({ onFiltersChange }: INetworkFiltersProps) => {
  const NetworkFiltersForm = withTypes<FiltersFormTypes>();

  return (
    <NetworkFiltersForm.Form onSubmit={() => {}}>
      {(props) => (
        <form
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            lineHeight: '1.2',
          }}
        >
          <Field name="school">
            {(fieldProps) => (
              <Filters.TextInput {...fieldProps} placeholder="School" />
            )}
          </Field>
          <Field name="team">
            {(fieldProps) => (
              <Filters.TextInput {...fieldProps} placeholder="Team" />
            )}
          </Field>
          <Field
            name="position"
            format={(value) => (!value?.value ? { label: 'Position' } : value)}
          >
            {(fieldProps) => (
              <Filters.SelectInput
                {...fieldProps}
                placeholder="Position"
                options={PositionOptions}
                initialValue={PositionOptions[0]}
              />
            )}
          </Field>
          <Field name="age" parse={(value) => (+value > 0 ? +value : null)}>
            {(fieldProps) => (
              <Filters.TextInput {...fieldProps} placeholder="Age" />
            )}
          </Field>
          <Field name="favorite" initialValue={FavoriteOptions[0]}>
            {(fieldProps) => (
              <Filters.SelectInput
                {...fieldProps}
                placeholder="Favorite"
                options={FavoriteOptions}
              />
            )}
          </Field>
          <Field
            name="profiles_count"
            initialValue={ProfilesCountOptions[0]}
            format={(value) => ({ label: `Show: ${value.value}` })}
          >
            {(fieldProps) => (
              <Filters.SelectInput
                {...fieldProps}
                placeholder="Show"
                options={ProfilesCountOptions}
              />
            )}
          </Field>
          <NetworkFiltersForm.FormSpy
            subscription={{ values: true, modifiedSinceLastSubmit: true }}
            onChange={(formState) => {
              if (timeout) return;
              timeout = window.setTimeout(async () => {
                timeout = null;
                onFiltersChange(formState.values);
              }, 0);
            }}
          />
        </form>
      )}
    </NetworkFiltersForm.Form>
  );
};

export default NetworkFilters;
