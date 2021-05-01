import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import { pathToTitle } from '../../utils/pathToTitle';

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
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
