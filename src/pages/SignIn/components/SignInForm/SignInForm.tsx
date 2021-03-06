import { SignInRequest } from '@/services/authService/authServiceTypes';
import React from 'react';
import { Form, Field } from 'react-final-form';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import * as Styled from './SignInForm.styles';

type FormValues = {
  email: string;
  password: string;
};
interface ISignInFormProps {
  signIn: (values: SignInRequest) => void;
}

const SignInForm = ({ signIn }: ISignInFormProps) => {
  const onSubmit = (values: FormValues) => {
    signIn({ email: values.email, password: values.password });
  };
  return (
    <Styled.Container>
      <Styled.FormHeader>
        <h2>Welcome to BaseballCloud!</h2>
        <span>Sign into your account here:</span>
      </Styled.FormHeader>
      <Form onSubmit={onSubmit}>
        {(props) => (
          <Styled.Form onSubmit={props.handleSubmit}>
            <Field name="email" type="text">
              {(props) => <Input placeholder="Email" {...props.input} />}
            </Field>
            <Field name="password" type="password">
              {(props) => <Input placeholder="Password" {...props.input} />}
            </Field>
            <SubmitButton type="submit">Sign In</SubmitButton>
          </Styled.Form>
        )}
      </Form>
      <Styled.ForgottenPassword>
        <a>Forgotten password?</a>
      </Styled.ForgottenPassword>
      <Styled.FormFooter>
        Don't have an account?{' '}
        <Styled.SigUpLink to="/registration">Sign Up</Styled.SigUpLink>
      </Styled.FormFooter>
    </Styled.Container>
  );
};

export default SignInForm;
