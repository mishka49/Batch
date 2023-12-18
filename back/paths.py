import eel
import json

import back.repositories.selecting
from back.repositories import selecting, updating, deleting, inserting
from back.services.calculator import calculator
from back.services.calculator.calculator import CompoundCalculator
from back.services.elements_classifier import Classifier
from back.serializers.serializer import Serializer
from back.services.list_to_dict import list_to_dict


@eel.expose
def get_elements():
    elements = selecting.get_list_elements()
    sorted_elements = Classifier.importance_classifier(important_elements=['Cr', 'Ni'], elements=elements)
    result = Classifier.exact_notexact_classifier(not_exact_elements=['S', 'P'], elements=sorted_elements)

    return json.dumps(result)


@eel.expose
def get_stoves():
    stoves = selecting.get_stoves()
    return Serializer.parse_to_json(stoves)


@eel.expose
def get_stove(stove_type):
    stove = selecting.get_stove(stove_type)
    return Serializer.parse_to_json(stove)


@eel.expose
def get_raw_materials():
    # raw_materials = selecting.get_raw_materials()
    # print(type(raw_materials.columns))
    # for material in raw_materials:
    #     print(material.id)
    # return json.dumps(raw_materials)
    raw_materials = selecting.get_raw_materials()
    return Serializer.parse_to_json(raw_materials)


@eel.expose
def get_material(type, brand):
    if type == "rawMaterial":
        material = selecting.get_raw_material(brand)
    else:
        material = selecting.get_additive(brand)


    return Serializer.parse_to_json(material)


@eel.expose
def get_additives():
    # additives = selecting.get_raw_materials()
    # print(type(additives.columns))
    # for material in additives:
    #     print(material.id)
    # return json.dumps(additives)

    additives = selecting.get_additives()
    return Serializer.parse_to_json(additives)


@eel.expose
def get_coast():
    pass


@eel.expose
def get_compound(id):
    compound = selecting.get_compound(id)
    return Serializer.parse_to_json(compound)


@eel.expose
def get_calculated(data):
    materials_compound = list_to_dict(list(map(lambda item: {item['brand']: item['compound']}, data['materials'])))
    materials_coasts = list_to_dict(list(map(lambda item: {item['brand']: item['coast']}, data['materials'])))
    result_compound = data['result_compound']
    stove_waste_elem = data['stove_compound']
    elements = data['elements']

    calculator = CompoundCalculator(materials_compound, result_compound, stove_waste_elem, elements, materials_coasts)

    result = calculator.get_results()

    return json.dumps(result)


@eel.expose
def post_new_raw_material(elements: dict):
    pass


@eel.expose
def post_update_waste_elem(elements: dict):
    pass


if __name__ == "__main__":
    print(get_material('rawMaterial', 'Сталь 45'))


#
# header = ("id", "name", "content")
#
# my_col = [
#     (1, "name 1", "content 1"),
#     (2, "name 2", "content 2"),
#     (3, "name 3", "content 3")
# ]
#
# items = [dict(zip(header, item)) for item in my_col.]
#
# print(json.dumps(items))
