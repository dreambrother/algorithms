import sys

__author__ = 'nik'


def compute_shortes_path(adj_list, from_node):
    x = set([from_node])
    a = {from_node: 0}
    while x != set(adj_list.keys()):
        min_edge = _find_min(x, adj_list, a)
        a[min_edge[0]] = min_edge[1]
        x.add(min_edge[0])
    return a


def _find_min(x, adj_list, a):
    min_edge = -1, sys.maxint
    for x_node in x:
        for edge in adj_list[x_node]:
            distance = edge[1] + a[x_node]
            if edge[0] not in x and distance < min_edge[1]:
                min_edge = edge[0], distance
    return min_edge


def load_graph(path):
    adj_list = {}
    with open(path) as f:
        for line in f.readlines():
            splitted_line = line.split()
            key = int(splitted_line[0])
            for edges in splitted_line[1:]:
                if key not in adj_list:
                    adj_list[key] = []
                adj_list[key].append((int(edges.split(',')[0]), int(edges.split(',')[1])))
    return adj_list