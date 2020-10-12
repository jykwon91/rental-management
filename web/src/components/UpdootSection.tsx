import { ApolloCache, gql } from '@apollo/client';
import { Flex, Box, IconButton, usePopoverContext } from '@chakra-ui/core';
import React, { useState } from 'react';
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
  VoteMutation,
} from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment _ on Post {
          points
          voteStatus
        }
      `,
      data: { id: postId, points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');

  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <Box>
        <IconButton
          onClick={async () => {
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState('updoot-loading');
            await vote({
              variables: {
                postId: post.id,
                value: 1,
              },
              update: (cache) => updateAfterVote(1, post.id, cache),
            });
            setLoadingState('not-loading');
          }}
          variantColor={post.voteStatus === 1 ? 'green' : undefined}
          isLoading={loadingState === 'updoot-loading'}
          aria-label="updoot post"
          icon="chevron-up"
        />
      </Box>
      <Box>{post.points}</Box>
      <Box>
        <IconButton
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState('downdoot-loading');
            await vote({
              variables: {
                postId: post.id,
                value: -1,
              },
              update: (cache) => updateAfterVote(-1, post.id, cache),
            });
            setLoadingState('not-loading');
          }}
          variantColor={post.voteStatus === -1 ? 'red' : undefined}
          isLoading={loadingState === 'downdoot-loading'}
          aria-label="downvote post"
          icon="chevron-down"
        />
      </Box>
    </Flex>
  );
};
