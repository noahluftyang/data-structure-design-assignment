import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import React, { createRef, PureComponent } from 'react';

import { StyledGraph } from './styles';
import { getJson } from '../utils';

export default class Graph extends PureComponent {
  state = {
    data: []
  };

  componentDidMount() {
    cytoscape.use(coseBilkent);
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
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            content: 'data(id)'
          }
        },
        {
          selector: 'node[?warmonger]',
          style: {
            'background-color': '#b9121b',
            content: 'data(id)'
          }
        },
        {
          selector: 'node[?pacifist]',
          style: {
            'background-color': '#70b85d',
            content: 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            label: 'data(value)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            width: 1
          }
        }
      ],
      layout: {
        name: 'cose-bilkent',
        idealEdgeLength: 100,
        randomize: true
      }
    });
  };

  render() {
    return <StyledGraph innerRef={this.graphRef} />;
  }
}
