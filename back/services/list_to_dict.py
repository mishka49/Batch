def list_to_dict(list_of_dicts):
    result = dict()

    for item in list_of_dicts:
        result = result | dict(zip(item.keys(), item.values()))

    return result


if __name__ == "__main__":
    my_list = [
        {"key1": "value1"},
        {"key2": "value2"},
        {"key3": "value3"},
    ]

    print(list_to_dict(my_list))
