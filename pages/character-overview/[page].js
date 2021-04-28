import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import styles from './Page.module.css';
import Layout from '../../components/layout/Layout';
import Pagination from '../../components/pagination/Pagination';

const CharacterOverview = ({ data, page, error }) => {
  if (error) return <p>This page does not exist</p>;
  const { results, info } = data.characters;
  // console.log(results, info);
  // console.log('got results: ', characters);
  return (
    <Layout>
      <ul className={styles.charactersList}>
        {results.map(x => (
          <li key={x.id} className={styles.charactersList__item}>
            <h2>{x.name}</h2>
            <img
              src={x.image}
              alt={x.name}
              className={styles.charactersList__image}
            />
            <Link href={`/character/${x.id}`}>
              <a>Learn more</a>
            </Link>
          </li>
        ))}
      </ul>
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
  let response;
  try {
    response = await client.query({
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
    return { props: { error: 'could not find' } };
  }
}

export default CharacterOverview;
