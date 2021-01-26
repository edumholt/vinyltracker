import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import { Collection } from './Collection';
import { UserProfileResponse } from './models';
import { Discojs } from './discojs';

const dicsoOptions = {
  userAgent: '',
  userToken: process.env.REACT_APP_USER_TOKEN
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
      <div className="App container">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="navbar-nav">
              <Link to="/" className="nav-item">
                Home
              </Link>
              <Link to="/collection" className="nav-item">
                Collection
              </Link>
            </div>
          </nav>
          <h1>VinylTracker</h1>
          {!profileData && <button onClick={login}>Login</button>}
          {profileData && (
            <>
              <h4>Welcome to Discogs {profileData?.username}!</h4>
            </>
          )}
        </header>
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
