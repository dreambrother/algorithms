__author__ = 'nik'


def execute(edges_list):
    finish_times, s = _dfs_loop(_reverse(edges_list))
    new_edges_list = _replace_nodes_by_finish_times(edges_list, finish_times)
    finish_times, result = _dfs_loop(new_edges_list)
    return result


def _reverse(edges_list):
    result = {}
    for k, v in edges_list.iteritems():
        for n in v:
            if n not in result:
                result[n] = []
            result[n].append(k)
    return result


def _replace_nodes_by_finish_times(edges_list, finish_times):
    result = {}
    for k, v in finish_times.iteritems():
        nodes = []
        result[v] = nodes
        if k in edges_list:
            for node in edges_list[k]:
                nodes.append(finish_times[node])
    return result


def _dfs_loop(edges_list):
    loop_state = LoopState()
    for n in reversed(edges_list.keys()):
        if n not in loop_state.explored:
            loop_state.current_leader = n
            loop_state.s[n] = 0
            _dfs(edges_list, n, loop_state)
    return loop_state.finish_times, loop_state.s


def _dfs(edges_list, node, loop_state):
    loop_state.explored.add(node)
    loop_state.s[loop_state.current_leader] += 1
    if node in edges_list:
        for n in edges_list[node]:
            if n not in loop_state.explored:
                _dfs(edges_list, n, loop_state)
    loop_state.time += 1
    loop_state.finish_times[node] = loop_state.time


class LoopState:
    def __init__(self):
        self.time = 0
        self.finish_times = {}
        self.explored = set()
        self.s = {}
        self.current_leader = None