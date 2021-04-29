import React from 'react';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Layout from '../../components/layout/Layout';
import Pagination from '../../components/pagination/Pagination';
import EpisodesList from '../../components/episodes-list/EpisodesList';

const EpisodeOverview = ({ data, page, error }) => {
  const { results, info } = data.episodes;

  if (error)
    return (
      <Layout>
        <h1>Error 404. This page does not exist</h1>
      </Layout>
    );

  return (
    <Layout>
      <EpisodesList episodes={results} />
      <Pagination
        prev={info.prev}
        next={info.next}
        page={page}
        baseUrl="/episode-overview/"
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
          episodes(page: ${page}) {
            info {
              count
              pages
              prev
              next
            }
            results {
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
          episodes: {
            info: [],
            results: [],
          },
        },
        error: 'could not find',
      },
    };
  }
}

export default EpisodeOverview;
