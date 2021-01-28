import React, { useEffect, useState } from 'react';

import { FolderReleasesResponse } from '../../discojs/models';
import { FolderRelease } from '../Release/Release';
import { UserSortEnum } from '../../discojs/constants';
import { SortOrdersEnum } from '../../discojs/utils';
import { client } from '../../App';
import { Release } from '../Release/Release';
import { useTable } from '../Table';

import styles from './Collection.module.css';

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

  const formatName = (value: string) => {
    const end = value.indexOf('(') !== -1 ? value.indexOf('(') : 80;
    return value.substring(0, end);
  };

  const { Table, Column, fields } = useTable<FolderRelease>(folderReleases);

  return (
    <>
      <h1>Collection</h1>

      {!folderReleases && <div>Loading...</div>}
      {folderReleases && (
        <>
          <div className={styles.collection}>
            {folderReleases.map((release, i) => (
              <Release release={release} key={i} />
            ))}
          </div>
          <Table>
            <Column field={fields.basic_information.title} title="Album Title" width="16rem" alignment="left" />
            <Column
              field={fields.basic_information.artists[0].name}
              title="Artist"
              width="6rem"
              alignment="left"
              valueFormatter={formatName}
            />
            <Column field={fields.basic_information.year} title="Year" width="12rem" />
          </Table>
        </>
      )}
    </>
  );
};
