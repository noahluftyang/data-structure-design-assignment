import './index.css';

import cytoscape from 'cytoscape';
import React, { Component, createRef } from 'react';

import { Nav } from './Nav';
import { getJson } from './utils';

export class App extends Component {
  state = {
    year: 2018,
    data: []
  };

  async componentDidMount() {
    try {
      const { data } = await getJson({
        url: `/matches/${this.state.year}`
      });

      this.setState(state => ({
        ...state,
        data
      }));
    } catch (err) {
      console.error(err);
    }

    this.renderGraph();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data !== prevState.data) {
      this.renderGraph();
    }
  }

  graph = null;
  graphRef = createRef();

  renderGraph = () => {
    this.graph = cytoscape({
      container: this.graphRef.current,
      elements: this.state.data,
      style: [
        // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            width: 3,
            label: 'data(value)',
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 1
      }
    });
  };

  render() {
    return (
      <>
        <Nav />
        <div ref={this.graphRef} style={{ height: '90vh' }} />
      </>
    );
  }
}
