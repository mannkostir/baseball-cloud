import React from 'react';
import { Field, Form } from 'react-final-form';
import Input from '../Input';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './PersonalInfo.styles';

interface IPersonalInfoProps {
  isEditing?: boolean;
}

const PersonalInfo = ({ isEditing = true }: IPersonalInfoProps) => {
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
            <Field name="age">
              {(props) => <ProfileSidebar.TextInput placeholder="Age *" />}
            </Field>
            <Field name="feet">
              {(props) => <ProfileSidebar.TextInput placeholder="Feet *" />}
            </Field>
            <Field name="inches">
              {(props) => <ProfileSidebar.TextInput placeholder="Inches" />}
            </Field>
            <Field name="weight">
              {(props) => <ProfileSidebar.TextInput placeholder="Weight *" />}
            </Field>
            <Field name="throws">
              {(props) => <ProfileSidebar.TextInput />}
            </Field>
            <Field name="bats">{(props) => <ProfileSidebar.TextInput />}</Field>
          </form>
        )}
      </Form>
    </>
  );
};

export default PersonalInfo;
