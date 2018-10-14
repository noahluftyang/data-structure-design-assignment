import React, { PureComponent } from 'react';

import { FilterWrapper } from './styles';
import { Dropdown } from '../Dropdown';

const yearOption = [
  { label: '2018', value: 2018 },
  { label: '2017', value: 2017 },
  { label: '2016', value: 2016 },
  { label: '2015', value: 2015 },
  { label: '2014', value: 2014 }
];

const leagueOption = [
  { label: 'CBLoL', value: 'CBLoL' },
  { label: 'CLS', value: 'CLS' },
  { label: 'EULCS', value: 'EULCS' },
  { label: 'IEM', value: 'IEM' },
  { label: 'LCK', value: 'LCK' },
  { label: 'LCL', value: 'LCL' },
  { label: 'LJL', value: 'LJL' },
  { label: 'LLN', value: 'LLN' },
  { label: 'LMS', value: 'LMS' },
  { label: 'MSI', value: 'MSI' },
  { label: 'NALCS', value: 'NALCS' },
  { label: 'OPL', value: 'OPL' },
  { label: 'RR', value: 'RR' },
  { label: 'TCL', value: 'TCL' },
  { label: 'WC', value: 'WC' }
];

const seasonOption = [{ label: 'Spring', value: 'Spring' }, { label: 'Summer', value: 'Summer' }];

export class Home extends PureComponent {
  render() {
    const { children, league, season, year, handleDropdown } = this.props;

    return (
      <>
        <FilterWrapper>
          <Dropdown
            name="year"
            options={yearOption}
            title="YEAR"
            value={year}
            onChange={handleDropdown}
            width="10rem"
          />
          <Dropdown
            clearable
            name="league"
            options={leagueOption}
            title="LEAGUE"
            value={league}
            onChange={handleDropdown}
            width="10rem"
          />
          <Dropdown
            clearable
            name="season"
            options={seasonOption}
            title="SEASON"
            value={season}
            onChange={handleDropdown}
            width="10rem"
          />
        </FilterWrapper>
        {children}
      </>
    );
  }
}
