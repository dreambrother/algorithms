from unittest.case import TestCase
import dijkstras_algorithm

__author__ = 'nik'


class DijkstasAlgorithmTest(TestCase):

    def test_compute_shortest_path(self):
        adj_list = {
            1: [(2, 1), (3, 2)],
            2: [(1, 1), (4, 5)],
            3: [(1, 2), (4, 3), (5, 2)],
            4: [(2, 5), (3, 3)],
            5: [(3, 2)]
        }

        result = dijkstras_algorithm.compute_shortes_path(adj_list, 1)

        self.assertEqual({1: 0, 2: 1, 3: 2, 4: 5, 5: 4}, result)
