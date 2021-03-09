import { profilesAPI } from '@/api/profiles';
import { Unpromise } from '@/types/commonTypes';
import React from 'react';
import { Field } from 'react-final-form';
import Icons from '@/components/Icons';
import ProfileSidebar from '@/components/ProfileSidebar';
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
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
}

const PersonalInfoView = ({ profileData }: IPersonalInfoViewProps) => {
  return (
    <Styled.Container>
      <Styled.TraitsList>
        <Styled.TraitsItem>
          <Styled.TraitTitleWrapper>
            <Styled.TraitIcon>
              <Icons.ProfileAge />
            </Styled.TraitIcon>
            <Styled.TraitTitle>Age</Styled.TraitTitle>
          </Styled.TraitTitleWrapper>
          <span>{profileData.age}</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <Styled.TraitTitleWrapper>
            <Styled.TraitIcon>
              <Icons.ProfileHeight />
            </Styled.TraitIcon>
            <Styled.TraitTitle>Height</Styled.TraitTitle>
          </Styled.TraitTitleWrapper>
          <span>{`${profileData.feet} ft ${
            profileData.inches ? profileData.inches : 0
          } in`}</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <Styled.TraitTitleWrapper>
            <Styled.TraitIcon>
              <Icons.ProfileWeight />
            </Styled.TraitIcon>
            <Styled.TraitTitle>Weight</Styled.TraitTitle>
          </Styled.TraitTitleWrapper>
          <span>{profileData.weight} lbs</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <Styled.TraitTitleWrapper>
            <Styled.TraitIcon>
              <Icons.ProfileThrows />
            </Styled.TraitIcon>
            <Styled.TraitTitle>Throws</Styled.TraitTitle>
          </Styled.TraitTitleWrapper>
          <span>{profileData.throws_hand?.toUpperCase()}</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <Styled.TraitTitleWrapper>
            <Styled.TraitIcon>
              <Icons.ProfileBats />
            </Styled.TraitIcon>
            <Styled.TraitTitle>Bats</Styled.TraitTitle>
          </Styled.TraitTitleWrapper>
          <span>{profileData.bats_hand?.toUpperCase()}</span>
        </Styled.TraitsItem>
      </Styled.TraitsList>
    </Styled.Container>
  );
};

interface IPersonalInfoViewProps {
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
}

const PersonalInfoEdit = ({ profileData }: IPersonalInfoViewProps) => {
  return (
    <>
      <Field
        name="age"
        initialValue={profileData.age}
        parse={(value) => (+value > 0 ? +value : null)}
      >
        {(fieldProps) => (
          <ProfileSidebar.Input
            {...fieldProps}
            required
            placeholder="Age *"
            type="number"
          />
        )}
      </Field>
      <ProfileSidebar.InlineInputsWrapper>
        <Field
          name="feet"
          initialValue={profileData.feet}
          parse={(value) => (+value > 0 ? +value : null)}
        >
          {(fieldProps) => (
            <ProfileSidebar.Input
              {...fieldProps}
              required
              placeholder="Feet *"
            />
          )}
        </Field>
        <Field
          name="inches"
          initialValue={profileData.inches}
          parse={(value) => (+value > 0 ? +value : null)}
        >
          {(fieldProps) => (
            <ProfileSidebar.Input {...fieldProps} placeholder="Inches" />
          )}
        </Field>
      </ProfileSidebar.InlineInputsWrapper>
      <Field
        name="weight"
        initialValue={profileData.weight}
        parse={(value) => (+value > 0 ? +value : null)}
      >
        {(fieldProps) => (
          <ProfileSidebar.Input
            {...fieldProps}
            required
            placeholder="Weight *"
          />
        )}
      </Field>
      <ProfileSidebar.InlineInputsWrapper>
        <Field
          name="throws_hand"
          initialValue={throwsOptions.find(
            (option) => option.value === profileData.throws_hand
          )}
        >
          {(fieldProps) => (
            <ProfileSidebar.Select
              {...fieldProps}
              required
              placeholder="Throws *"
              options={throwsOptions}
            />
          )}
        </Field>
        <Field
          name="bats_hand"
          initialValue={throwsOptions.find(
            (option) => option.value === profileData.bats_hand
          )}
        >
          {(fieldProps) => (
            <ProfileSidebar.Select
              {...fieldProps}
              required
              placeholder="Bats *"
              options={batsOptions}
            />
          )}
        </Field>
      </ProfileSidebar.InlineInputsWrapper>
    </>
  );
};

PersonalInfo.View = PersonalInfoView;
PersonalInfo.EditForm = PersonalInfoEdit;

export default PersonalInfo;
