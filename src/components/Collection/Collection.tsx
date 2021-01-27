import React, { useEffect, useState } from 'react';

import { Release } from '../Release/Release';
import { client } from '../../App';
import { FolderReleasesResponse } from '../../discojs/models';

import styles from './Collection.module.css';
import { UserSortEnum } from '../../discojs/constants';
import { SortOrdersEnum } from '../../discojs/utils';

export type FolderReleases = FolderReleasesResponse['releases'];

export const Collection: React.FC = () => {
  const [folderReleases, setFolderReleases] = useState<FolderReleases>();

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const releases = await client.listItemsInFolder(2632800, {
          by: UserSortEnum.ARTIST,
          order: SortOrdersEnum.ASC
        });
        console.log(releases.releases[0]);
        setFolderReleases(releases.releases);
      } catch (err) {
        console.error('*** ERROR ***', err.code);
      }
    };

    fetchReleases();
  }, []);

  return (
    <>
      <h1>Collection</h1>

      {!folderReleases && <div>Loading...</div>}
      {folderReleases && (
        <div className={styles.collection}>
          {folderReleases.map((release, i) => (
            <Release release={release} key={i} />
          ))}
        </div>
      )}
    </>
  );
};
