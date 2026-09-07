# Preparação para a pós-graduação em Inteligência Artificial

## 1. Objetivo e perfil

Criar um caderno de estudo em português de Portugal para André, programador front-end, sem experiência significativa em IA ou matemática universitária, com bases do secundário suficientes mas frágeis. O objetivo é conseguir acompanhar e trabalhar nas cadeiras, desenvolvendo autonomia; não prometer sucesso académico nem substituir aulas e avaliação oficiais.

Disponibilidade confirmada: **4 horas por semana**. Meta indicada: novembro de 2026. Plano inicial: **8 semanas / 32 horas**, a partir de 7 de setembro. O site inclui um percurso prioritário de cerca de 14 horas caso o início seja em outubro.

## 2. Fontes e distinção curricular

- [Página do ISLA Gaia](https://www.islagaia.pt/pt/pos-graduacoes/inteligencia-artificial-pt), consultada em 07-09-2026: oito cadeiras, 30 ECTS, 150 horas de contacto. Plano identificado como 2025–26, início previsto apresentado como 02-10-2026. A data da edição deve ser confirmada pela instituição.
- [Repositório de referência](https://github.com/andrefernandes-95/matematica): inspira a clareza pedagógica e os exemplos resolvidos; este projeto adota explicitamente documentos separados por aula.
- Os títulos e ECTS vêm do plano publicado. A sequência, módulos, aulas, projetos e grelhas são propostas de preparação, pois não foram encontradas fichas detalhadas na página fornecida.
- ECTS e horas de contacto não são convertidos em horas deste plano pessoal.

## 3. Planos por cadeira

| Cadeira | ECTS | Plano |
|---|---:|---|
| Ponte de bases (adicional) | — | [SPEC_PLAN](cadeiras/bases/SPEC_PLAN.md) |
| Fundamentos Matemáticos para IA | 4 | [SPEC_PLAN](cadeiras/matematica/SPEC_PLAN.md) |
| Programação para IA | 4 | [SPEC_PLAN](cadeiras/programacao/SPEC_PLAN.md) |
| Introdução à Inteligência Artificial | 3 | [SPEC_PLAN](cadeiras/introducao/SPEC_PLAN.md) |
| Machine Learning | 5 | [SPEC_PLAN](cadeiras/machine-learning/SPEC_PLAN.md) |
| Redes Neuronais e Deep Learning | 5 | [SPEC_PLAN](cadeiras/deep-learning/SPEC_PLAN.md) |
| Processamento de Linguagem Natural | 3 | [SPEC_PLAN](cadeiras/nlp/SPEC_PLAN.md) |
| Inteligência Artificial em Aplicações Práticas | 3 | [SPEC_PLAN](cadeiras/aplicacoes/SPEC_PLAN.md) |
| Projeto Final | 3 | [SPEC_PLAN](cadeiras/projeto/SPEC_PLAN.md) |

## 4. Progressão

Ponte → Python e álgebra linear → dados e probabilidade → avaliação de ML → gradientes e neurónios → texto → projeto. Introdução conceptual pode decorrer em paralelo. As páginas ligam pré-requisitos com identificadores estáveis. O [calendário](percurso.html) seleciona apenas parte das 38 aulas, deixando tempo para experimentar e rever.

Sessão: recuperar uma ideia sem notas, ler, refazer os exemplos, tentar exercícios, registar um erro. Revisão a 48 horas. Avançar quando pelo menos 2 de 3 exercícios forem resolvidos sem pistas e houver explicação do raciocínio. Diagnóstico de bases: 5 de 6 questões. Se falhar, trocar conteúdo novo por revisão, sem aumentar as horas silenciosamente.

## 5. Contrato de aula

1. Objetivo concreto e pré-requisitos ligados.
2. Intuição em linguagem simples antes da fórmula; significado da notação.
3. Dois exemplos resolvidos, com ligação natural a front-end, dados ou suporte.
4. Erro frequente e correção.
5. Código mínimo, executável ou explicitamente marcado como esquema/mock.
6. Três exercícios próprios: aplicar, consolidar e verificar; pista, validação e resolução.
7. Tarefa aberta de transferência e autoavaliação.
8. Fontes complementares oficiais.

A quantidade de exercícios foi adaptada à carga de 4 horas: este percurso não replica a regra de sete exercícios do repositório de matemática. A curva interativa de gradiente é um complemento; a explicação e os exercícios permanecem disponíveis sem JavaScript.

## 6. Arquitetura

- `index.html`: entrada leve e catálogo, sem aulas completas ou bundle de todo o curso.
- `cadeiras/<cadeira>/index.html`: visão da cadeira.
- `cadeiras/<cadeira>/modulo-N/index.html`: entrada do módulo.
- `cadeiras/<cadeira>/modulo-N/<id>.html`: um documento por aula.
- `content/*.mjs`: fontes originais; não são carregadas pelo navegador.
- `scripts/build.mjs`: gera HTML e planos, sem dependências externas.
- CSS/JS comuns pequenos; sem fontes remotas, analytics, backend ou bibliotecas no cliente.
- Progresso local com exportação/importação; sem login ou gamificação.
- GitHub Pages através de Actions, com todos os links relativos para funcionar na subpasta do repositório.

## 7. Critérios de aceitação e revisão

- 38 aulas introdutórias reais, 19 entradas de módulos, 9 planos (8 oficiais em título + ponte).
- 114 exercícios com resposta e resolução; 3 laboratórios; todos os destinos locais existentes.
- Índice abaixo de 16 KB e aula abaixo de 30 KB antes de compressão; sem conteúdo de outras aulas embutido.
- Layout adaptável, navegação por teclado, labels, status acessível e respeito por movimento reduzido.
- Build determinístico e validação de links, identificadores, contagens e cálculos essenciais.
- Não afirmar que foi feita inspeção visual em navegador quando só houve validação estrutural.

## 8. Aprofundamento durante a pós-graduação

Cada cadeira inclui temas AP1–AP4 **planeados, ainda não implementados como aulas HTML completas**. Ao receber a ficha oficial, mapear objetivos → pré-requisitos → aulas existentes → lacunas. Desenvolver as lacunas com conceitos, exemplos, prática e laboratório específicos. Os temas incluem inferência estatística, PCA, pandas, ensembles, CNN, transformers, cloud e defesa do projeto.

## 9. Estado desta versão

Implementação introdutória completa para o âmbito acima. Aprofundamento planeado separado. A publicação e os resultados de verificações são registados no README; a existência do workflow não prova, por si só, que o site já foi publicado.
