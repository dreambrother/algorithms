__author__ = 'nik'

from unittest import TestCase
import dfs


class DfsTest(TestCase):

    def test_dfs(self):
        # given
        edges_list = {1: [4], 2: [8], 3: [6], 4: [7], 5: [2], 6: [9], 7: [1], 8: [5, 6], 9: [3, 7]}

        # when
        result = dfs.dfs_loop(edges_list)

        # then
        self.assertEqual(result, {1: 4, 2: 7, 3: 2, 4: 3, 5: 8, 6: 1, 7: 5, 8: 9, 9: 6})