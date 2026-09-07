"""Executa com python labs/bases.py. Não precisa de bibliotecas externas."""
from statistics import mean, median

latencias = [100, 110, 390]
assert mean(latencias) == 200
assert median(latencias) == 110
print({"media_ms": mean(latencias), "mediana_ms": median(latencias)})

x, w, b = [3, 2], [20, 50], 40
previsao = sum(a * peso for a, peso in zip(x, w)) + b
assert previsao == 200
print("Previsão:", previsao)

peso = 0.0
for passo in range(5):
    perda = (peso - 3) ** 2
    gradiente = 2 * (peso - 3)
    novo = peso - 0.1 * gradiente
    assert (novo - 3) ** 2 <= perda
    print(f"Passo {passo}: peso={peso:.4f}, perda={perda:.4f}, novo={novo:.4f}")
    peso = novo

print("Tarefa: altera a taxa de 0.1 para 1.1 e explica por que a verificação falha.")
