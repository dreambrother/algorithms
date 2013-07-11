__author__ = 'nik'

import unittest
import insertion_sort


class TestSortings(unittest.TestCase):

    origin_arr = [8, 3, 1, 8, 10, 5]
    sorted_arr = [1, 3, 5, 8, 8, 10]

    def test_insertion_sort(self):
        actual = insertion_sort.insertion_sort(self.origin_arr)
        self.assertEqual(self.sorted_arr, actual)

if __name__ == '__main__':
    unittest.main()