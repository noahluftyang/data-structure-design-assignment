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

        # parse data into graph
        for [index, data] in select_df.iterrows():
            # select row that matches target year
            check_year = data[0] == year
            check_blue_node_exist = includes_node(nodes, data[1])
            check_red_node_exist = includes_node(nodes, data[4])
            check_edge_exist = includes_edge(edges, data[1], data[4])

            if (check_year and type(data[1]) is str and type(data[4]) is str):
                if (check_blue_node_exist == False):
                    node = {
                        'data': {
                            'id': data[1],
                            'win': data[2]
                        }
                    }
                    nodes.append(node)
                else:
                    target_node = nodes[check_blue_node_exist]['data']
                    target_node.update(win=target_node['win'] + data[2])

                if (check_red_node_exist == False):
                    node = {
                        'data': {
                            'id': data[4],
                            'win': data[3]
                        }
                    }
                    nodes.append(node)
                else:
                    target_node = nodes[check_red_node_exist]['data']
                    target_node.update(win=target_node['win'] + data[3])

                # edge does not exist
                if (check_edge_exist == False):
                    first_edge = {
                        'data': {
                            'id': data[1] + ' vs ' + data[4],
                            'value': data[2],
                            'source': data[1],
                            'target': data[4]
                        }
                    }
                    second_edge = {
                        'data': {
                            'id': data[4] + ' vs ' + data[1],
                            'value': data[3],
                            'source': data[4],
                            'target': data[1]
                        }
                    }
                    edges.append(first_edge)
                    edges.append(second_edge)
                # edge already exist
                else:
                    first_edge = edges[check_edge_exist]['data']
                    first_edge.update(value=first_edge['value'] + data[2])

                    if (len(edges) != check_edge_exist + 1):
                        if (edges[check_edge_exist + 1]['data']['id'] == data[4] + ' vs ' + data[1]):
                            second_edge = edges[check_edge_exist + 1]['data']
                            second_edge.update(
                                value=second_edge['value'] + data[3])
                        else:
                            second_edge = edges[check_edge_exist - 1]['data']
                            second_edge.update(
                                value=second_edge['value'] + data[3])
                    else:
                        second_edge = edges[check_edge_exist - 1]['data']
                        second_edge.update(
                            value=second_edge['value'] + data[3])

        # check warmonger
        warmonger = nodes[0]['data']['id']
        winning_count = nodes[0]['data']['win']

        for data in nodes:
            if (data['data']['win'] == 0):
                data['data'].update(pacifist=True)

            if (data['data']['win'] > winning_count):
                warmonger = data['data']['id']
                winning_count = data['data']['win']

        warmonger_node_index = includes_node(nodes, warmonger)
        nodes[warmonger_node_index]['data'].update(warmonger=True)

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
