"""Rede mínima em CPU para aprender y=2x+1. Requer PyTorch."""
import torch

torch.manual_seed(42)
X_treino = torch.tensor([[-2.], [-1.], [0.], [1.], [2.]])
y_treino = 2 * X_treino + 1
X_teste = torch.tensor([[-1.5], [0.5], [1.5]])
y_teste = 2 * X_teste + 1
# Uma camada linear é intencional: primeiro verificar o ciclo mais simples.
modelo = torch.nn.Linear(1, 1)
otimizador = torch.optim.SGD(modelo.parameters(), lr=0.05)
perda_fn = torch.nn.MSELoss()

modelo.train()
for epoca in range(201):
    otimizador.zero_grad()
    previsao = modelo(X_treino)
    assert previsao.shape == y_treino.shape
    perda = perda_fn(previsao, y_treino)
    perda.backward()
    otimizador.step()
    if epoca % 50 == 0:
        print(f"Época {epoca}: MSE treino={perda.item():.6f}")

modelo.eval()
with torch.no_grad():
    previsto = modelo(X_teste)
    mae = torch.mean(torch.abs(previsto - y_teste)).item()
    referencia = y_treino.mean().expand_as(y_teste)
    mae_referencia = torch.mean(torch.abs(referencia - y_teste)).item()
print("Peso e viés:", modelo.weight.item(), modelo.bias.item())
print("MAE teste:", mae, "MAE referência:", mae_referencia)
assert mae < 0.01
print("Exercício: comparar com duas camadas e ReLU usando validação separada.")
print("Estes dados seguem uma reta exata: não representam um problema real complexo.")
