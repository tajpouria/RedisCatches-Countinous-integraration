import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NewBlog from './components/blog/NewBlog';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/google" />
        <Route exact path="/" component={Home} />
        <Route exact path="/blogs" component={Dashboard} />
        <Route path="/blogs/new" component={NewBlog} />
      </Switch>
    </BrowserRouter>
  );
}
