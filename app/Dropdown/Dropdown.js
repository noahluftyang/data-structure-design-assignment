import React, { PureComponent } from 'react';
import Select from 'react-select';

import { DropdownWrapper } from './styles';

export class Dropdown extends PureComponent {
  // handler
  handleChange = e => {
    const { name, onChange } = this.props;
    const value = e ? e.value : null;
    onChange && onChange(value, name);
  };

  getValue = () => {
    const { options, value } = this.props;

    return options.find(option => option.value === value);
  };

  // render
  render() {
    const { clearable, name, options, title, width } = this.props;

    return (
      <DropdownWrapper width={width}>
        <label>{title}</label>
        <Select
          isClearable={clearable}
          name={name}
          options={options}
          placeholder="All"
          value={this.getValue()}
          onChange={this.handleChange}
        />
      </DropdownWrapper>
    );
  }
}
