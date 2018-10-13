def includes_edge(list, team1, team2):
    for index, dict in enumerate(list):
        check_source_target_match = dict['data']['source'] == team1 and dict['data']['target'] == team2
        check_target_source_match = dict['data']['source'] == team2 and dict['data']['target'] == team1

        if (check_source_target_match == True):
            return {
                'index': index,
                'reverse': False
            }

        if (check_target_source_match == True):
            return {
                'index': index,
                'reverse': True
            }

    return False


def includes_node(list, value):
    for dict in list:
        if (dict['data']['id'] == value):
            return True

    return False
