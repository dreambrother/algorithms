__author__ = 'nik'

import unittest
import knn


class TestKnn(unittest.TestCase):

    # (genre, # of kisses, # of kicks)
    training_set = [('action', 3, 145), ('action', 5, 160), ('action', 1, 151),
                    ('romance', 160, 0), ('romance', 140, 2), ('romance', 170, 1)]

    def test_action_recognition(self):
        actual = knn.classify((0, 155), self.training_set)
        self.assertEqual('action', actual)

    def test_romance_recognition(self):
        actual = knn.classify((180, 8), self.training_set)
        self.assertEqual('romance', actual)

if __name__ == '__main__':
    unittest.main()