import React, { useEffect, useState } from 'react';

import { UserProfileResponse } from './models';
import { Discojs } from './discojs';

const dicsoOptions = {
  userAgent: '',
  userToken: process.env.REACT_APP_USER_TOKEN,
};

export const Fetcher: React.FC = () => {
  const client = new Discojs(dicsoOptions);
  const [profileData, setProfileData] = useState<UserProfileResponse>();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile: UserProfileResponse = await client.getProfile();
      setProfileData(profile);
    };

    fetchProfile();
  });

  return (
    <>
      <h1>VinylTracker</h1>
      {profileData ? <h4>Welcome to Discogs {profileData?.username}!</h4> : <h4>Logging in...</h4>}
    </>
  );
};
