import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Auth from '../auth/Auth';

import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();
  const path = router.asPath.split('/')[1];
  return (
    <div className={styles.header}>
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
                [styles.navigation__item__active]:
                  path === 'character-overview',
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
      <Auth />
    </div>
  );
};

export default Header;
