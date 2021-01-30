import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import { UserProfileResponse } from './discojs/models';
import { Discojs, DiscojsOptions } from './discojs/discojs';
import Layout from './Layout';
import Routes from './Routes';
import './App.css';
import { Header } from './Header';

const dicsoOptions: DiscojsOptions = {
  userAgent: '',
  userToken: process.env.REACT_APP_USER_TOKEN
  // oAuthToken: '',
  // oAuthTokenSecret: '',
};

export const client = new Discojs(dicsoOptions);

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
