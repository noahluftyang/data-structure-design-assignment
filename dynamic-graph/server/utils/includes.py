def includes_edge(list, value):
    return False


def includes_node(list, value):
    for dict in list:
        if (dict['id'] == value):
            return True

    return False
