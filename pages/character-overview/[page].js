import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

const CharacterOverview = ({ data, page, error }) => {
  if (error) return <p>This page does not exist</p>;
  const characters = data.characters.results;
  // console.log('got results: ', characters);
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <p>Page number is {page}</p>
      <div>
        <ul>
          {characters.map(x => (
            <li key={x.id}>
              <h2>Name: {x.name}</h2>
              <img src={x.image} alt={x.name} />
              <Link href={`/character/${x.id}`}>
                <a>Learn more</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
    console.log('good');
    return { props: { data: response.data, error: null, page } };
  } catch (e) {
    console.log('catched error');
    res.statusCode = 404;
    return { props: { error: 'could not find' } };
  }
}

export default CharacterOverview;

// function Page({ data }) {
//   // Render data...
// }

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

// export default Page
