import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Collection } from './Collection';

import Home from './Home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/collection" component={Collection} />
      <Route path="/" exact component={Home} />

      <Route component={() => <h1>Not Found</h1>} />
    </Switch>
  );
};

export default Routes;
