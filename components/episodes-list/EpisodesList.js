import React from 'react';
import Episode from '../episode/Episode';
import styles from './EpisodesList.module.css';

const EpisodesList = ({ episodes }) => {
  return (
    <ul className={styles.episodesList}>
      {episodes.map(x => (
        <li key={x.id} className={styles.episodesList__item}>
          <Episode id={x.id} name={x.name} episode={x.episode} />
        </li>
      ))}
    </ul>
  );
};

export default EpisodesList;
