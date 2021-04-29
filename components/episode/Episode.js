import React from 'react';
import Link from 'next/link';
import CharactersList from '../characters-list/CharactersList';
import styles from './Episode.module.css';

const Episode = ({ id, name, episode, air_date, characters }) => {
  return (
    <div className={styles.episode}>
      <h2>{name}</h2>
      <p>{episode}</p>
      {air_date && <p>{air_date}</p>}
      {characters && <CharactersList characters={characters} />}
      {!characters && (
        <Link href={`/episode/${id}`}>
          <a>Learn more</a>
        </Link>
      )}
    </div>
  );
};

export default Episode;
