import { ExtendedProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './PersonalInfo.styles';

interface IPersonalInfoProps {
  isEditing?: boolean;
  profileData: ExtendedProfileRecord;
}

type ThrowsOptionsType = { label: string; value: 'l' | 'r' }[];
type BatsOptionsType = ThrowsOptionsType;

const throwsOptions: ThrowsOptionsType = [
  { value: 'r', label: 'R' },
  { value: 'l', label: 'L' },
];

const batsOptions: BatsOptionsType = throwsOptions;

const PersonalInfo = ({
  isEditing = false,
  profileData,
}: IPersonalInfoProps) => {
  return !isEditing ? (
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
  ) : (
    <>
      <ProfileSidebar.SectionTitle>Personal Info</ProfileSidebar.SectionTitle>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form>
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
                name="throws"
                component={ProfileSidebar.SelectInput}
                defaultValue={throwsOptions.find(
                  (option) => option.value === profileData.throws_hand
                )}
                placeholder="Throws *"
                options={throwsOptions}
              />
              <Field
                name="bats"
                component={ProfileSidebar.SelectInput}
                defaultValue={batsOptions.find(
                  (option) => option.value === profileData.bats_hand
                )}
                placeholder="Bats *"
                options={batsOptions}
              />
            </ProfileSidebar.InlineInputsWrapper>
          </form>
        )}
      </Form>
    </>
  );
};

export default PersonalInfo;
