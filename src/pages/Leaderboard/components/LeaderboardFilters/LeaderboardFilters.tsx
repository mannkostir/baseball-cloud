import { PlayerPosition, ReactSelectOptions } from '@/types/commonTypes';
import React from 'react';
import { Field, withTypes } from 'react-final-form';
import Filters from '@/components/Filters';

type FilterFormTypes = {
  date: { label: string; value: '' | 'last_week' | 'last_month' };
  school: string;
  team: string;
  position: { label: string; value: PlayerPosition | '' };
  age: number;
  favorite: 1 | '';
};

const DateOptions: ReactSelectOptions<FilterFormTypes['date']['value']> = [
  { value: '', label: 'All' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
];

const FavoriteOptions: ReactSelectOptions<FilterFormTypes['favorite']> = [
  { value: '', label: 'All' },
  { value: 1, label: 'Favorite' },
];

const PositionOptions: ReactSelectOptions<
  FilterFormTypes['position']['value']
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

interface ILeaderboardFiltersProps {
  onFiltersChange: (value: FilterFormTypes) => void;
}

const LeaderboardFilters = ({ onFiltersChange }: ILeaderboardFiltersProps) => {
  const FilterForm = withTypes<FilterFormTypes>();
  return (
    <div style={{ paddingRight: '40px', lineHeight: '1.2' }}>
      <FilterForm.Form onSubmit={() => {}}>
        {(props) => (
          <form
            style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
          >
            <Field
              name="date"
              initialValue={DateOptions[0]}
              format={(value) =>
                !value.value
                  ? { label: 'Date' }
                  : { label: `Date(${value.label})` }
              }
            >
              {(fieldProps) => (
                <Filters.SelectInput
                  {...fieldProps}
                  placeholder="Date"
                  options={DateOptions}
                />
              )}
            </Field>
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
              format={(value) =>
                !value?.value ? { label: 'Position' } : value
              }
            >
              {(fieldProps) => (
                <Filters.SelectInput
                  {...fieldProps}
                  placeholder="Position"
                  options={PositionOptions}
                  defaultVa={PositionOptions[0]}
                />
              )}
            </Field>
            <Field
              name="age"
              parse={(value: any) => (+value >= 1 ? +value : '')}
            >
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
            <FilterForm.FormSpy
              subscription={{ values: true }}
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
      </FilterForm.Form>
    </div>
  );
};

export default LeaderboardFilters;
