import { Link } from '@reach/router';
import React from 'react';

import { StyledNav, Title } from './styles';

export const Nav = () => (
  <StyledNav>
    <Title>L-STATS</Title>
    <Link to="/">Graph</Link>
    <Link to="/stats">Stats</Link>
    {/* <Link to="/league">League</Link> */}
    {/* <Link to="/season">Season</Link> */}
  </StyledNav>
);
