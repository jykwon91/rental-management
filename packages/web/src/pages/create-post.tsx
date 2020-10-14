import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';
import { Helmet } from 'react-helmet';

const TITLE = 'Create Post';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Formik
        initialValues={{
          title: '',
          text: '',
        }}
        onSubmit={async (values) => {
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' });
            },
          });
          if (!errors) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>

            <Button
              my={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
