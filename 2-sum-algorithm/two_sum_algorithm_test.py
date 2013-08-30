from unittest.case import TestCase
import two_sum_algorithm

__author__ = 'nik'


class TwoSumTest(TestCase):

    def test_first_subpart_for_even_len(self):
        self.assertEqual(range(0, 20), two_sum_algorithm._get_subpart(range(0, 80), 0, 4))

    def test_second_subpart_for_even_len(self):
        self.assertEqual(range(20, 40), two_sum_algorithm._get_subpart(range(0, 80), 1, 4))

    def test_first_subpart_for_odd_len(self):
        self.assertEqual(range(0, 20), two_sum_algorithm._get_subpart(range(0, 81), 0, 4))

    def test_last_subpart_for_odd_len(self):
        self.assertEqual(range(60, 81), two_sum_algorithm._get_subpart(range(0, 81), 3, 4))