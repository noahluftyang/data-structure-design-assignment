import os
import pandas as pd
from flask import Flask, jsonify

from server.utils import includes_edge, includes_node


def create_app():
    app = Flask(__name__)

    @app.route('/')
    def hello_app():
        return 'Hello Dynamic Graph API'

    @app.route('/matches/<int:year>', methods=['GET'])
    def show_year_matches(year):
        #
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
            check_blue_node = includes_node(nodes, data[1])
            check_red_node = includes_node(nodes, data[4])

            if (check_year):
                if (check_blue_node == False):
                    node = {
                        'id': data[1]
                    }
                    nodes.append(node)

                if (check_red_node == False):
                    node = {
                        'id': data[4]
                    }
                    nodes.append(node)

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
