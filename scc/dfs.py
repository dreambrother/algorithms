__author__ = 'nik'


def dfs_loop(edges_list):
    loop_state = LoopState(0, {}, set())
    for n in reversed(edges_list.keys()):
        if n not in loop_state.explored:
            _dfs(edges_list, n, loop_state)
    return loop_state.finish_times


def _dfs(edges_list, node, loop_state):
    loop_state.explored.add(node)
    for n in edges_list[node]:
        if n not in loop_state.explored:
            _dfs(edges_list, n, loop_state)
    loop_state.time += 1
    loop_state.finish_times[node] = loop_state.time


class LoopState:
    def __init__(self, time, finish_times, explored):
        self.time = time
        self.finish_times = finish_times
        self.explored = explored