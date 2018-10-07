import os
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

from server.utils import includes_edge, includes_node


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def hello_app():
        return 'Hello Dynamic Graph API'

    @app.route('/matches/<int:year>', methods=['GET'])
    def show_year_matches(year):
        nodes = []
        edges = []
        result = []

        df = pd.read_csv(os.path.abspath(
            'dataset/LeagueofLegends.csv'), sep=',')
        select_df = df[['Year', 'blueTeamTag',
                        'bResult', 'rResult', 'redTeamTag']]

        for [index, data] in select_df.iterrows():
            # select row that matches target year
            check_year = data[0] == year
            check_blue_node_exist = includes_node(nodes, data[1])
            check_red_node_exist = includes_node(nodes, data[4])
            check_edge_exist = includes_edge(edges, data[1], data[4])

            if (check_year):
                if (check_blue_node_exist == False):
                    node = {
                        'data': {
                            'id': data[1]
                        }
                    }
                    nodes.append(node)

                if (check_red_node_exist == False):
                    node = {
                        'data': {
                            'id': data[4]
                        }
                    }
                    nodes.append(node)

                # edge does not exist
                if (check_edge_exist == False):
                    edge = {
                        'data': {
                            'id': data[1] + ' vs ' + data[4],
                            'value': [data[2], data[3]],
                            'source': data[1],
                            'target': data[4]
                        }
                    }
                    edges.append(edge)
                # edge already exist
                else:
                    target_edge = edges[check_edge_exist['index']]['data']

                    if (check_edge_exist['reverse'] == True):
                        target_edge.update(
                            value=[target_edge['value'][0] + data[3], target_edge['value'][1] + data[2]])
                    else:
                        target_edge.update(
                            value=[target_edge['value'][0] + data[2], target_edge['value'][1] + data[3]])

        # concat nodes and edges
        result.extend(nodes)
        result.extend(edges)

        # return graph data
        return jsonify({
            'status': 'success',
            'message': 'Successfully respond.',
            'data': result
        }), 200

    # @app.route('/matches/<int:year>/<str:league>')
    # def hello_league():
    #     return 'Hello Dynamic Graph API'

    # @app.route('/matches/<int:year>/<str:league>/<str:season>')
    # def hello_season():
    #     return 'Hello Dynamic Graph API'

    return app
