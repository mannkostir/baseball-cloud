import React from 'react';
import { Form, Field } from 'react-final-form';

const SignUpForm = () => {
  return (
    <Form onSubmit={() => {}}>
      <Field name="email" />
    </Form>
  );
};

export default SignUpForm;
