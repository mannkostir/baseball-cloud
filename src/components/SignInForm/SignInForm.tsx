import React from 'react';
import { Form, Field } from 'react-final-form';
import Input from '../Input';
import SubmitButton from '../SubmitButton';
import * as Styled from './SignInForm.styles';

const SignInForm = () => {
  return (
    <Styled.Container>
      <Styled.FormHeader>
        <h2>Welcome to BaseballCloud!</h2>
        <span>Sign into your account here:</span>
      </Styled.FormHeader>
      <Form onSubmit={() => {}}>
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
