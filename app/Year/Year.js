import React, { PureComponent } from 'react';
import Slider from 'react-slick';

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

export default class Year extends PureComponent {
  render() {
    const { children, year, handleYear } = this.props;

    return (
      <>
        <div>
          <Dropdown
            name="year"
            options={yearOption}
            title="YEAR"
            value={year}
            onChange={handleYear}
          />
        </div>
        <Slider dots>{children}</Slider>
      </>
    );
  }
}
