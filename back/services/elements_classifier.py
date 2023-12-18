class Classifier:
    @staticmethod
    def exact_notexact_classifier(not_exact_elements: list, elements: list) -> dict:
        result = dict()

        for elem in elements:
            if elem in not_exact_elements:
                result[elem] = 'not_exact'
            else:
                result[elem] = 'exact'

        return result

    @staticmethod
    def importance_classifier(important_elements: list, elements: list):
        if set(important_elements).issubset(elements):
            return list(dict.fromkeys(important_elements+elements))

