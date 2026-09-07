"""M04: derivada numérica e descida do gradiente numa parábola."""


def perda(w):
    return (w - 3) ** 2


def gradiente(w):
    return 2 * (w - 3)


def gradiente_numerico(funcao, w, epsilon=1e-5):
    return (funcao(w + epsilon) - funcao(w - epsilon)) / (2 * epsilon)


def passo(w, taxa):
    return w - taxa * gradiente(w)


def main():
    for w in [-2.0, 0.0, 1.0, 3.0, 5.0]:
        analitico = gradiente(w)
        numerico = gradiente_numerico(perda, w)
        assert abs(analitico - numerico) < 1e-8

    w = 0.0
    taxa = 0.1
    for numero in range(1, 4):
        anterior = perda(w)
        w = passo(w, taxa)
        atual = perda(w)
        assert atual < anterior
        print(f"Passo {numero}: w={w:.4f}, perda={atual:.4f}")

    assert abs(w - 1.464) < 1e-12
    salto = passo(0.0, 2.0)
    assert salto == 12.0
    assert perda(salto) == 81.0 > perda(0.0)
    print("Taxa 2.0:", 0.0, "->", salto, "; perda", perda(0.0), "->", perda(salto))
    print("Gradientes analiticos e numericos coincidem nos pontos testados.")


if __name__ == "__main__":
    main()
