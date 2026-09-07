"""B05: executar num ambiente virtual. Usa apenas a biblioteca padrão."""
import json
import sys
from statistics import median


def resumir(valores):
    """Neste exercício, valores é uma lista de latências numéricas válidas."""
    if not valores:
        return {"quantidade": 0, "media_ms": None, "mediana_ms": None}
    return {
        "quantidade": len(valores),
        "media_ms": sum(valores) / len(valores),
        "mediana_ms": median(valores),
    }


def main():
    assert resumir([100, 110, 390]) == {
        "quantidade": 3, "media_ms": 200.0, "mediana_ms": 110
    }
    assert resumir([])["media_ms"] is None
    assert resumir([10, 20, 30, 40])["mediana_ms"] == 25
    print("Python:", sys.executable)
    print("Versao:", sys.version.split()[0])
    print(json.dumps(resumir([100, 110, 390]), ensure_ascii=False, indent=2))
    print(json.dumps(resumir([]), ensure_ascii=False))


if __name__ == "__main__":
    main()
