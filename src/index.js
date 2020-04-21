import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import Nav from './components/Nav';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Nav />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
