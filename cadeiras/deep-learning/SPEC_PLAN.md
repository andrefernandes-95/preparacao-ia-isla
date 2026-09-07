# SPEC_PLAN — Redes Neuronais e Deep Learning

## Estatuto e perfil
5 ECTS publicados pelo ISLA. Plano pedagógico independente para um programador front-end, bases do secundário frágeis e sem experiência universitária em IA. Não é o programa oficial detalhado. Consulta da fonte: 07-09-2026.

## Objetivo
Perceber o que uma rede calcula e como aprende, sem começar por arquiteturas gigantes.

## Pré-requisitos
Produto escalar, derivada, Python e avaliação de Machine Learning.

## Resultado observável
Calcular um neurónio, interpretar um gradiente e reconhecer sobreajustamento num treino.

## Aulas introdutórias implementadas
Estimativa de 45 minutos por aula, incluindo exemplos e exercícios. Acrescentar prática e revisão conforme as dificuldades.

### Módulo 1 — Do neurónio à aprendizagem
- [D01 — Um neurónio explicado à mão](modulo-1/d01.html): Calcular uma soma ponderada e uma ativação. Pré-requisitos: M01 e ML01.
- [D02 — Gradientes e regra da cadeia](modulo-1/d02.html): Relacionar perda, previsão e atualização de peso. Pré-requisitos: M04 e D01.

### Módulo 2 — Treino e arquiteturas
- [D03 — O ciclo de treino](modulo-2/d03.html): Ordenar previsão, perda, gradiente e atualização. Pré-requisitos: D02 e P04.
- [D04 — Arquiteturas e transferência](modulo-2/d04.html): Relacionar a estrutura dos dados com a rede escolhida. Pré-requisitos: D01 e D03.

## Aprofundamento planeado — ainda por desenvolver em HTML
### AP1 — Backpropagation por várias camadas e regra da cadeia
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

### AP2 — CNN, convolução, pooling e visão computacional
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

### AP3 — RNN, atenção e transformers
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

### AP4 — Transfer learning, regularização e comparação TensorFlow/PyTorch
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

## Projeto
Executar uma pequena rede em CPU e comparar com o modelo linear do mesmo problema.

## Avaliação proposta
Shapes explicadas, gradientes limpos, treino e avaliação separados, comparação honesta e reproduzível.

## Adaptação a 4 horas semanais
Seguir a seleção em [percurso](../../percurso.html). Não converter ECTS em horas de preparação nem tentar completar o aprofundamento antes de novembro. Quando falhar 2 exercícios, rever o pré-requisito em vez de acelerar.

## Contrato pedagógico de cada aula
Objetivo concreto; pré-requisitos ligados; intuição antes da fórmula; símbolos explicados; dois exemplos resolvidos; erro frequente; código; três exercícios com pista, validação e resolução; tarefa de transferência. Os exemplos numéricos são deliberadamente pequenos.

## Critérios de entrega
HTML próprio por aula; navegação módulo/cadeira; sem carregar conteúdos das outras aulas; legibilidade móvel; teclado; links relativos; cálculos revistos; exemplos executáveis ou explicitamente identificados como esquema; sem prometer resultados académicos.

## Fontes
- [ISLA Gaia](https://www.islagaia.pt/pt/pos-graduacoes/inteligencia-artificial-pt)
- [PyTorch — Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html)
