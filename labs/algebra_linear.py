"""M01–M02: vetores e matrizes pequenos, verificados em NumPy."""
import numpy as np


def main():
    x = np.array([3.0, 2.0])
    w = np.array([20.0, 50.0])
    assert x.shape == (2,)
    assert np.isclose(w @ x + 40, 200)
    assert np.isclose(np.linalg.norm([3.0, 4.0]), 5)

    X = np.array([[1.0, 2.0], [3.0, 0.0]])
    previsoes = X @ np.array([10.0, 20.0]) + 5
    assert X.shape == (2, 2)
    assert previsoes.shape == (2,)
    assert np.allclose(previsoes, [55.0, 35.0])

    A = np.array([[1.0, 2.0], [3.0, 4.0]])
    B = np.array([[5.0, 6.0], [7.0, 8.0]])
    assert np.allclose(A @ B, [[19, 22], [43, 50]])
    assert np.allclose(A * B, [[5, 12], [21, 32]])
    assert not np.allclose(A @ B, B @ A)
    assert np.allclose(np.eye(2) @ x, x)

    rotacao = np.array([[0.0, -1.0], [1.0, 0.0]])
    antes = np.array([2.0, 1.0])
    depois = rotacao @ antes
    assert np.allclose(depois, [-1.0, 2.0])
    assert np.isclose(np.linalg.norm(antes), np.linalg.norm(depois))

    print("Previsoes:", previsoes)
    print("A @ B:\n", A @ B)
    print("A * B:\n", A * B)
    print("Rotacao:", antes, "->", depois)
    print("Todas as verificacoes passaram.")


if __name__ == "__main__":
    main()
