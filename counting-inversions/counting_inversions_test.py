__author__ = 'nik'

import unittest
import counting_inversions


class TestCountingInversions(unittest.TestCase):

    origin_arr = [8, 3, 1, 8, 10, 5]
    sorted_arr = [1, 3, 5, 8, 8, 10]

    def test_count_inversions(self):
        actual = counting_inversions.sort_and_count_inversions(self.origin_arr)
        self.assertEqual((self.sorted_arr, 6), actual)

    def test_count_inversions_with_one_element(self):
        arr = [5]
        actual = counting_inversions.sort_and_count_inversions(arr)
        self.assertEqual((arr, 0), actual)

    def test_count_inversions_with_two_elements(self):
        arr = [5, 2]
        actual = counting_inversions.sort_and_count_inversions(arr)
        self.assertEqual(([2, 5], 1), actual)

    def test_count_inversions_with_three_elements(self):
        arr = [5, 2, 7]
        actual = counting_inversions.sort_and_count_inversions(arr)
        self.assertEqual(([2, 5, 7], 1), actual)

if __name__ == '__main__':
    unittest.main()