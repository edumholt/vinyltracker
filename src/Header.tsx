import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { client } from './App';
import { UserProfileResponse } from './discojs/models';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfileResponse>();

  const fetchProfile = async () => {
    const profile: UserProfileResponse = await client.getProfile();
    setProfileData(profile);
  };

  const login = async () => {
    fetchProfile();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="navbar-nav">
          <div className={styles.navigation}>
            <NavLink to="/" className="nav-item">
              Home
            </NavLink>
            <NavLink to="/collection" className="nav-item">
              Collection
            </NavLink>
          </div>
          <div className={styles.navbarSpacer} />
          {!profileData && (
            <button type="button" className="btn btn-primary" onClick={login}>
              Login
            </button>
          )}
        </div>
      </nav>
      <div className={styles.header}>
        <h1>VinylTracker</h1>
        {profileData && (
          <>
            <h4>Welcome to Discogs {profileData?.username}!</h4>
          </>
        )}
      </div>
    </>
  );
};
