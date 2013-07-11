__author__ = 'nik'

import unittest
import merge_sort


class TestMegeSort(unittest.TestCase):

    origin_arr = [8, 3, 1, 8, 10, 5]
    sorted_arr = [1, 3, 5, 8, 8, 10]

    def test_merge_sort(self):
        actual = merge_sort.merge_sort(self.origin_arr)
        self.assertEqual(self.sorted_arr, actual)

    def test_merge_sort_with_one_element(self):
        arr = [5]
        actual = merge_sort.merge_sort(arr)
        self.assertEqual(arr, actual)

    def test_merge_sort_with_two_elements(self):
        arr = [5, 2]
        actual = merge_sort.merge_sort(arr)
        self.assertEqual([2, 5], actual)

    def test_merge_sort_with_three_elements(self):
        arr = [5, 2, 7]
        actual = merge_sort.merge_sort(arr)
        self.assertEqual([2, 5, 7], actual)

if __name__ == '__main__':
    unittest.main()