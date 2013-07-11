__author__ = 'nik'


def merge_sort(arr):
    if len(arr) == 1:
        return arr
    middlePos = len(arr) / 2
    return _merge(merge_sort(arr[0:middlePos]), merge_sort(arr[middlePos:len(arr)]))


def _merge(arr1, arr2):
    result = []
    idx1 = 0
    idx2 = 0
    for i in range(0, len(arr1) + len(arr2)):
        if idx1 < len(arr1) and idx2 < len(arr2):
            if arr1[idx1] < arr2[idx2]:
                result.insert(i, arr1[idx1])
                idx1 += 1
            else:
                result.insert(i, arr2[idx2])
                idx2 += 1
        elif idx1 < len(arr1):
            while idx1 < len(arr1):
                result.insert(i, arr1[idx1])
                i += 1
                idx1 += 1
        elif idx2 < len(arr2):
            while idx2 < len(arr2):
                result.insert(i, arr2[idx2])
                i += 1
                idx2 += 1
    return result
