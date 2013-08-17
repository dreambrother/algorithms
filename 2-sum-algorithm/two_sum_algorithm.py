from multiprocessing import Pool

__author__ = 'nik'


def load_set(path):
    result = set()
    with open(path) as f:
        for line in f.readlines():
            result.add(int(line))
    return result


def _is_satisfy_criteria(numbers, t):
    for n in numbers:
        second_num = t - n
        if n != second_num and second_num in numbers:
            return True
    return False


def compute(numbers, t_interval):
    count = 0
    for t in t_interval:
        count += 1 if _is_satisfy_criteria(numbers, t) else 0
    return count


def parallelize(numbers, t_interval, process_number):
    pool = Pool(processes=process_number)
    results = map(lambda x: pool.apply_async(compute, args=(numbers, _get_subpart(t_interval, x, process_number))), range(0, process_number))
    results = map(lambda x: x.get(), results)
    return reduce(lambda x, y: x + y, results)


def _get_subpart(interval, seq, parts_number):
    length = len(interval)
    part_len = length / parts_number
    start_index = seq * part_len
    if length % 2 == 0:
        return interval[start_index:(seq + 1) * part_len]
    elif seq != parts_number - 1:  # if not last
        return interval[start_index:(seq + 1) * part_len]
    else:
        return interval[start_index:]


if __name__ == '__main__':
    numbers = load_set('/Users/nik/tmp/q1.txt')
    print parallelize(numbers, range(-10000, 10001), 4)
