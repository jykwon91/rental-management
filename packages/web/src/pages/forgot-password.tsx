import React from 'react';
import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useState } from 'react';
import { withApollo } from '../utils/withApollo';
import { Helmet } from 'react-helmet';

const TITLE = 'Forgot Password';

export const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you an email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />

              <Button
                my={4}
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
