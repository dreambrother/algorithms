__author__ = 'nik'

from random import randint


def load_graph(path):
    adjacency_list = {}
    with open(path) as f:
        for line in f.readlines():
            adjacency_list[line.split()[0]] = line.split()[1:]
    return adjacency_list


def find_min_cut(adjacency_list):
    while len(adjacency_list) > 2:
        start_idx = randint(0, len(adjacency_list) - 1)
        start = adjacency_list.keys()[start_idx]
        cor_vertices = adjacency_list[start]
        end = cor_vertices[randint(0, len(adjacency_list[start]) - 1)] if len(cor_vertices) > 1 else cor_vertices[0]
        _merge_vertices(adjacency_list, end, start)


def _merge_vertices(adjacency_list, end, start):
    cor_vertices = adjacency_list[start]
    cor_vertices.extend(adjacency_list[end])
    adjacency_list[start] = _remove_self_loops(cor_vertices, end, start)
    for cor_vertex in adjacency_list[end]:
        adjacency_list[cor_vertex] = _replace(end, start, adjacency_list[cor_vertex])
    del adjacency_list[end]


def _remove_self_loops(cor_vertices, end, start):
    return filter(lambda x: x != start and x != end, cor_vertices)


def _replace(elem, by, list):
    return [x if x != elem else by for x in list]


#adjacency_list = {1: [2, 3, 4], 2: [1, 3, 5], 3: [1, 2, 4], 4: [1, 3], 5: [2]}

results = []
for i in range(10):
    adjacency_list = load_graph('/Users/nik/tmp/kargerMinCut.txt')
    find_min_cut(adjacency_list)
    first_edges_count, second_edges_count = \
        len(adjacency_list[adjacency_list.keys()[0]]), len(adjacency_list[adjacency_list.keys()[1]])
    assert first_edges_count == second_edges_count
    results.append(first_edges_count)
print min(results)