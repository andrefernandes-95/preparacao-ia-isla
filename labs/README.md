# Laboratórios

São experiências pequenas para aprender em CPU. Os dados de suporte são sintéticos e estão no próprio script. Não há chamadas a APIs pagas, dados pessoais nem downloads de modelos.

## Windows / PowerShell

Instala Python 3 e confirma `py --version`. Na raiz do repositório:

```powershell
py -m venv .venv
.venv\Scripts\python.exe labs/bases.py
.venv\Scripts\python.exe -m pip install -r labs/requirements.txt
.venv\Scripts\python.exe labs/suporte.py
```

Em macOS/Linux, usa `python3 -m venv .venv` e `.venv/bin/python` nos comandos seguintes. Não é necessário ativar o ambiente no PowerShell.

## Rede opcional, depois de D02

Consulta o [instalador oficial do PyTorch](https://pytorch.org/get-started/locally/) para compatibilidade do teu sistema/Python. Para CPU em Windows, uma opção habitual é:

```powershell
.venv\Scripts\python.exe -m pip install torch --index-url https://download.pytorch.org/whl/cpu
.venv\Scripts\python.exe labs/rede.py
```

Esta instalação pode ser grande. O percurso inicial funciona sem PyTorch. O exemplo usa apenas uma camada linear para tornar o ciclo de treino verificável; o exercício propõe a comparação com uma rede com ativação.

## O que observar

- `bases.py`: média 200, mediana 110, previsão 200 e perda a diminuir em cada passo.
- `suporte.py`: referência, macro-F1, relatório por classe e matriz de confusão. Não há mínimo de pontuação que prove eficácia: só há seis exemplos sintéticos de teste.
- `rede.py`: peso aproxima-se de 2, viés de 1 e MAE abaixo de 0,01 neste problema exato.

## Reproduzir e investigar

O ficheiro de requisitos usa intervalos de compatibilidade, não um lock de todas as plataformas. Depois de instalar, regista o ambiente exato:

```powershell
.venv\Scripts\python.exe -m pip freeze > ambiente-experiencia.txt
```

Guarda o ficheiro junto dos resultados da tua experiência. O teste sintético foi fixado antes do ajuste do modelo. Não afines hiperparâmetros com esse teste e continues a chamar-lhe independente: reserva validação e um novo teste se fores desenvolver o modelo.

Os scripts executam na tua máquina; GitHub Pages apenas disponibiliza os ficheiros para leitura/download.

## Álgebra linear — M01 e M02

Depois de instalar os requisitos, executa `.venv/Scripts/python.exe labs/algebra_linear.py` em Windows. O laboratório confirma produto escalar, norma, previsões, produto matricial, produto elemento a elemento, identidade e uma rotação. Todas as matrizes são deliberadamente pequenas para confirmares uma célula no papel.

## Derivadas e otimização — M04

Executa `.venv/Scripts/python.exe labs/gradiente.py` em Windows, ou `.venv/bin/python labs/gradiente.py` em macOS/Linux. O laboratório compara a derivada analítica de `L(w) = (w - 3)²` com uma aproximação numérica, executa três atualizações com taxa `0,1` e mostra por que uma taxa `2` ultrapassa o mínimo e aumenta a perda. Usa apenas a biblioteca padrão.

## Primeiro laboratório — B05
`ambiente.py` usa apenas a biblioteca padrão. Executa com `.venv/Scripts/python.exe labs/ambiente.py` em Windows, ou `.venv/bin/python labs/ambiente.py` em macOS/Linux. Mostra o executável, média 200 e mediana 110; a lista vazia produz null nos resumos. Nenhum ficheiro é alterado.
