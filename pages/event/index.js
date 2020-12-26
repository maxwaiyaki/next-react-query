import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchMusic } from '../../lib/api';
import styles from '../../styles/Event.module.css';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('allMusic', fetchMusic);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Events() {
  const { data } = useQuery('allMusic', fetchMusic);
  return (
    <div>
      <ol className={styles.container}>
        {data.map(item => (
          <li
            key={item.id}
            style={{ margin: '28px 0px' }}
            className={styles.card}
          >
            <ol style={{ listStyleType: 'none' }}>
              <li>
                {' '}
                <b>id: </b>
                {item.id}
              </li>
              <li>
                <b>Name: </b> {item.name}
              </li>
              <li>
                <b>Store Name: </b>
                {item.store_name}
              </li>
              <li>
                {item.thumbnail_frontend || item.thumbnail ? (
                  <div className={styles.aspectRatio}>
                    <img
                      className={styles.img}
                      src={item.thumbnail_frontend || item.thumbnail}
                      alt={item.name}
                    />
                  </div>
                ) : null}
              </li>
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
