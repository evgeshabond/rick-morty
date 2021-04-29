import React, { useEffect, useState } from 'react';
import Character from '../character/Character';
import { getAll } from '../../service/user';
import styles from './CharactersList.module.css';

const CharactersList = ({ characters }) => {
  const user = 'evgen';

  const [favoritesList, setFavotiresList] = useState([]);

  useEffect(() => {
    getAll(user)
      .then(responseData => {
        setFavotiresList(responseData);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <ul className={styles.charactersList}>
      {characters.map(x => (
        <li key={x.id} className={styles.charactersList__item}>
          <Character
            {...x}
            isLiked={favoritesList.includes(x.id)}
            setFavotiresList={payload => {
              setFavotiresList(payload);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
