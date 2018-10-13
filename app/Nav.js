import { Link } from '@reach/router';
import React, { Component } from 'react';

export class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Year</Link>
        <Link to="/league">League</Link>
        <Link to="/season">Season</Link>
      </nav>
    );
  }
}
