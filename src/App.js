import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
// import Notfound from "./components/notfound";
// import PortectedRoute from './components/PortectedRoute';
import MovieList from './components/movieList/MovieList';
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MovieList} exact />
          {/* <PortectedRoute path="/" component={Home} exact={true} /> */}
          {/* <PortectedRoute path="/sample" component={MovieList} exact={true} /> */}
        </Switch>
      </BrowserRouter>);
  }
}

export default App;
