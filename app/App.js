import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

import { Router } from '@reach/router';
import React, { Component } from 'react';

import { Nav } from './Nav';
import { AsyncYear } from './Year';
import { YearGraph } from './YearGraph';
import { YearStats } from './YearStats';

export class App extends Component {
  state = {
    year: 2018,
    league: 'NALCS',
    season: 'Spring'
  };

  // handler
  handleYear = (e, f, g) => {
    this.setState(state => ({
      ...state,
      year: e.value
    }));
  };

  // render
  render() {
    const { year, league, season } = this.state;

    return (
      <>
        <Nav />
        <Router>
          <AsyncYear path="/" year={year} handleYear={this.handleYear}>
            <YearGraph path="/" year={year} />
            <YearStats path="stats" year={year} />
          </AsyncYear>
          {/* <AsyncLeague path="league">
            <LeagueGraph path="/" />
            <LeagueStats path="stats" />
          </AsyncLeague>
          <AsyncSeason path="season">
            <SeasonGraph path="/" />
            <SeasonStats path="stats" />
          </AsyncSeason> */}
        </Router>
      </>
    );
  }
}
