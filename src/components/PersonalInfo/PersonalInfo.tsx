import React from 'react';
import { Field, Form } from 'react-final-form';
import Input from '../Input';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './PersonalInfo.styles';

interface IPersonalInfoProps {
  isEditing?: boolean;
}

type ThrowsOptionsType = { label: string; value: 'l' | 'r' }[];
type BatsOptionsType = ThrowsOptionsType;

const throwsOptions: ThrowsOptionsType = [
  { value: 'r', label: 'R' },
  { value: 'l', label: 'L' },
];

const batsOptions: BatsOptionsType = throwsOptions;

const PersonalInfo = ({ isEditing = false }: IPersonalInfoProps) => {
  return !isEditing ? (
    <Styled.Container>
      <Styled.TraitsList>
        <Styled.TraitsItem>
          <span>Age</span>
          <span>118</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Height</span>
          <span>4 ft 8 in</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Weight</span>
          <span>195 lbs</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Throws</span>
          <span>R</span>
        </Styled.TraitsItem>
        <Styled.TraitsItem>
          <span>Bats</span>
          <span>L</span>
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
              placeholder="Age *"
            />
            <ProfileSidebar.InlineInputsWrapper>
              <Field
                name="feet"
                component={ProfileSidebar.TextInput}
                placeholder="Feet *"
              />
              <Field
                name="inches"
                component={ProfileSidebar.TextInput}
                placeholder="Inches"
              />
            </ProfileSidebar.InlineInputsWrapper>
            <Field
              name="weight"
              component={ProfileSidebar.TextInput}
              placeholder="Weight *"
            />
            <ProfileSidebar.InlineInputsWrapper>
              <Field
                name="throws"
                component={ProfileSidebar.SelectInput}
                placeholder="Throws *"
                options={throwsOptions}
              />
              <Field
                name="bats"
                component={ProfileSidebar.SelectInput}
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
