import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

import { Router } from '@reach/router';
import React, { Component } from 'react';

import { Nav } from './Nav';
import { Home } from './Home';
import { AsyncGraph } from './Graph';
import { AsyncStats } from './Stats';

export class App extends Component {
  state = {
    year: 2018,
    league: null,
    season: null
  };

  // handler
  handleDropdown = (value, name) => {
    this.setState(state => ({
      ...state,
      [name]: value
    }));
  };

  // render
  render() {
    const { year, league, season } = this.state;

    return (
      <>
        <Nav />
        <Router>
          <Home
            path="/"
            league={league}
            season={season}
            year={year}
            handleDropdown={this.handleDropdown}>
            <AsyncGraph path="/" league={league} season={season} year={year} />
            <AsyncStats path="stats" year={year} />
          </Home>
        </Router>
      </>
    );
  }
}
