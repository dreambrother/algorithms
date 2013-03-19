__author__ = 'nik'

import unittest
import sortings

class TestSortings(unittest.TestCase):

    origin_arr = [8, 3, 1, 8, 10, 5]
    sorted_arr = [1, 3, 5, 8, 8, 10]

    def test_insertion_sort(self):
        actual = sortings.insertion_sort(self.origin_arr)
        self.assertEqual(self.sorted_arr, actual)

    def test_merge_sort(self):
        actual = sortings.merge_sort(self.origin_arr)
        self.assertEqual(self.sorted_arr, actual)

    def test_merge_sort_with_one_element(self):
        arr = [5]
        actual = sortings.merge_sort(arr)
        self.assertEqual(arr, actual)

    def test_merge_sort_with_two_elements(self):
        arr = [5, 2]
        actual = sortings.merge_sort(arr)
        self.assertEqual([2, 5], actual)

    def test_merge_sort_with_three_elements(self):
        arr = [ 5, 2, 7 ];
        actual = sortings.merge_sort(arr)
        self.assertEqual([2, 5, 7], actual)

if __name__ == '__main__':
    unittest.main()