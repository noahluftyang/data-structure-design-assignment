def includes_edge(list, team1, team2):
    for index, dict in enumerate(list):
        check_source_target_match = dict['data']['source'] == team1 and dict['data']['target'] == team2

        if (check_source_target_match == True):
            return index

    return False


def includes_node(list, value):
    for index, dict in enumerate(list):
        if (dict['data']['id'] == value):
            return index

    return False
