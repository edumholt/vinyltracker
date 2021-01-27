import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import './App.css';
import { Collection } from './Collection';
import { UserProfileResponse } from './models';
import { Discojs, DiscojsOptions } from './discojs';

const dicsoOptions: DiscojsOptions = {
  userAgent: '',
  userToken: process.env.REACT_APP_USER_TOKEN
  // consumerKey: 'nUyuHThOuvnDpNAhKeDm',
  // consumerSecret: 'UZpnsEHQsEKyFmLdQOUlDxJBFixoZgTH',
  // oAuthToken: '',
  // oAuthTokenSecret: '',
};

export const client = new Discojs(dicsoOptions);

function App() {
  const [profileData, setProfileData] = useState<UserProfileResponse>();

  const fetchProfile = async () => {
    const profile: UserProfileResponse = await client.getProfile();
    setProfileData(profile);
  };

  const login = async () => {
    fetchProfile();
  };

  return (
    <Router>
      <div className="app container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item">
              Home
            </NavLink>
            <NavLink to="/collection" className="nav-item">
              Collection
            </NavLink>
          </div>
        </nav>
        <h1>VinylTracker</h1>
        {!profileData && <button onClick={login}>Login</button>}
        {profileData && (
          <>
            <h4>Welcome to Discogs {profileData?.username}!</h4>
          </>
        )}
        <Switch>
          <Route path="/collection">
            <Collection />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
