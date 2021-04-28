import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { pathToTitle } from '../utils/pathToTitle';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const router = useRouter();
  const path = router.asPath.split('/')[1];
  const title = pathToTitle(path);
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
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
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
