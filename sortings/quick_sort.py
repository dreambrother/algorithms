__author__ = 'nik'


def quick_sort(array):
    result = array[:]
    if len(result) < 2:
        return result
    p = _choose_pivot(result)
    p = _partition(result, p)

    left_part = result[:p]
    right_part = result[p + 1:]

    left_part = quick_sort(left_part)
    right_part = quick_sort(right_part)

    left_part.append(result[p])
    return left_part + right_part


def _partition(array, p_index):
    p = array[p_index]
    i = j = p_index + 1
    while j < len(array):
        if array[j] < p:
            array[j], array[i] = array[i], array[j]
            i += 1
        j += 1
    array[p_index], array[i - 1] = array[i - 1], array[p_index]
    return i - 1


def _choose_pivot(array):
    p = 0
    array[0], array[p] = array[p], array[0]
    return p
