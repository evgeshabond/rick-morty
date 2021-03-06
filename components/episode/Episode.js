import React from 'react';
import LearnMoreButton from '../learnMoreButton/LearnMoreButton';
import styles from './Episode.module.css';

const Episode = ({ id, name, episode, air_date }) => {
  return (
    <div className={styles.episode}>
      <h2>{name}</h2>
      <p>{episode}</p>
      {air_date && <p>{air_date}</p>}
      {/* if there is air_date means that we are in episode detailed page */}
      {!air_date && <LearnMoreButton url={`/episode/${id}`} />}
    </div>
  );
};

export default Episode;
