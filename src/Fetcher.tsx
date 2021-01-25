import React, { useEffect, useState } from 'react';

import { FolderReleasesResponse, UserProfileResponse } from './models';
import { Discojs } from './discojs';

const dicsoOptions = {
  userAgent: '',
  userToken: process.env.REACT_APP_USER_TOKEN,
  // consumerKey: 'nUyuHThOuvnDpNAhKeDm',
  // consumerSecret: 'UZpnsEHQsEKyFmLdQOUlDxJBFixoZgTH',
  // oAuthToken: '',
  // oAuthTokenSecret: '',
};

const client = new Discojs(dicsoOptions);

export const Fetcher: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfileResponse>();
  const [folderReleases, setFolderReleases] = useState<FolderReleasesResponse['releases']>();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile: UserProfileResponse = await client.getProfile();
      setProfileData(profile);
    };

    fetchProfile();
  }, []);

  const loadCollection = async () => {
    console.log('* * * LOADING RELEASES * * *');
    const releases: FolderReleasesResponse = await client.listItemsInFolder(0);

    setFolderReleases(releases.releases);
  };

  return (
    <>
      <h1>VinylTracker</h1>
      {!profileData && <h4>Logging in...</h4>}
      {profileData && (
        <>
          <h4>Welcome to Discogs {profileData?.username}!</h4>
          <table>
            <thead>
              <tr>
                <th>Buyer Rating</th>
                <th>Location</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{profileData.buyer_rating}%</td>
                <td>{profileData.location}</td>
                <td>{profileData.name}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={loadCollection}>Load Collection</button>
          {folderReleases && (
            <>
              {folderReleases.map((release, i) => (
                <img src={release.basic_information.thumb} key={i} alt={release.basic_information.title} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};
