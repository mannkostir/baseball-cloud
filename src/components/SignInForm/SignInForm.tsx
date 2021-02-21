import React from 'react';
import { Form, Field } from 'react-final-form';
import * as Styled from './SignInForm.styles';

const SignInForm = () => {
  return (
    <>
      <Styled.FormHeader>
        <h2>Welcome to BaseballCloud!</h2>
        <span>Sign into your account here</span>
      </Styled.FormHeader>
      <Form onSubmit={() => {}}>
        {(props) => (
          <Styled.Form onSubmit={props.handleSubmit}>
            <Field name="email" type="text">
              {(props) => <Styled.Input {...props.input} />}
            </Field>
            <Field name="password" type="password">
              {(props) => <Styled.Input {...props.input} />}
            </Field>
            <button type="submit">Submit</button>
          </Styled.Form>
        )}
      </Form>
    </>
  );
};

export default SignInForm;
