import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

const mountNode = document.getElementById('App');

const init = RootComponent => {
  render(<RootComponent />, mountNode);
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const { App } = require('./App');

    unmountComponentAtNode(mountNode);
    requestAnimationFrame(() => init(App));
  });
}

init(App);
