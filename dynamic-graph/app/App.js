import './index.css';

import cytoscape from 'cytoscape';
import React, { Component, createRef } from 'react';

import { Nav } from './Nav';

export class App extends Component {
  componentDidMount() {
    this.graph = cytoscape({
      container: this.graphRef.current,
      elements: [
        {
          data: { id: 'team1' }
        },
        {
          data: { id: 'team2' }
        },
        {
          data: { id: 'ab', value: [3, 2], source: 'team1', target: 'team2' }
        }
      ],
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
  }

  graph = null;
  graphRef = createRef();

  render() {
    return (
      <>
        <Nav />
        <div ref={this.graphRef} style={{ height: '90vh' }} />
      </>
    );
  }
}
