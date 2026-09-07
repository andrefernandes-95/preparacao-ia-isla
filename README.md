# Caderno IA

Preparação para a pós-graduação em Inteligência Artificial do ISLA Gaia, adaptada a um programador front-end com bases de matemática a recuperar e **4 horas por semana**.

**Site:** [Caderno IA no GitHub Pages](https://andrefernandes-95.github.io/preparacao-ia-isla/) · **Repositório:** [preparacao-ia-isla](https://github.com/andrefernandes-95/preparacao-ia-isla)

- [Começar a estudar](index.html)
- [Plano de 8 semanas](percurso.html)
- [SPEC_PLAN geral e planos de cada cadeira](SPEC_PLAN.md)
- [Laboratórios Python](labs/README.md)

Inclui **38 aulas introdutórias**, **19 módulos**, **114 exercícios** e **8 planos de cadeira + ponte de bases**. Cada aula é um HTML separado. O índice contém apenas entradas e não carrega o curso completo.

Os títulos/ECTS seguem a [página do ISLA](https://www.islagaia.pt/pt/pos-graduacoes/inteligencia-artificial-pt), consultada em 7 de setembro de 2026. Os módulos e conteúdos são uma proposta independente, não o programa oficial detalhado. A página indica início previsto em **2 de outubro de 2026**; o plano mantém a meta pessoal de novembro e inclui prioridades para outubro.

## Executar localmente

Precisas de Node.js 20 ou superior. Não há dependências npm para instalar.

```sh
npm run build
npm test
npm start
```

Abre `http://127.0.0.1:4173`. O conteúdo também pode ser lido abrindo index.html diretamente, mas o progresso em URLs file: depende do navegador. Python é necessário apenas para os laboratórios.

## Editar

Edita `content/*.mjs` e volta a gerar. O build sobrescreve as páginas e os SPEC_PLAN de cadeira; evita editar diretamente esses ficheiros gerados. O plano geral e este README são mantidos manualmente. CSS e JS partilhados estão em `assets/`.

## GitHub Pages

O workflow `.github/workflows/pages.yml` gera, valida e publica uma seleção dos ficheiros estáticos em pushes para `main`. Em Settings → Pages, a origem deve ser **GitHub Actions**. A publicação precisa de Actions/Pages disponíveis na conta; verifica o resultado do workflow antes de partilhar o site.

O backend Python não corre no GitHub Pages. As aulas de integração identificam os exemplos simulados; uma API real exige alojamento separado. Não colocar segredos no front-end.

## Estado e limites

- Aulas introdutórias escritas e disponíveis; os aprofundamentos AP de cada plano ainda são propostas a desenvolver.
- Progresso apenas no navegador, exportável/importável em Sobre; não há conta, sincronização nem avaliação automática de domínio.
- Três exercícios por aula, com pistas e resoluções. No calendário há espaço para revisão e código.
- Dados sintéticos nos laboratórios: não provam eficácia de um produto real.
- Validação automatizada: build, ligações locais, anchors, tamanho das páginas, estrutura das aulas e cálculos de referência. Inspeção visual em navegador não incluída nesta validação.

Inspirado na abordagem pedagógica do [repositório de matemática](https://github.com/andrefernandes-95/matematica), com conteúdo original e arquitetura multipágina.
