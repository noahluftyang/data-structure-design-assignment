import React, { PureComponent } from 'react';
import Select from 'react-select';

export class Dropdown extends PureComponent {
  // handler
  handleChange = e => {
    const { name, onChange } = this.props;
    onChange && onChange(e, name);
  };

  getValue = () => {
    const { options, value } = this.props;

    return options.filter(option => option.value === value);
  };

  // render
  render() {
    const { name, options, title } = this.props;

    return (
      <div>
        <label>{title}</label>
        <Select
          name={name}
          options={options}
          value={this.getValue()}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
