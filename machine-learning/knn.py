__author__ = 'nik'

import math

K = 5


def classify(item, training_set):
    distances = []
    for training_item in training_set:
        distance = math.sqrt((math.pow(training_item[1] - item[0], 2) + math.pow(training_item[2] - item[1], 2)))
        distances.append((training_item[0], distance))

    distances.sort(cmp=lambda x, y: 1 if x[1] > y[1] else -1)
    class_count = {}
    for i in range(0, K):
        genre = distances[i][0]
        if not class_count.has_key(genre):
            class_count[genre] = 0
        class_count[genre] += 1
    result = max(class_count, key=class_count.get)
    return result
