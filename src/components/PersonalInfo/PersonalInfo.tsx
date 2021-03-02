import { profilesService } from '@/services/profilesService';
import { Unpromise } from '@/types/commonTypes';
import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './PersonalInfo.styles';

type ThrowsOptionsType = { label: string; value: 'l' | 'r' }[];
type BatsOptionsType = ThrowsOptionsType;

const throwsOptions: ThrowsOptionsType = [
  { value: 'r', label: 'R' },
  { value: 'l', label: 'L' },
];

const batsOptions: BatsOptionsType = throwsOptions;

const PersonalInfo = () => {
  return <div></div>;
};

interface IPersonalInfoViewProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const PersonalInfoView = ({ profileData }: IPersonalInfoViewProps) => {
  return (
    <Styled.Container>
      <Styled.TraitsList>
        <Styled.TraitsItem>
          <span>Age</span>
          <span>{profileData.age}</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Height</span>
          <span>{`${profileData.feet} ft ${
            profileData.inches ? profileData.inches : 0
          } in`}</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Weight</span>
          <span>{profileData.weight} lbs</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Throws</span>
          <span>{profileData.throws_hand.toUpperCase()}</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Bats</span>
          <span>{profileData.bats_hand.toUpperCase()}</span>
        </Styled.TraitsItem>
      </Styled.TraitsList>
    </Styled.Container>
  );
};

interface IPersonalInfoViewProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const PersonalInfoEdit = ({ profileData }: IPersonalInfoViewProps) => {
  return (
    <>
      <Field
        name="age"
        component={ProfileSidebar.TextInput}
        defaultValue={profileData.age}
        placeholder="Age *"
      />
      <ProfileSidebar.InlineInputsWrapper>
        <Field
          name="feet"
          component={ProfileSidebar.TextInput}
          defaultValue={profileData.feet}
          placeholder="Feet *"
        />
        <Field
          name="inches"
          component={ProfileSidebar.TextInput}
          defaultValue={profileData.inches}
          placeholder="Inches"
        />
      </ProfileSidebar.InlineInputsWrapper>
      <Field
        name="weight"
        component={ProfileSidebar.TextInput}
        defaultValue={profileData.weight}
        placeholder="Weight *"
      />
      <ProfileSidebar.InlineInputsWrapper>
        <Field
          name="throws_hand"
          component={ProfileSidebar.SelectInput}
          defaultValue={throwsOptions.find(
            (option) => option.value === profileData.throws_hand
          )}
          placeholder="Throws *"
          options={throwsOptions}
        />
        <Field
          name="bats_hand"
          component={ProfileSidebar.SelectInput}
          defaultValue={batsOptions.find(
            (option) => option.value === profileData.bats_hand
          )}
          placeholder="Bats *"
          options={batsOptions}
        />
      </ProfileSidebar.InlineInputsWrapper>
    </>
  );
};

PersonalInfo.View = PersonalInfoView;
PersonalInfo.EditForm = PersonalInfoEdit;

export default PersonalInfo;
