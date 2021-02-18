import React from 'react';
import { Form, Field } from 'react-final-form';
import { StyledForm, StyledInput } from './SignInForm.styles';

const SignInForm = () => {
  return (
    <Form onSubmit={() => {}}>
      {(props) => (
        <StyledForm onSubmit={props.handleSubmit}>
          <Field name="email" type="text">
            {(props) => <StyledInput {...props.input} />}
          </Field>
          <Field name="password" type="password">
            {(props) => <StyledInput {...props.input} />}
          </Field>
          <button type="submit">Submit</button>
        </StyledForm>
      )}
    </Form>
  );
};

export default SignInForm;
