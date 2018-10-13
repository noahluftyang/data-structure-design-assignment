import cytoscape from 'cytoscape';
import React, { createRef, PureComponent } from 'react';

import { getJson } from './utils';

export class YearGraph extends PureComponent {
  state = {
    data: []
  };

  componentDidMount() {
    this.fetchYearGraphData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.year !== prevProps.year) {
      this.fetchYearGraphData();
    }

    if (this.state.data !== prevState.data) {
      this.renderGraph();
    }
  }

  componentWillUnmount() {
    this.graph.destroy();
  }

  graph = null;
  graphRef = createRef();

  fetchYearGraphData = async () => {
    try {
      const { data } = await getJson({
        url: `/matches/${this.props.year}`
      });

      this.setState(state => ({
        ...state,
        data
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // render
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
        name: 'cose'
      }
    });
  };

  render() {
    return <div ref={this.graphRef} style={{ height: '90vh' }} />;
  }
}
