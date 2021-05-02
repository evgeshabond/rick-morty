import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import LearnMoreButton from '../learnMoreButton/LearnMoreButton';
import { toggleItem } from '../../service/user';
import styles from './Character.module.css';

const Character = ({
  id,
  name,
  image,
  gender,
  species,
  isLiked,
  setFavotiresList,
}) => {
  const [session] = useSession();
  const [userEmail, setUserEmail] = React.useState('localUser');

  useEffect(() => {
    if (session) {
      setUserEmail(session.user.email);
    }
  }, [session]);

  const handleLikeClick = async (itemId, user) => {
    try {
      const updates = await toggleItem(itemId, user);
      setFavotiresList(updates);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div className={styles.character}>
      <h2>{name}</h2>
      <div className={styles.character__imageContainer}>
        <div
          className={styles.character__likeButton}
          onClick={() => handleLikeClick(id, userEmail)}
          aria-hidden="true"
        >
          {isLiked ? (
            <Image
              src="/images/heart-liked.svg"
              alt="heart image"
              layout="fill"
            />
          ) : (
            <Image src="/images/heart.svg" alt="heart image" layout="fill" />
          )}
        </div>
        <img src={image} alt={name} className={styles.character__image} />
      </div>
      {gender && <p>{gender}</p>}
      {species && <p>{species}</p>}
      {/* if there is gender means that we are in detailed page */}
      {!gender && <LearnMoreButton url={`/character/${id}`} />}
    </div>
  );
};

export default Character;
