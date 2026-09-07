# Módulo 2 — Probabilidade e otimização

## Perfil e objetivo
Segundo módulo de Fundamentos Matemáticos para IA. Parte de percentagens, estatística descritiva e funções. O objetivo é interpretar incerteza e compreender como um parâmetro é atualizado para reduzir erro, sem tratar fórmulas como receitas desligadas do problema.

## Ritmo
Uma semana de 4 horas por aula: duas sessões de 60 minutos para conceitos e exemplos, mais duas horas para exercícios, código e repetição após 48 horas. M03 precede M04 porque a interpretação de previsões e erros precisa de grupos de referência claros.

## M03 — Probabilidade condicionada e Bayes
- Sequência: experiência/resultado/espaço amostral → acontecimentos → complemento/união/interseção → regras de probabilidade → condicionamento → tabela 2×2 → independência → probabilidade total → Bayes e frequência de base.
- Resultados: escrever o denominador antes da conta, distinguir `P(A|B)` de `P(B|A)`, calcular uma posterior e explicar o efeito de uma classe rara.
- Representações: diagrama de conjuntos e tabela de alertas, acompanhados por texto equivalente.
- Sete exercícios progressivos e código Python verificável.
- Aceitação: 6/7 sem pistas, incluindo uma condicionada, independência e Bayes; explicar falsos positivos em linguagem comum.
- Estado: publicada no commit `ea832d1` e confirmada no GitHub Pages.

## M04 — Derivadas e descida do gradiente
- Sequência: taxa média → limite e taxa instantânea → derivada → regras básicas → derivadas parciais/gradiente → função de perda → atualização → taxa de aprendizagem → convergência e validação numérica.
- Resultados: calcular derivadas simples, construir um gradiente e executar passos de descida explicando o sinal e o tamanho.
- Representação: curva interativa da perda já existente, acrescida de tabela de iterações e laboratório Python.
- Sete exercícios progressivos.
- Aceitação: 6/7 sem pistas e dois passos manuais confirmados pelo laboratório; reconhecer mínimo, gradiente zero e passo excessivo.
- Estado: conteúdo completo implementado e pronto para validação, commit e publicação próprios.

## Fecho do módulo
O módulo fica concluído quando M03 e M04 estiverem publicadas, cada uma com sete exercícios, código executável e verificação automatizada dos resultados. Antes de avançar, o aluno deverá explicar a diferença entre probabilidade condicionada e causalidade, calcular uma posterior a partir de contagens e narrar cada termo de uma atualização por descida do gradiente.

## Limites
M03 não ensina inferência estatística formal nem todos os modelos de distribuição. M04 introduz derivadas parciais e regra da cadeia apenas no necessário para compreender redes; provas formais de limites, Hessianas e otimizadores avançados ficam para aprofundamento.

## Entrega
Especificação → aula → revisão matemática e pedagógica → build/testes → commit → push → confirmação no GitHub Pages. Só depois começar a aula seguinte. Cada aula permanece num documento independente e os exemplos de IA identificam pressupostos e limites.
