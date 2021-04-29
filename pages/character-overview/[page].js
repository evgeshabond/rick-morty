import React from 'react';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Layout from '../../components/layout/Layout';
import Pagination from '../../components/pagination/Pagination';
import CharactersList from '../../components/characters-list/CharactersList';

const CharacterOverview = ({ data, page, error }) => {
  const { results, info } = data.characters;

  if (error)
    return (
      <Layout>
        <h1>Error 404. This page does not exist</h1>
      </Layout>
    );
  return (
    <Layout>
      <CharactersList characters={results} />
      <Pagination
        prev={info.prev}
        next={info.next}
        page={page}
        baseUrl="/character-overview/"
        pageCount={info.pages}
      />
    </Layout>
  );
};

export async function getServerSideProps({ res, params }) {
  const { page } = params;
  try {
    const response = await client.query({
      query: gql`
        query {
          characters(page: ${page}) {
            info {
              count
              pages
              next
              prev
            }
            results {
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
          characters: {
            info: [],
            results: [],
          },
        },
        error: 'could not find',
      },
    };
  }
}

export default CharacterOverview;
