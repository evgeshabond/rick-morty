import React, { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import Character from '../../components/character/Character';
import { getAll } from '../../service/user';
import client from '../../apollo-client';
import styles from './Page.module.css';
import Layout from '../../components/layout/Layout';
import Pagination from '../../components/pagination/Pagination';

const CharacterOverview = ({ data, page, error }) => {
  const user = 'evgen';
  const { results, info } = data?.characters;
  const [favoritesList, setFavotiresList] = useState([]);

  useEffect(() => {
    console.log('useEffect run');
    getAll(user)
      .then(responseData => {
        setFavotiresList(responseData);
        console.log('useEffect -> getAll: ', responseData);
      })
      .catch(e => console.log(e));
  }, []);

  if (error) return <p>This page does not exist</p>;

  return (
    <Layout>
      <ul className={styles.charactersList}>
        {results.map(x => (
          <li key={x.id} className={styles.charactersList__item}>
            <Character
              name={x.name}
              id={x.id}
              image={x.image}
              isLiked={favoritesList.includes(x.id)}
              setFavotiresList={payload => {
                console.log('payload is: ', payload);
                setFavotiresList(payload);
              }}
            />
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
    return { props: { error: 'could not find' } };
  }
}

export default CharacterOverview;
