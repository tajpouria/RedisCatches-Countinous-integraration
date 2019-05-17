import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Blogs from './components/Blogs';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/google"/>
        <Route exact path="/" component={Home} />
        <Route path="/api/blogs" component={Blogs} />
      </Switch>
    </BrowserRouter>
  );
}
