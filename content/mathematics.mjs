import {add,n,choice} from './lessons.mjs';
add('matematica','M01',0,'Vetores e produto escalar','Representar observações e calcular uma previsão ponderada.','B02 e B03.',[
'Um vetor é uma lista ordenada de números. Uma página pode ser [imagens, scripts]. A ordem faz parte do significado: [3,2] e [2,3] descrevem páginas diferentes. Chamamos características ou features às medições de entrada de um modelo.',
'O produto escalar multiplica elementos correspondentes e soma os resultados. Se x contém características e w os custos por característica, w·x é uma combinação ponderada. Os vetores precisam do mesmo comprimento. O ponto significa esta operação e o resultado é um número.',
'A norma mede o comprimento: para [3,4], é √(3²+4²)=5. As escalas importam: comparar bytes e segundos sem preparação pode fazer os bytes dominar uma distância. O significado e as unidades importam tanto como a conta.'
],'w·x = w₁x₁ + w₂x₂; índice 1 = primeiro elemento',
['Prever uma página','x=[3 imagens,2 scripts], w=[20 ms/imagem,50 ms/script]. Multiplica: 3×20=60 ms e 2×50=100 ms. Soma: 160 ms. Com base b=40 ms, a previsão é 200 ms. É um modelo simplificado, não uma lei do navegador.'],
['Pontuar uma recomendação','Perfil [1,2] e item [3,1]: 1×3+2×1=5. Outro item [0,4] dá 8. O segundo tem maior pontuação neste modelo. Sem normalização, uma norma maior pode aumentar a pontuação sem maior semelhança de direção.'],
'[1,2]·[3,4] dá 11, um número. Multiplicação elemento a elemento dá [3,8], um vetor.',
'x = [3, 2]\nw = [20, 50]\nassert len(x) == len(w)\nprint(sum(a*b for a,b in zip(x,w)) + 40) # 200',[
n('Calcula [1,2]·[3,4].',11,'Multiplica por posição e soma.','1×3+2×4=3+8=11.'),n('Qual é a norma de [3,4]?',5,'Raiz da soma dos quadrados.','√(9+16)=√25=5.'),n('x=[2,1], w=[10,30], b=5. Qual é a previsão?',55,'Produto escalar mais a base.','2×10+1×30+5=55.')],
'Representa duas páginas com as mesmas características e calcula previsões. Explica as unidades dos pesos.');

add('matematica','M02',0,'Matrizes e dimensões','Organizar várias observações e verificar dimensões.','M01.',[
'Uma matriz é uma tabela retangular de números. Em aprendizagem, usamos frequentemente uma linha por observação e uma coluna por característica. Três páginas e duas características dão dimensão 3×2, também chamada shape.',
'Multiplicar X por um vetor w aplica o produto escalar de cada linha ao mesmo vetor. Se X tem n linhas e d colunas, w precisa de d elementos. A saída tem n previsões. Escrever as dimensões antes da conta evita muitos erros.',
'A transposta troca linhas por colunas: 3×2 passa a 2×3. Transpor não é inverter. O produto matricial não permite trocar livremente a ordem: AB e BA podem ter dimensões diferentes, ou um deles nem existir.'
],'X: n×d; w: d×1; Xw: n×1',
['Duas páginas','X tem linhas [1,2] e [3,0]; w=[10,20]. Primeira previsão: 1×10+2×20=50. Segunda: 3×10+0×20=30. A saída é [50,30]. Somar b=5 a cada elemento dá [55,35].'],
['Dimensões primeiro','(4×3) vezes (3×2) é possível: as dimensões interiores coincidem. O resultado tem as exteriores, 4×2. (4×3) vezes (4×2) não é possível nesta ordem.'],
'Em NumPy, * multiplica elementos e @ faz produto matricial. Uma operação pode executar e representar a conta errada.',
'import numpy as np\nX = np.array([[1,2],[3,0]])\nw = np.array([10,20])\nprint(X.shape) # (2, 2)\nprint(X @ w + 5) # [55 35]',[
n('12 páginas e 3 características: quantas linhas?',12,'Uma linha por página.','São 12 linhas e 3 colunas.'),n('Quantas colunas tem (4×3) @ (3×2)?',2,'Dimensões exteriores.','A saída é 4×2, com 2 colunas.'),n('Calcula [2,1]·[3,5].',11,'Multiplica e soma.','2×3+1×5=11.')],
'Desenha uma matriz 3×2 e anota as dimensões antes e depois de multiplicar por dois pesos.');

add('matematica','M03',1,'Probabilidade condicionada e Bayes','Escolher o denominador certo ao interpretar previsões.','B01 e B04.',[
'Uma probabilidade está entre 0 e 1 e quantifica incerteza num modelo. Nas frequências observadas, divide os casos de interesse pelo total relevante. “Entre os pedidos com alerta” muda o denominador: deixas de considerar todos os pedidos.',
'P(A|B) lê-se probabilidade de A sabendo B: a fração dos casos B que também são A. Calcula-se por P(A e B)/P(B), se P(B)>0. P(A|B) normalmente não é P(B|A). Os grupos de referência são diferentes.',
'Bayes relaciona as direções: P(A|B)=P(B|A)P(A)/P(B). A frequência de base P(A) importa. Se observar B não muda a probabilidade de A, os eventos são independentes: P(A|B)=P(A), quando definida. Independência não significa que nunca acontecem juntos.'
],'P(A|B) = P(A e B) / P(B)',
['Alertas de urgência','Há 100 pedidos: 10 urgentes e 90 normais. O sistema alerta em 8 urgentes e 18 normais: 26 alertas. Entre alertas, 8/26≈30,77% são urgentes. Entre urgentes, 8/10=80% são detetados. São perguntas diferentes.'],
['Conversões','Em 20 visitas móveis, 5 convertem. Em 80 desktop, 8 convertem. P(conversão|móvel)=5/20=0,25. P(móvel|conversão)=5/13≈0,385. O primeiro denominador conta móveis; o segundo conta conversões.'],
'Detetar 80% dos urgentes não significa que 80% dos alertas sejam urgentes. Escreve o denominador.',
'detetados = 8\nalertas = 8 + 18\nprint(detetados / alertas) # ~0.3077',[
n('10 conversões em 40 móveis: P(conversão|móvel), em decimal?',0.25,'O grupo de referência tem 40 elementos.','10/40=0,25.'),n('3 alertas corretos em 12: que percentagem é correta?',25,'Divide e multiplica por 100.','3/12=0,25=25%.'),choice('P(A|B) é sempre P(B|A)?',['Sim','Não'],1,'Compara os denominadores.','Não: condicionam em grupos diferentes, embora possam coincidir em casos particulares.')],
'Cria uma tabela com alertas e casos reais. Calcula deteção dos urgentes e proporção de alertas corretos.');

add('matematica','M04',1,'Derivadas e descida do gradiente','Dar um passo que reduz uma função de erro.','B03 e B02.',[
'A derivada mede como a saída muda localmente quando alteras um pouco a entrada. Numa reta é o declive constante; numa curva depende do ponto. Para f(w)=w², a derivada é f′(w)=2w. O símbolo linha indica derivada.',
'Uma perda mede o erro de uma previsão. Usa L(w)=(w−3)²: o ideal é w=3. A derivada L′(w)=2(w−3) indica em que direção a perda cresce. Para reduzir a perda, andamos na direção oposta.',
'A taxa de aprendizagem α controla o tamanho do passo: w novo = w−αL′(w). Uma taxa demasiado grande pode aumentar a perda. Em várias dimensões, o gradiente reúne as derivadas parciais de todos os parâmetros; atualizamos cada parâmetro pela mesma regra.'
],'w novo = w atual − α × L′(w atual)',
['Um passo','w=0, α=0,1. Derivada: 2(0−3)=−6. Novo w: 0−0,1×(−6)=0,6. Perda inicial: 9. Nova perda: (0,6−3)²=5,76. O parâmetro aumentou porque o gradiente era negativo.'],
['Passo excessivo','Com α=2 no mesmo ponto, w novo=0−2×(−6)=12. A perda passa de 9 para (12−3)²=81. Uma direção adequada com um passo excessivo não garante melhoria.'],
'Não subtraias a perda ao peso; subtrai a taxa multiplicada pela derivada. São quantidades diferentes.',
'w = 0.0\nfor _ in range(10):\n    w = w - 0.1 * 2 * (w - 3)\nprint(round(w, 3)) # 2.678',[
n('Derivada de w² em w=4?',8,'A derivada é 2w.','2×4=8.'),n('w=1, gradiente=−4, α=0,1. Novo w?',1.4,'Subtrair um negativo aumenta o valor.','1−0,1×(−4)=1,4.'),n('Perda (w−3)² em w=2?',1,'Substitui w.','(2−3)²=1.')],
'Faz dois passos à mão começando em 0 com α=0,1. Compara as perdas antes de executar código.');
