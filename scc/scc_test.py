import threading
import unittest
from unittest.case import TestCase
import sys
import scc

__author__ = 'nik'


class SccTest(TestCase):

    def test_scc(self):
        # given
        edges_list = {1: [4], 2: [8], 3: [6], 4: [7], 5: [2], 6: [9], 7: [1], 8: [5, 6], 9: [3, 7]}

        # when
        result = scc.execute(edges_list)

        # then
        self.assertEqual(result, {9: 3, 6: 3, 4: 3})

    def test_reverse(self):
        edges_list = {1: [2, 3], 2: [3, 4], 3: [4]}
        result = scc._reverse(edges_list)
        self.assertEqual(result, {2: [1], 3: [1, 2], 4: [2, 3]})

    def test_replace_nodes_by_finish_times(self):
        edges_list = {1: [2, 3], 3: [2, 4]}
        finish_times = {1: 2, 2: 1, 3: 4, 4: 3}
        result = scc._replace_nodes_by_finish_times(edges_list, finish_times)
        self.assertEqual(result, {1: [], 2: [1, 4], 3: [], 4: [1, 3]})


if __name__ == '__main__':
    sys.setrecursionlimit(100000)
    threading.stack_size(2 ** 27)
    thread = threading.Thread(target=unittest.main)
    thread.start()