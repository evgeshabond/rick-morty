import React from 'react';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Layout from '../../components/layout/Layout';
import Episode from '../../components/episode/Episode';
import CharactersList from '../../components/characters-list/CharactersList';

const EpisodeOverview = ({ data, error }) => {
  const { episode } = data;

  if (error)
    return (
      <Layout>
        <h1>Error 404. This page does not exist</h1>
      </Layout>
    );

  return (
    <Layout>
      <Episode {...episode} />
      <CharactersList characters={episode.characters} />
    </Layout>
  );
};

export async function getServerSideProps({ res, params }) {
  const { page } = params;
  try {
    const response = await client.query({
      query: gql`
        query {
          episode(id: ${page}) {
            id
            name
            air_date
            episode
            characters {
              id
              name
              image
            }
          }
        }
      `,
    });
    return { props: { data: response.data, error: null, page } };
  } catch (e) {
    res.statusCode = 404;
    return {
      props: {
        data: {
          episode: {},
        },
        error: 'could not find',
      },
    };
  }
}

export default EpisodeOverview;
