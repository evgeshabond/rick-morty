import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import Character from '../character/Character';
import { getAll } from '../../service/user';
import styles from './CharactersList.module.css';

const CharactersList = ({ characters }) => {
  const [session] = useSession();
  const [userEmail, setUserEmail] = React.useState('localUser');

  const [favoritesList, setFavotiresList] = useState([]);

  useEffect(() => {
    if (session) {
      setUserEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    getAll(userEmail)
      .then(responseData => {
        setFavotiresList(responseData);
      })
      .catch(e => {
        console.log(e);
      });
  }, [userEmail]);

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
