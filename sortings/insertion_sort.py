__author__ = 'nik'


def insertion_sort(arr):
    result = arr[:]
    for j in range(1, len(result)):
        key = result[j]
        i = j - 1
        while i >= 0 and result[i] > key:
            result[i + 1] = result[i]
            i -= 1
        result[i + 1] = key
    return result