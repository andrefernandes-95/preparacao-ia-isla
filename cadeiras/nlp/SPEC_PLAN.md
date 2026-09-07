# SPEC_PLAN — Processamento de Linguagem Natural

## Estatuto e perfil
3 ECTS publicados pelo ISLA. Plano pedagógico independente para um programador front-end, bases do secundário frágeis e sem experiência universitária em IA. Não é o programa oficial detalhado. Consulta da fonte: 07-09-2026.

## Objetivo
Passar de texto a representações numéricas e avaliar sistemas de linguagem com espírito crítico.

## Pré-requisitos
Python, classificação, produto escalar e noção de rede neuronal.

## Resultado observável
Explicar tokenização, construir uma referência de classificação e desenhar um fluxo RAG verificável.

## Aulas introdutórias implementadas
Estimativa de 45 minutos por aula, incluindo exemplos e exercícios. Acrescentar prática e revisão conforme as dificuldades.

### Módulo 1 — Representar texto
- [N01 — Texto, tokens e vocabulário](modulo-1/n01.html): Converter texto numa representação numérica simples. Pré-requisitos: P01 e M01.
- [N02 — Classificar texto com uma referência](modulo-1/n02.html): Treinar representação e classificador sem fuga de dados. Pré-requisitos: N01 e ML02–ML03.

### Módulo 2 — Modelos de linguagem e pesquisa
- [N03 — Embeddings e atenção](modulo-2/n03.html): Interpretar semelhança vetorial e combinação de contexto. Pré-requisitos: M01 e D01.
- [N04 — Modelos de linguagem e RAG](modulo-2/n04.html): Desenhar uma resposta apoiada em documentos e avaliar falhas. Pré-requisitos: N02 e N03.

## Aprofundamento planeado — ainda por desenvolver em HTML
### AP1 — TF-IDF e classificação com pipelines
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

### AP2 — Embeddings, similaridade e pesquisa semântica
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

### AP3 — Atenção, transformers e adaptação de modelos
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

### AP4 — Avaliação de geração, recuperação e segurança de aplicações
- Preparar 2–3 aulas de 60 minutos, começando pelos pré-requisitos das aulas introdutórias.
- Explicar conceitos e notação, resolver um exemplo numérico mínimo e uma aplicação a dados de suporte ou interfaces.
- Laboratório: comparar a técnica com o método introdutório correspondente e registar pressupostos e limitações.
- Aceitação: explicar a técnica, executar um exemplo reproduzível e justificar quando a escolha é inadequada.
- Validar âmbito contra a ficha da unidade curricular quando disponibilizada pelo docente.

## Projeto
Classificar mensagens de suporte e desenhar pesquisa de documentação com indicação da fonte.

## Avaliação proposta
Divisão por origem dos textos, vocabulário aprendido no treino e teste com negações e casos ambíguos.

## Adaptação a 4 horas semanais
Seguir a seleção em [percurso](../../percurso.html). Não converter ECTS em horas de preparação nem tentar completar o aprofundamento antes de novembro. Quando falhar 2 exercícios, rever o pré-requisito em vez de acelerar.

## Contrato pedagógico de cada aula
Objetivo concreto; pré-requisitos ligados; intuição antes da fórmula; símbolos explicados; dois exemplos resolvidos; erro frequente; código; três exercícios com pista, validação e resolução; tarefa de transferência. Os exemplos numéricos são deliberadamente pequenos.

## Critérios de entrega
HTML próprio por aula; navegação módulo/cadeira; sem carregar conteúdos das outras aulas; legibilidade móvel; teclado; links relativos; cálculos revistos; exemplos executáveis ou explicitamente identificados como esquema; sem prometer resultados académicos.

## Fontes
- [ISLA Gaia](https://www.islagaia.pt/pt/pos-graduacoes/inteligencia-artificial-pt)
- [Hugging Face — curso de modelos de linguagem](https://huggingface.co/learn/llm-course/chapter1/1)
- [scikit-learn — primeiros passos](https://scikit-learn.org/stable/getting_started.html)
