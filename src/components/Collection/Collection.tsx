import React, { useEffect, useState } from 'react';

import { FolderReleasesResponse } from '../../discojs/models';
import { FolderRelease } from '../Release/Release';
import { UserSortEnum } from '../../discojs/constants';
import { SortOrdersEnum } from '../../discojs/utils';
import { client } from '../../App';
import { useTable } from '../Table';

import styles from './Collection.module.css';

export type FolderReleases = FolderReleasesResponse['releases'];

type Folder = {
  id: number;
  name: string;
  count: number;
  resource_url: string;
};

export const Collection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [folderReleases, setFolderReleases] = useState<FolderReleases>();
  const [myFolders, setMyFolders] = useState<Folder[]>();

  useEffect(() => {
    const fetchFolders = async () => {
      const { folders } = await client.listFoldersForUser('edumholt');
      setMyFolders(folders);
      console.log('* * * My folders: * * *');
      console.log(folders);
    };
    fetchFolders();
  }, []);

  const fetchReleases = async (id: number) => {
    setIsLoading(true);
    try {
      const releases = await client.listItemsInFolder(id, {
        by: UserSortEnum.ARTIST,
        order: SortOrdersEnum.ASC
      });
      console.log(releases.releases[0]);
      setFolderReleases(releases.releases);
    } catch (err) {
      console.error('*** ERROR ***', err.code);
    }
    setIsLoading(false);
  };

  const formatName = (value: string) => {
    const end = value.indexOf('(') !== -1 ? value.indexOf('(') : 80;
    return value.substring(0, end);
  };

  const formatDate = (value: string) => {
    return value.slice(0, 10);
  };

  const renderThumbnail = (rel: FolderRelease) => {
    return <img className={styles.releaseImg} src={rel.basic_information.thumb} alt={rel.basic_information.title} />;
  };

  const { Table, Column, fields } = useTable<FolderRelease>(folderReleases);

  return (
    <div className="row">
      <h1 className="col col-sm-12">Collection</h1>
      <hr className="col col-sm-12" />
      <section className="col col-sm-1">
        <div className={styles.sidebar}>
          {myFolders?.map(f => {
            return (
              <button
                type="button"
                onClick={() => fetchReleases(f.id)}
                className="btn btn-primary btn-block"
                key={f.id}>
                {f.name}
              </button>
            );
          })}
        </div>
      </section>
      <main className="col col-sm-11">
        {isLoading && <div>Loading...</div>}
        {folderReleases && !isLoading && (
          <>
            {/* <div className={styles.collection}>
              {folderReleases.map((release, i) => (
                <Release release={release} key={i} />
              ))}
            </div> */}
            <Table onRowClick={rel => console.log({ rel })}>
              <Column field={fields.basic_information.thumb} cellRenderer={renderThumbnail} title="Album" />
              <Column field={fields.basic_information.title} title="Title" width="24rem" alignment="left" />
              <Column
                field={fields.basic_information.artists[0].name}
                title="Artist"
                width="12rem"
                alignment="left"
                valueFormatter={formatName}
              />
              <Column field={fields.basic_information.year} title="Year" width="8rem" alignment="left" />
              <Column field={fields.basic_information.labels[0].name} title="Label" width="12rem" alignment="left" />
              <Column
                field={fields.date_added}
                title="Added"
                valueFormatter={formatDate}
                width="8rem"
                alignment="left"
              />
              <Column field={fields.basic_information.id} title="id" alignment="left" />
            </Table>
          </>
        )}
      </main>
    </div>
  );
};
