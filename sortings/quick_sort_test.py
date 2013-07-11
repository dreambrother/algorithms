__author__ = 'nik'

import unittest
import quick_sort


class TestQuickSort(unittest.TestCase):

    def test_quick_sort(self):
        array = [5, 4, 7, 7, 8, 1, 2, 6, 3]
        expected = [1, 2, 3, 4, 5, 6, 7, 7, 8]
        actual = quick_sort.quick_sort(array)
        assert expected == actual

    def test_3_element_array_sort(self):
        array = [5, 12, 1]
        expected = [1, 5, 12]
        assert expected == quick_sort.quick_sort(array)

    def test_1_element_array_sort(self):
        array = [5]
        assert array == quick_sort.quick_sort(array)

if __name__ == '__main__':
    unittest.main()