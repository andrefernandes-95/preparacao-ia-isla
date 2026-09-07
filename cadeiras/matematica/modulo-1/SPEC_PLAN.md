# Módulo 1 — Álgebra linear aplicada

## Perfil e objetivo
Primeiro módulo matemático após a ponte de bases. Destina-se a um programador front-end que compreende funções e equações simples, mas ainda não estudou álgebra linear universitária. O objetivo é ler vetores e matrizes como representações de dados e transformações, sem esconder a geometria nem as dimensões.

## Ritmo
Uma semana de 4 horas por aula. Usar duas sessões de 60 minutos para a explicação e reservar duas horas para contas no papel, código e repetição após 48 horas. Não avançar quando as dimensões ou as unidades ainda são escolhidas por tentativa.

## M01 — Vetores e produto escalar
- Sequência: escalar → vetor e componentes → dimensão e ordem → vetor geométrico e vetor de dados → adição/subtração → multiplicação por escalar → norma e distância → produto escalar → ângulo/perpendicularidade → previsão ponderada e viés.
- Resultados: representar um caso por um vetor, executar operações compatíveis, interpretar norma/distância, calcular produto escalar e uma previsão linear com unidades.
- Representações: plano cartesiano e tabela de características equivalentes em texto.
- Sete exercícios progressivos com pistas e resoluções; código sem bibliotecas externas.
- Aceitação: 6/7 sem pistas, incluindo norma, produto escalar e previsão; explicar por que a ordem e a escala das características importam.
- Estado: conteúdo completo implementado; publicar e confirmar antes de iniciar M02.

## M02 — Matrizes e dimensões
- Sequência: matriz/shape/índices → linhas e colunas → operações elemento a elemento → transposta → produto matriz-vetor → produto matriz-matriz → identidade → transformação geométrica → NumPy e broadcasting controlado.
- Resultados: prever várias observações, validar dimensões antes do cálculo e distinguir `*` de `@` em NumPy.
- Sete exercícios progressivos e laboratório de álgebra linear.
- Aceitação: 6/7 sem pistas; escrever as shapes de todos os operandos e confirmar pelo menos uma célula à mão.
- Estado: introdutório; aprofundar apenas após publicação de M01.

## Limites
Sistemas lineares gerais, determinantes, inversas, bases, independência linear, projeções e autovetores ficam para aprofundamentos posteriores. M01 pode introduzir perpendicularidade; M02 pode mostrar a identidade e transformações simples sem apresentar uma inversa como método preferencial para resolver sistemas.

## Entrega
Especificação → conteúdo → revisão matemática e pedagógica → build e testes → commit da aula → push → confirmação no GitHub Pages. Cada aula permanece num HTML próprio. Não afirmar inspeção visual automatizada quando só forem executadas verificações estruturais.
