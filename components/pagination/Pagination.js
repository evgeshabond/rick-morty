import React from 'react';
import Link from 'next/link';

import styles from './Pagination.module.css';

const Pagination = ({ prev, next, page, baseUrl, pageCount }) => {
  console.log(prev, next, page, baseUrl);
  return (
    <nav className={styles.pagination}>
      {prev && (
        <Link href={`${baseUrl}${prev}`}>
          <a className={styles.pagination__item}>Previous page</a>
        </Link>
      )}
      <p className={styles.pagination__currentPage}>
        page {page} of {pageCount}
      </p>
      {next && (
        <Link href={`${baseUrl}${next}`}>
          <a className={styles.pagination__item}>Next Page</a>
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
