from flask import Blueprint
from flask_restful import Api

from .controllers import YearResource, LeagueResource, SeasonResource

matches_blueprint = Blueprint('matches', __name__)
matches_api = Api(matches_blueprint)
matches_api.add_resource(YearResource, '/matches/<int:year>')
matches_api.add_resource(LeagueResource, '/matches/<int:year>/<str:league>')
matches_api.add_resource(
    SeasonResource, '/matches/<int:year>/<str:league>/<str:season>')
