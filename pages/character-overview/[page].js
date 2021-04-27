import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

const CharacterOverview = ({ data, page }) => {
  const characters = data.characters.results;
  console.log('got results: ', characters);
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <p>Page number is {page}</p>
      <div>
        <ul>
          {characters.map(x => (
            <li key={x.id}>
              <h2>Name: {x.name}</h2>
              <img src={x.image} />
              <Link href={`/character/${x.id}`}>
                <a>Learn more</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export async function getServerSideProps(props) {
  const { page } = props.params;
  const { data } = await client.query({
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
  console.log(data);
  return { props: { data, page } };
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