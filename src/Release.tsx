import React from 'react';

import styles from './Release.module.css';

export type FolderRelease = {
  id: number;
  instance_id: number;
  // folder_id: number;
  date_added: string;
  // notes: {
  //   field_id: number;
  //   value: string;
  // }[];
  rating: number;
  basic_information: {
    artists: {
      anv: string;
      id: number;
      join: string;
      name: string;
      resource_url: string;
      role: string;
      tracks: string;
    }[];
    cover_image: string;
    formats: {
      // description: string[];
      name: string;
      qty: string;
      // text: string;
    }[];
    genres: string[];
    id: number;
    labels: {
      catno: string;
      entity_type: string;
      entity_type_name: string;
      id: number;
      name: string;
      resource_url: string;
    }[];
    master_id: number;
    master_url: string;
    resource_url: string;
    styles: string[];
    thumb: string;
    title: string;
    year: number;
  };
};

export interface ReleaseProps {
  release: FolderRelease;
}

export const Release: React.FC<ReleaseProps> = props => {
  const { release } = props;
  return (
    <div className={styles.release}>
      <img className={styles.releaseImg} src={release.basic_information.thumb} alt={release.basic_information.title} />
      <h5>{release.basic_information.title}</h5>

      <p>{release.basic_information.artists[0].name}</p>
      <p>{release.basic_information.year}</p>
    </div>
  );
};
