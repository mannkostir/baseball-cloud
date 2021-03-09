import React, { useState } from 'react';
import * as Styled from './SignUpForm.styles';
import { Form, Field } from 'react-final-form';
import { UserRole } from '@/types/commonTypes';
import { SignUpRequest } from '@/services/authService/authServiceTypes';
import { SubmitButton } from '@/components/Buttons';
import { Input } from '@/components/FinalFormAdapters';

const rolesDescription: Record<UserRole, { title: string; content: string }> = {
  player: {
    title: 'Players',
    content:
      'Players have their own profile within the system and plan on having data collected.',
  },
  scout: {
    title: 'Scouts',
    content:
      'Coaches and scouts can view players in the system but do not have their own profile.',
  },
};

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

interface ISignUpFormProps {
  signUp: (values: SignUpRequest) => void;
}

const SignUpForm = ({ signUp }: ISignUpFormProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('player');

  const onSubmit = (values: FormValues) => {
    console.log(values);
    signUp({
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
      role: selectedRole,
    });
  };
  return (
    <>
      <Styled.FormHeader>
        <Styled.RoleButtonsWrapper>
          <Styled.RoleButton
            isSelected={selectedRole === 'player'}
            onClick={() => setSelectedRole('player')}
          >
            Sign Up as Player
          </Styled.RoleButton>
          <Styled.RoleButton
            isSelected={selectedRole === 'scout'}
            onClick={() => setSelectedRole('scout')}
          >
            Sign Up as Scout
          </Styled.RoleButton>
        </Styled.RoleButtonsWrapper>
        <Styled.RoleDescription>
          <Styled.RoleTitle>
            {rolesDescription[selectedRole].title}
          </Styled.RoleTitle>
          <Styled.RoleText>
            {rolesDescription[selectedRole].content}
          </Styled.RoleText>
        </Styled.RoleDescription>
      </Styled.FormHeader>
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email">
              {(fieldProps) => (
                <Input {...fieldProps} placeholder="Email" required={true} />
              )}
            </Field>
            <Field name="password">
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  type="password"
                  placeholder="Password"
                  required={true}
                />
              )}
            </Field>
            <Field name="passwordConfirmation">
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  type="password"
                  placeholder="Confirm Password"
                  required={true}
                />
              )}
            </Field>
            <Styled.Legal>
              By clicking Sign Up, you agree to our <a>Terms of Service</a> and{' '}
              <a>Privacy Policy</a>.
            </Styled.Legal>
            <SubmitButton>Sign Up</SubmitButton>
          </form>
        )}
      </Form>
      <Styled.FormFooter>
        Already registered?{' '}
        <Styled.SignInLink to="/login">Sign In</Styled.SignInLink>
      </Styled.FormFooter>
    </>
  );
};

export default SignUpForm;
