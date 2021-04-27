// import React from 'react';
// import Link from 'next/link';
// import { gql } from '@apollo/client';
// import client from '../apollo-client';

// const CharacterOverview = ({ data }) => {
//   console.log('got props data: ', data.characters.info.pages);
//   return (
//     <Link href="/">
//       <a>Home</a>
//     </Link>
//   );
// };

// export async function getServerSideProps() {
//   // console.log('run ssr');
//   const { data } = await client.query({
//     query: gql`
//       query {
//         characters(page: 1) {
//           info {
//             count
//             pages
//           }
//         }
//       }
//     `,
//   });
//   console.log(data);
//   return { props: { data } };
// }

// export default CharacterOverview;

// // function Page({ data }) {
// //   // Render data...
// // }

// // // This gets called on every request
// // export async function getServerSideProps() {
// //   // Fetch data from external API
// //   const res = await fetch(`https://.../data`)
// //   const data = await res.json()

// //   // Pass data to the page via props
// //   return { props: { data } }
// // }

// // export default Page
