import {add,n,choice} from './lessons.mjs';
add('programacao','P01',0,'De JavaScript para Python','Transformar dados com listas, dicionários e funções.','B05.',[
'Python usa indentação para definir blocos. Uma função começa com def. None representa ausência de valor; True e False têm maiúscula inicial. Usa == para comparar valores e is para identidade, como em x is None.',
'Listas são sequências mutáveis e dicionários associam chaves a valores. Uma list comprehension reúne transformação e filtro: [x*2 for x in xs if x>0]. A ligação a map e filter ajuda, mas usa um ciclo explícito quando tornar a intenção mais clara.',
'A divisão / produz uma divisão comum; // arredonda para baixo. Uma lista não é automaticamente um vetor numérico: [1,2]*2 repete os elementos. Vais distinguir listas de arrays na próxima aula.'
],'[expressão for elemento in coleção if condição]',
['Filtrar latências','xs=[80,120,200]. Queremos valores maiores que 100. O 80 fica de fora; 120 e 200 entram. Resultado: [120,200]. Média: (120+200)/2=160.'],
['Um registo','pedido={"categoria":"conta","ms":120}. pedido["ms"] dá 120. pedido.get("erro",False) dá False se a chave não existir. Um valor por defeito só serve se ausência significar realmente esse valor.'],
'Não uses is para comparar strings ou números; usa ==. Uma lista vazia exige cuidado antes de dividir pelo comprimento.',
'def media_lentos(valores):\n    lentos = [x for x in valores if x > 100]\n    return sum(lentos)/len(lentos) if lentos else None\n\nprint(media_lentos([80,120,200])) # 160.0',[
n('Quantos elementos ficam ao filtrar [1,2,3,4] por x>2?',2,'Conta 3 e 4.','Ficam [3,4], comprimento 2.'),n('Quanto é 7 // 2?',3,'Arredonda a divisão para baixo.','7/2=3,5; o piso é 3.'),choice('Como testar ausência de valor em Python?',['x is None','x === null'],0,'Usa o objeto de ausência de Python.','x is None é a comparação de identidade adequada.')],
'Reescreve um map/filter de JavaScript em Python e testa também uma lista vazia.');

add('programacao','P02',0,'NumPy: arrays, shapes e eixos','Fazer operações numéricas e verificar formas.','P01 e M02.',[
'NumPy oferece operações sobre arrays inteiros. np.array([1,2])*2 dá [2,4], ao contrário da repetição de listas. Um array tem tipo de dados e shape: inspeciona ambos quando um resultado surpreender.',
'Numa matriz, axis=0 agrega ao longo das linhas e deixa um resultado por coluna. axis=1 agrega ao longo das colunas e deixa um resultado por linha. Desenha uma tabela pequena para perceber a direção da agregação.',
'Broadcasting permite combinar certas dimensões diferentes. Subtrair duas médias a uma matriz de duas colunas aplica a operação em cada linha. Mas subtrair shape (n,) a (n,1) pode produzir (n,n), em vez de n erros. Verifica as formas, mesmo sem exceções.'
],'shape = dimensões; axis = eixo agregado',
['Médias por coluna','X=[[1,10],[3,30]]. Médias: (1+3)/2=2 e (10+30)/2=20. X.mean(axis=0) dá [2,20]. Por linha, dá [5,5;16,5].'],
['Centrar','Subtrai [2,20] a cada linha: [−1,−10] e [1,10]. As colunas ficam com média zero. Num modelo, aprende estas médias apenas no treino.'],
'Broadcasting pode esconder erros sem falhar. Confirma que previsões e alvos têm a mesma shape.',
'import numpy as np\nX = np.array([[1.,10.],[3.,30.]])\nmedia = X.mean(axis=0)\nprint(media) # [ 2. 20.]\nprint(X - media)',[
n('Quantos elementos tem shape (3,2)?',6,'Linhas vezes colunas.','3×2=6.'),n('Média da primeira coluna de [[2,10],[6,20]]?',4,'Usa 2 e 6.','(2+6)/2=4.'),choice('Operador de produto matricial?',['*','@'],1,'O asterisco atua por elemento.','@ faz o produto matricial.')],
'Cria uma matriz 3×2 e calcula médias por coluna. Confirma uma célula centrada à mão.');

add('programacao','P03',1,'Ler, validar e limpar dados','Definir um contrato antes de alimentar um modelo.','P01 e B04.',[
'CSV organiza linhas e colunas; JSON pode ter estruturas aninhadas. Ler um ficheiro não garante qualidade. Define campos, tipos, unidades, valores permitidos e o significado de ausente. Isto é semelhante a validar dados recebidos por uma API.',
'Uma latência negativa viola o nosso contrato. Um campo vazio não deve virar zero automaticamente: escolhe rejeitar, sinalizar ou preencher com uma regra justificada. Se a regra usa estatísticas como a mediana, aprende-as apenas no treino.',
'Duplicados podem colocar o mesmo exemplo no treino e no teste. Define a unidade independente: pedido, utilizador ou documento. Regista quantas linhas rejeitaste e porquê, para conseguires explicar o conjunto final.'
],'dados brutos → contrato → relatório de qualidade → dados utilizáveis',
['Valores recebidos','"120", "" e "−5": o primeiro converte para 120 ms; o segundo está ausente; o terceiro é inválido. Tens uma linha válida e duas rejeitadas. Converter tudo para zero esconderia o problema.'],
['Mesmo identificador','Dois registos têm id=42. Verifica se são cópias exatas ou eventos diferentes do mesmo pedido antes de eliminar um. A chave escolhida define o que conta como duplicado.'],
'Uma regra fixa de esquema é diferente de aprender uma estatística em todos os dados. Esta última pode revelar informação do teste.',
'import math\ndef validar_ms(texto):\n    try:\n        valor = float(texto)\n        return valor if math.isfinite(valor) and valor >= 0 else None\n    except (ValueError, TypeError):\n        return None\nprint([validar_ms(x) for x in ["120", "", "-5"]])',[
choice('Um campo vazio deve sempre tornar-se zero?',['Sim','Não'],1,'Ausência não é medição zero.','A regra depende do significado; zero inventaria uma medição.'),n('50 linhas menos 5 rejeitadas: quantas ficam?',45,'Subtrai as rejeições.','50−5=45.'),choice('Onde aprender a mediana para imputação?',['No treino','No treino e teste juntos'],0,'O teste imita dados não vistos.','Aprende no treino e aplica o valor guardado aos outros conjuntos.')],
'Testa a função com 0, valor vazio, negativo e texto inválido. Explica o resultado de cada caso.');

add('programacao','P04',1,'Experiências reproduzíveis','Separar dados e registar uma experiência.','P03.',[
'O treino ajusta parâmetros. A validação ajuda a escolher o modelo. O teste serve para uma avaliação final após as escolhas. Escolher repetidamente pelo teste adapta as decisões a esse conjunto e destrói a independência da avaliação.',
'Uma semente fixa controla parte da aleatoriedade. Regista também versões, dados, divisão, parâmetros e comandos: a seed não garante resultados idênticos em todas as máquinas. Um notebook deve executar de cima para baixo num kernel novo.',
'A divisão deve imitar o uso. Para prever o futuro, divide por tempo. Para prever novos utilizadores, evita o mesmo utilizador nos dois lados. Uma divisão aleatória por linha não serve para todas as situações.'
],'treino: ajustar → validação: escolher → teste: avaliar',
['Reservar dados','Com 100 observações independentes, podes usar 60 para treino, 20 para validação e 20 para teste. Não são percentagens obrigatórias: avalia dimensão e independência dos conjuntos.'],
['Uma coluna do futuro','Prevês urgência quando o pedido chega. "Tempo até resolução" só existe depois: não pode ser feature. Uma pontuação excelente com essa coluna não demonstra capacidade no momento real da previsão.'],
'Reproduzir uma fuga de informação continua a ser um erro. Seed fixa não corrige o desenho da experiência.',
'import random\nindices = list(range(10))\nrandom.Random(42).shuffle(indices)\ntreino, teste = indices[:8], indices[8:]\nassert set(treino).isdisjoint(teste)\nprint(treino, teste)',[
n('20% de 150 observações: quantas para teste?',30,'150×0,2.','150×0,2=30.'),choice('Escolher modelos repetidamente pelo teste final?',['Não','Sim'],0,'Usa o conjunto destinado a escolhas.','Escolhe na validação; reserva o teste.'),choice('Para prever o próximo mês:',['Treino no passado e teste depois','Misturar datas sem verificar'],0,'Imita a chegada dos dados.','A divisão temporal evita aprender com futuro, mas também tens de validar as features.')],
'Regista dados, divisão, seed, parâmetros, métrica e comando numa ficha de experiência.');
