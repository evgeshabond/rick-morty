import React from 'react';
import Link from 'next/link';
import styles from './LearnMoreButton.module.css';

const LearnMoreButton = ({ url }) => {
  return (
    <Link href={url}>
      <a className={styles.learnMoreButton}>Learn more</a>
    </Link>
  );
};

export default LearnMoreButton;
