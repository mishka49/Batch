from scipy.optimize import linprog
from back.services.calculator.value_classifier import Classifier, Precision
from decimal import Decimal


class CompoundCalculator:
    # def __init__(self, raw_materials: dict, additives: dict, result_compound: dict, stoves_waste_elem: dict,
    #              elements: list, coast_materials: dict):
    def __init__(self, materials: dict, result_compound: dict, stoves_waste_elem: dict,
                 elements: list, coast_materials: dict):
        # self.raw_materials = raw_materials
        # self.additives = additives
        self.materials = materials
        self.stoves_waste_elem = stoves_waste_elem
        self.result_compound = result_compound
        self.elements = elements
        self.coast_materials = coast_materials

        self.__create_balance_equation()
        self.__create_objective_function()

        self.A_eq = [[1 for _ in range(len(materials))]]
        self.b_eq = [1]

        self.batch_compound = None

    def _get_coeff(self):
        elements_coeff = dict()

        for element in self.elements:
            elements_coeff[element] = []

            for material, compound in self.materials.items():
                elements_coeff[element].append(Decimal(compound[element]))

        return elements_coeff

    def __create_balance_equation(self):
        self.A_ub = []
        self.b_ub = []

        self.A_eq = []
        self.b_eq = []

        coeff = self._get_coeff()

        for element in self.elements:
            # for result_compound, waste in zip(self.result_material,
            #                                   self.stoves_waste_elem):
            match Classifier.precise_classified(self.result_compound[element]):
                case Precision.Precise:

                    elem_coeff, lim = self.__get_equation(coeff[element], self.result_compound[element][0],
                                                          self.stoves_waste_elem[element])

                    self.A_eq.append(elem_coeff)
                    self.b_eq.append(lim)

                case Precision.Interval:
                    elem_coeff, lim = self.__get_equation(coeff[element], self.result_compound[element][1],
                                                          self.stoves_waste_elem[element], )

                    self.A_ub.append(elem_coeff)
                    self.b_ub.append(lim)

                    elem_coeff, lim = self.__get_equation(coeff[element], self.result_compound[element][0],
                                                          self.stoves_waste_elem[element],
                                                          reverse=True)

                    self.A_ub.append(elem_coeff)
                    self.b_ub.append(lim)

                case Precision.Limit:
                    if self.result_compound[element][1] != 0:
                        elem_coeff, lim = self.__get_equation(coeff[element], self.result_compound[element][1],
                                                              self.stoves_waste_elem[element], )

                    else:
                        elem_coeff, lim = self.__get_equation(coeff[element], self.result_compound[element][0],
                                                              self.stoves_waste_elem[element], reverse=True)

                        self.A_ub.append(elem_coeff)
                        self.b_ub.append(lim)

    def __get_equation(self, coeff_elem, result_compound_elem: float, waste_elem: float, reverse=False):
        reverse_coeff = Decimal(1)

        if reverse:
            reverse_coeff = Decimal(-1)

        return [Decimal(value) * reverse_coeff for value in coeff_elem], (Decimal(result_compound_elem) + Decimal(
            waste_elem)) * reverse_coeff

    def __create_objective_function(self):
        self.c = []

        for material in self.materials:
            self.c.append(self.coast_materials[material])

    def calculate_compound_of_batch(self):
        C = None if len(self.c) == 0 else self.c
        A_ub = None if len(self.A_ub) == 0 else self.A_ub
        b_ub = None if len(self.b_ub) == 0 else self.b_ub
        A_eq = None if len(self.A_eq) == 0 else self.A_eq
        b_eq = None if len(self.b_eq) == 0 else self.b_eq

        self.batch_compound = linprog(C, A_ub, b_ub, A_eq, b_eq)['x']

        return self.batch_compound

    def calculate_weigth_of_materials(self, result_weight: Decimal):
        _ = self.calculate_compound_of_batch() if self.batch_compound is None else None

        weight_of_materials = dict()

        for index, (material, _) in enumerate(self.materials.items()):
            weight_of_materials[material] = self.batch_compound[index] * result_weight

        return weight_of_materials

    def get_results(self):
        _ = self.calculate_compound_of_batch() if self.batch_compound is None else None

        result = list()

        if (self.batch_compound is None):
            return None

        for index, (material, _) in enumerate(self.materials.items()):
            result.append((material, self.batch_compound[index]))

        return result

    # def get_results(self):
    #     _ = self.calculate_compound_of_batch() if self.batch_compound is None else None
    #
    #     result = dict()
    #
    #     print(f"batch compound {self.batch_compound}")
    #     if (self.batch_compound is None):
    #         return None
    #
    #     for index, (material, _) in enumerate(self.materials.items()):
    #         result[material] = self.batch_compound[index]
    #
    #     return result


if __name__ == "__main__":
    # raw_materials = {
    #     "Сталь 40": {"Cr": 0.001,
    #                  "Ni": 0.002,
    #                  "Mn": 0.003}
    #     ,
    #     "Сталь 30": {"Cr": 0.004,
    #                  "Ni": 0.005,
    #                  "Mn": 0.006}
    #
    # }
    #
    # additives = {
    #     "FeNi": {"Cr": 0.03,
    #              "Ni": 0.01,
    #              "Mn": 0.02}
    #     ,
    #     "FeCr": {"Cr": 0.01,
    #              "Ni": 0.02,
    #              "Mn": 0.03}
    # }
    #
    # stove = {
    #     "Cr": 0.0001,
    #     "Ni": 0.0002,
    #     "Mn": 0.0003
    # }
    #
    # result_material = {"Cr": [0.1, 0.15],
    #                    "Ni": [0.2, 0.25],
    #                    "Mn": [0.3, 0.35]}
    #
    # coast_materials = {
    #     "Сталь 40": 40,
    #     "FeNi": 25,
    #     "Сталь 30": 30,
    #
    #     "FeCr": 80
    # }
    #
    # elements = ["Mn", "Ni", "Cr"]

    raw_materials = {
        "М1": {"Cu": 100,
               "Sn": 0,
               "P": 0,
               }
    }

    additives = {
        "АМФ10": {
            "Cu": 90,
            "Sn": 0,
            "P": 10,
        },
        "Олово": {
            "Cu": 0,
            "Sn": 100,
            "P": 0,
        }
    }

    stove = {
        "Cu": 0,
        "Sn": 0,
        "P": 0,
    }

    result_material = {
        # "Cu": [88,86],
        "Cu": [0, 100],
        "Sn": [12, 12.5],
        "P": [0.7, 0.7]
    }

    coast_materials = {
        "М1": 10,
        "АМФ10": 10,
        "Олово": 10,
    }

    elements = ["Cu", "Sn", "P"]

    materials = {**raw_materials, **additives}

    calculator = CompoundCalculator(materials, result_material, stove, elements, coast_materials)

    print(f"A_ub: {calculator.A_ub}")
    print(f"b_ub: {calculator.b_ub}")

    print(f"A_eq: {calculator.A_eq}")
    print(f"b_eq: {calculator.b_eq}")

    print((Decimal(0.003) + Decimal(0.03)))

    print(f"c: {calculator.c}")

    print(calculator.calculate_compound_of_batch())
    print(calculator.get_results())
    print(calculator.calculate_weigth_of_materials(800))

    print(Decimal(float('12.5')) * Decimal('4'))
