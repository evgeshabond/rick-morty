import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Layout from '../../components/layout/Layout';
// import Pagination from '../../components/pagination/Pagination';
import CharactersList from '../../components/characters-list/CharactersList';
import EpisodesList from '../../components/episodes-list/EpisodesList';

const Character = ({ data, error }) => {
  const { character } = data;
  const [session, loading] = useSession();

  useEffect(() => {
    console.log('useeffect');
  });

  if (error)
    return (
      <Layout>
        <h1>Error 404. This page does not exist</h1>
      </Layout>
    );

  return (
    <Layout>
      <CharactersList characters={[character]} />
      <EpisodesList episodes={character.episode} />
    </Layout>
  );
};

export async function getServerSideProps({ res, params }) {
  // console.log(process.env._TEST_VARIABLE);
  const { page } = params;
  try {
    const response = await client.query({
      query: gql`
        query {
          character(id: ${page}) {
            id
            name
            image
            gender
            species
            episode {
              id
              name
              episode
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
          characters: {
            results: [],
          },
        },
        error: 'could not find',
      },
    };
  }
}

export default Character;
