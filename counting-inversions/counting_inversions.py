__author__ = 'nik'


def sort_and_count_inversions(arr):
    if len(arr) == 1:
        return arr, 0
    middlePos = len(arr) / 2
    b, x = sort_and_count_inversions(arr[0:middlePos])
    c, y = sort_and_count_inversions(arr[middlePos:len(arr)])
    d, z = _sort_and_count_split_inversions(b, c)
    return d, x + y + z


def _sort_and_count_split_inversions(arr1, arr2):
    result = []
    idx1 = 0
    idx2 = 0
    inversions_count = 0
    for i in range(0, len(arr1) + len(arr2)):
        if idx1 < len(arr1) and idx2 < len(arr2):
            if arr1[idx1] < arr2[idx2]:
                result.insert(i, arr1[idx1])
                idx1 += 1
            else:
                result.insert(i, arr2[idx2])
                if arr2[idx2] < arr1[idx1]:
                    inversions_count += len(arr1) - idx1
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
    return result, inversions_count
