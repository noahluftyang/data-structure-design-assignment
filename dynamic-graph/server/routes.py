from server.controller.matches import *

routes = [
    [CtlYearMatches, '/matches/<int:year>'],
    [CtlLeagueMatches, '/matches/<int:year>/<str:league>'],
    [CtlSeasonMatches, '/matches/<int:year>/<str:league>/<str:season>'],
]
