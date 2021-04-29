import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  const handleLikeClick = async (itemId, user) => {
    try {
      const updates = await toggleItem(itemId, user);
      setFavotiresList(updates);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.character}>
      <h2>{name}</h2>
      <div className={styles.character__imageContainer}>
        <div
          className={styles.character__likeButton}
          onClick={() => handleLikeClick(id, 'evgen')}
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
      {!gender && (
        <Link href={`/character/${id}`}>
          <a>Learn more</a>
        </Link>
      )}
    </div>
  );
};

export default Character;
