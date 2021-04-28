import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Navigation.module.css';

const Navigation = () => {
  const router = useRouter();
  const path = router.asPath.split('/')[1];
  return (
    <nav className={styles.navigation}>
      <Link href="/">
        <a
          className={clsx(
            { [styles.navigation__item]: true },
            {
              [styles.navigation__item__active]: path === '',
            }
          )}
        >
          Home
        </a>
      </Link>
      <Link href="/character-overview/1">
        <a
          className={clsx(
            { [styles.navigation__item]: true },
            {
              [styles.navigation__item__active]: path === 'character-overview',
            }
          )}
        >
          Character overview
        </a>
      </Link>
      <Link href="/episode-overview/1">
        <a
          className={clsx(
            { [styles.navigation__item]: true },
            {
              [styles.navigation__item__active]: path === 'episode-overview',
            }
          )}
        >
          Episodes overview
        </a>
      </Link>
    </nav>
  );
};

export default Navigation;
