import './index.css';

import cytoscape from 'cytoscape';
import React, { Component, createRef } from 'react';

export class App extends Component {
  componentDidMount() {
    this.graph = cytoscape({
      container: this.graphRef.current,
      elements: [
        {
          data: { id: 'a' }
        },
        {
          data: { id: 'b' }
        },
        {
          data: { id: 'ab', source: 'a', target: 'b' }
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
    return <div ref={this.graphRef} />;
  }
}
