"""Laboratório didático com dados sintéticos. Não demonstra eficácia real."""
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.dummy import DummyClassifier
from sklearn.metrics import classification_report, confusion_matrix, f1_score

# Divisão fixa e explícita. O teste é muito pequeno e não representa produção.
treino = [
    ("não consigo entrar na conta", "conta"),
    ("esqueci a palavra passe de acesso", "conta"),
    ("quero alterar o email da conta", "conta"),
    ("o login foi bloqueado", "conta"),
    ("preciso recuperar acesso ao perfil", "conta"),
    ("a autenticação da conta falhou", "conta"),
    ("tenho uma cobrança duplicada", "pagamento"),
    ("preciso da fatura do pagamento", "pagamento"),
    ("o cartão foi recusado ao pagar", "pagamento"),
    ("quero devolver o pagamento", "pagamento"),
    ("o valor cobrado está errado", "pagamento"),
    ("não recebi recibo da compra", "pagamento"),
    ("a página apresenta um erro", "tecnico"),
    ("a imagem não carrega no navegador", "tecnico"),
    ("o botão deixou de funcionar", "tecnico"),
    ("a aplicação bloqueia ao abrir", "tecnico"),
    ("o ecrã fica vazio", "tecnico"),
    ("a página demora muito a carregar", "tecnico"),
]
teste = [
    ("como recuperar a palavra passe", "conta"),
    ("o meu perfil está sem acesso", "conta"),
    ("a fatura tem uma cobrança a mais", "pagamento"),
    ("o recibo do cartão não chegou", "pagamento"),
    ("o navegador mostra o ecrã vazio", "tecnico"),
    ("a imagem da página desapareceu", "tecnico"),
]
X_treino, y_treino = map(list, zip(*treino))
X_teste, y_teste = map(list, zip(*teste))
assert set(X_treino).isdisjoint(X_teste)
categorias = ["conta", "pagamento", "tecnico"]

modelos = {
    "Referência (classe mais frequente)": DummyClassifier(strategy="most_frequent"),
    "TF-IDF + regressão logística": make_pipeline(
        TfidfVectorizer(ngram_range=(1, 2)),
        LogisticRegression(max_iter=500, random_state=42),
    ),
}

for nome, modelo in modelos.items():
    modelo.fit(X_treino, y_treino)
    previsoes = modelo.predict(X_teste)
    print("\n", nome)
    print("Macro-F1:", round(f1_score(y_teste, previsoes, average="macro"), 3))
    print(classification_report(y_teste, previsoes, labels=categorias, zero_division=0))
    print("Matriz: linhas=reais, colunas=previsões; ordem:", categorias)
    print(confusion_matrix(y_teste, previsoes, labels=categorias))
    for texto, real, previsto in zip(X_teste, y_teste, previsoes):
        if real != previsto:
            print("ERRO:", repr(texto), "real=", real, "previsto=", previsto)

print("\nLIMITES: 18 frases de treino e 6 de teste, todas sintéticas e simples.")
print("Não há validação para escolher hiperparâmetros: esta configuração foi fixada.")
print("Se ajustares usando estes resultados, reserva um novo teste independente.")
print("Tarefa: recolher ambiguidades e negações para desenvolvimento, sem prometer eficácia real.")
