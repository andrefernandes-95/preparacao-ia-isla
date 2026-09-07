import {add,n,choice} from './lessons.mjs';
add('introducao','I01',0,'O que é aprender a partir de dados?','Distinguir regras explícitas de parâmetros aprendidos.','B03.',[
'Num programa tradicional, escreves a regra que transforma a entrada na saída. Num sistema de aprendizagem, escolhes uma família de regras e um processo ajusta os parâmetros usando exemplos. Continuas a programar: defines dados, objetivo, avaliação e integração.',
'Inteligência Artificial é um campo mais amplo do que Machine Learning. Inclui métodos de procura e representação de conhecimento. Deep Learning é uma família de Machine Learning baseada em redes com várias camadas. Um modelo de linguagem é um tipo de modelo; não representa toda a IA.',
'Treinar é ajustar com exemplos. Inferir é usar os parâmetros já ajustados numa nova entrada. Uma resposta plausível não comprova que o sistema aprendeu uma regra robusta; precisamos de avaliar casos que não foram usados para escolher a solução.'
],'dados + objetivo + algoritmo de treino → parâmetros → previsões',
['Formulário','Validar que um email tem um campo obrigatório é uma regra estável. Classificar a intenção de milhares de mensagens pode beneficiar de exemplos rotulados. Não precisas de aprendizagem para uma regra simples e explícita.'],
['Latência','y=20x+100 tem pesos definidos manualmente. Ajustar 20 e 100 a medições é aprendizagem. Calcular y para uma página nova é inferência, sem novo treino.'],
'Automatização não implica aprendizagem. E gerar texto correto num exemplo não é garantia para todos os casos.',
'def inferir(imagens, peso=20, base=100):\n    return peso * imagens + base\nprint(inferir(3)) # 160',[
choice('Aplicar pesos já ajustados a um pedido novo é:',['Treino','Inferência'],1,'Os parâmetros não estão a mudar.','É inferência: usar o modelo já ajustado.'),choice('Validar um campo obrigatório exige ML?',['Não','Sim'],0,'A regra já é conhecida.','Uma regra explícita resolve o problema de forma direta.'),n('Em y=2x+1, qual é a saída para x=3?',7,'Substitui x.','2×3+1=7.')],
'Escolhe três tarefas do teu trabalho e justifica quais resolverias com regras e quais poderiam beneficiar de dados.');

add('introducao','I02',0,'Supervisão, grupos e recompensas','Escolher um paradigma a partir da informação disponível.','I01.',[
'Na aprendizagem supervisionada, cada exemplo tem entradas e um alvo conhecido. Prever um número é regressão; prever uma categoria é classificação. O alvo tem de corresponder ao que queres prever e estar disponível para os exemplos de treino.',
'Na aprendizagem não supervisionada, procuramos estrutura sem alvos fornecidos. Agrupar sessões por comportamento é clustering. Os grupos encontrados não têm automaticamente significado comercial: tens de os examinar e validar.',
'Na aprendizagem por reforço, um agente escolhe ações num ambiente e recebe recompensas. Importam consequências ao longo do tempo. Não é simplesmente “dar feedback a um chatbot”: envolve uma formulação com estados, ações, transições e objetivo acumulado.'
],'alvo numérico → regressão; categoria → classificação; sem alvo → explorar estrutura',
['Pedidos de suporte','Mensagens com categorias anotadas permitem classificação supervisionada. Mensagens sem categorias podem ser agrupadas para descobrir temas, mas os grupos não substituem uma taxonomia validada.'],
['Otimizar uma sequência','Um agente num jogo escolhe mover ou esperar e recebe uma recompensa ao atingir o objetivo. Ações alteram o estado seguinte, por isso maximizar só a recompensa imediata pode falhar.'],
'Uma categoria codificada como 0,1,2 continua a ser uma categoria. Os números não a transformam num alvo de regressão.',
'exemplo = {"texto": "Não consigo entrar", "alvo": "conta"}\nprint(exemplo["alvo"])',[
choice('Prever tempo de carregamento é:',['Regressão','Classificação'],0,'A saída é uma quantidade numérica.','É regressão, pois prevês uma duração.'),choice('Agrupar mensagens sem categorias dadas é:',['Clustering','Classificação supervisionada'],0,'Faltam alvos anotados.','Clustering procura estrutura sem categorias de treino fornecidas.'),choice('Categoria 0,1,2 deve ser tratada sempre como quantidade?',['Não','Sim'],0,'Os números podem ser apenas nomes.','A codificação não implica distância ou ordem entre categorias.')],
'Formula uma tarefa de cada paradigma usando exemplos do teu trabalho. Identifica entradas e informação de aprendizagem.');

add('introducao','I03',1,'Procura: estados, ações e caminhos','Descrever uma procura em largura num grafo pequeno.','Listas e ciclos.',[
'Um estado descreve a situação atual; uma ação leva a outro estado. Um grafo representa estados como nós e transições como ligações. Procurar uma solução é encontrar um caminho do início ao objetivo.',
'A procura em largura, BFS, visita primeiro os estados a uma ligação, depois os a duas e assim por diante. Usa uma fila: o primeiro elemento inserido é o primeiro a sair. Registar visitados evita repetir ciclos.',
'Quando todas as ligações têm o mesmo custo, BFS encontra um caminho com o menor número de ligações. Se os custos forem diferentes, menos ligações pode sair mais caro. Nesse caso precisas de um método que considere custos, como procura de custo uniforme.'
],'fila FIFO: entra no fim, sai no início',
['Navegação','A liga a B e C; B liga a D; C liga a E. A fila começa [A]. Depois de visitar A, fica [B,C]. Visitamos B e juntamos D: [C,D]. Visitamos C e juntamos E: [D,E]. D está a duas ligações de A.'],
['Custos diferentes','A→D custa 10. A→B custa 1 e B→D custa 1. O caminho direto tem uma ligação, mas custa 10. O caminho de duas ligações custa 2. BFS minimiza ligações, não este custo.'],
'Sem conjunto de visitados, A→B→A pode repetir para sempre. A estrutura de dados faz parte do algoritmo.',
'from collections import deque\ng = {"A":["B","C"], "B":["D"], "C":[], "D":[]}\nfila, vistos = deque(["A"]), {"A"}\nwhile fila:\n    atual = fila.popleft()\n    print(atual)\n    for vizinho in g[atual]:\n        if vizinho not in vistos:\n            vistos.add(vizinho)\n            fila.append(vizinho)',[
n('No exemplo A→B→D, quantas ligações há de A até D?',2,'Conta as transições.','A→B e B→D são duas.'),choice('BFS usa normalmente:',['Fila','Pilha'],0,'Visita o que chegou primeiro.','Uma fila FIFO mantém a ordem por profundidade.'),choice('BFS garante menor custo com custos arbitrários?',['Não','Sim'],0,'Menos passos pode custar mais.','A garantia de menor número de passos só equivale a menor custo quando os custos são iguais.')],
'Desenha cinco estados com um ciclo e executa BFS à mão, registando a fila em cada passo.');

add('introducao','I04',1,'Riscos, enviesamento e decisões humanas','Avaliar quem pode ser prejudicado por um erro.','I02 e B01.',[
'Um modelo aprende padrões dos dados, incluindo falhas de recolha e decisões históricas. Enviesamento pode surgir porque certos grupos quase não aparecem, porque os rótulos são inconsistentes ou porque o objetivo mede mal a utilidade pretendida.',
'Uma média global pode esconder um segmento com desempenho fraco. Mede erros em grupos relevantes quando os dados e o contexto o permitem. Uma métrica não resolve sozinha decisões de equidade: é preciso explicitar o dano e os compromissos.',
'Define o que acontece quando o modelo falha: revisão humana, possibilidade de corrigir, alternativa manual e registo do incidente. Recolhe apenas os dados necessários. Esta aula é de desenho responsável; os requisitos legais concretos precisam de confirmação nas fontes aplicáveis ao projeto.'
],'risco = tipo de erro + pessoas afetadas + consequência + possibilidade de correção',
['Suporte em português','Um classificador funciona bem em mensagens formais e mal com abreviaturas. Se só medires a média, podes não ver a falha. Cria um conjunto com ambos os estilos e revê exemplos incorretos.'],
['Automatizar uma resposta','Sugerir uma categoria permite correção antes da ação. Encerrar automaticamente um pedido errado pode impedir apoio. A mesma precisão tem consequências diferentes conforme a ação do produto.'],
'Um humano no processo não garante segurança se não tiver tempo, informação ou autoridade para discordar.',
'erros = {"formal": (2, 20), "abreviado": (8, 20)}\nfor grupo, (falhas, total) in erros.items():\n    print(grupo, falhas / total)',[
n('8 erros em 20 mensagens: taxa de erro em percentagem?',40,'Divide e converte.','8/20×100=40%.'),choice('Boa média global prova bom desempenho em todos os grupos?',['Não','Sim'],0,'As médias agregam situações diferentes.','É necessário examinar segmentos e amostras suficientes.'),choice('Uma revisão humana útil precisa de possibilidade de discordar?',['Sim','Não'],0,'Revisão sem autoridade é só uma formalidade.','O revisor precisa de contexto, tempo e capacidade de corrigir.')],
'Escreve dois erros possíveis no assistente de suporte, as consequências e uma medida concreta de mitigação.');

add('machine-learning','ML01',0,'Regressão e referência simples','Comparar previsões numéricas com uma referência.','M01, B04 e P04.',[
'Uma regressão prevê uma quantidade. Antes de escolher um modelo complexo, define uma referência simples: por exemplo, prever sempre a média dos alvos de treino. O modelo deve demonstrar uma melhoria útil sobre essa referência em dados separados.',
'O erro assinado é previsão menos observado. O MAE é a média dos erros absolutos, nas unidades do alvo. O MSE faz a média dos quadrados e penaliza mais erros grandes; as unidades ficam ao quadrado.',
'A referência também aprende algo: a média tem de vir do treino. Um resultado melhor num teste minúsculo pode depender do acaso. Olha para exemplos, tamanho da amostra e relevância da diferença.'
],'MAE = soma de |previsão − observado| / n',
['Latências','Reais [100,200], previsões [120,170]. Erros [20,−30]. Absolutos [20,30]. MAE=(20+30)/2=25 ms. MSE=(400+900)/2=650 ms².'],
['Comparação','Uma referência prevê 150 para ambos os casos: erros absolutos 50 e 50, MAE=50 ms. O modelo anterior tem MAE=25 ms, metade neste conjunto. Ainda precisas de mais exemplos para uma conclusão robusta.'],
'A média dos erros assinados pode cancelar erros opostos e parecer excelente. Usa a métrica definida pelo objetivo.',
'reais = [100,200]\nprevistos = [120,170]\nmae = sum(abs(p-y) for p,y in zip(previstos,reais))/len(reais)\nprint(mae) # 25.0',[
n('MAE para reais [2,4] e previsões [3,2]?',1.5,'Erros absolutos 1 e 2.','(1+2)/2=1,5.'),n('MSE para os mesmos valores?',2.5,'Eleva os erros ao quadrado.','(1²+2²)/2=2,5.'),choice('A média da referência vem de:',['Treino','Teste'],0,'Não aprendas com o teste.','Calcula a média no treino e mantém-na fixa na avaliação.')],
'Calcula MAE de uma referência e de um modelo em cinco casos. Lista o pior erro e o seu contexto.');

add('machine-learning','ML02',0,'Classificação e matriz de confusão','Calcular precisão e sensibilidade sem trocar denominadores.','M03 e I02.',[
'Na classificação binária escolhes uma classe positiva, por exemplo “urgente”. Verdadeiro positivo (TP) é um urgente detetado; falso positivo (FP), um normal marcado urgente; falso negativo (FN), um urgente ignorado; verdadeiro negativo (TN), um normal corretamente descartado.',
'Precisão é TP/(TP+FP): entre os alertas, quantos estavam certos? Sensibilidade ou recall é TP/(TP+FN): entre os urgentes reais, quantos detetámos? Accuracy é (TP+TN)/total e pode esconder falhas quando uma classe é rara.',
'Um limiar transforma uma pontuação numa decisão. Baixar o limiar tende a criar mais positivos: pode aumentar recall e falsos positivos. Escolhe o limiar na validação, de acordo com as consequências, e verifica depois no teste. Uma pontuação não é automaticamente uma probabilidade calibrada.'
],'precisão = TP/(TP+FP); recall = TP/(TP+FN)',
['Urgências','TP=8, FP=2, FN=4, TN=86. Precisão=8/10=80%. Recall=8/12≈66,67%. Accuracy=94/100=94%. O valor de 94% esconde que falhámos um terço dos urgentes.'],
['Classe rara','Há 99 normais e 1 urgente. Dizer sempre normal dá accuracy de 99% e recall urgente de 0%. A referência revela por que accuracy sozinha é insuficiente.'],
'“Precisão” aqui é a métrica precision, não um sinónimo de accuracy. Se um denominador for zero, a métrica precisa de uma convenção explícita.',
'tp, fp, fn, tn = 8, 2, 4, 86\nprint(tp / (tp + fp)) # 0.8\nprint(tp / (tp + fn)) # ~0.6667',[
n('TP=6 e FP=4. Precisão em percentagem?',60,'Denominador: todos os alertas.','6/(6+4)=60%.'),n('TP=6 e FN=2. Recall em percentagem?',75,'Denominador: positivos reais.','6/(6+2)=75%.'),choice('Onde escolher o limiar?',['Validação','Teste final repetidamente'],0,'O limiar é uma escolha de modelo.','Escolhe na validação e avalia a decisão final no teste.')],
'Desenha uma matriz 2×2 e calcula as três métricas. Explica qual priorizarias para não perder pedidos urgentes.');

add('machine-learning','ML03',1,'Sobreajustamento e validação','Reconhecer memorização e impedir fuga de informação.','P04 e ML01.',[
'Sobreajustamento ocorre quando o modelo se adapta a pormenores do treino que não generalizam. Erro baixo no treino e alto na validação é um sinal. Subajustamento significa que o modelo nem representa bem os padrões úteis do treino.',
'Regularização limita a complexidade ou penaliza parâmetros, reduzindo a tendência para ajustar ruído. Não substitui dados adequados. Na validação cruzada, repetes treino e avaliação com partições diferentes do conjunto de desenvolvimento; o teste final continua reservado.',
'Transformações que aprendem estatísticas, como normalização e vocabulário, devem ser ajustadas dentro de cada divisão de treino. Um pipeline ajuda a manter transformação e modelo juntos, reduzindo o risco de aprender com a partição avaliada.'
],'treino bom + validação fraca → investigar sobreajustamento, divisão e mudança dos dados',
['Uma árvore memoriza','Árvore A: accuracy treino 100%, validação 65%. Árvore B: treino 85%, validação 80%. A melhor opção inicial é B, segundo a validação, mesmo sem treino perfeito. Confirma também a métrica relevante.'],
['Normalização com fuga','Calcular média em treino+teste deixa o teste influenciar a transformação. Ajusta a média apenas no treino e usa-a sem reaprender ao transformar validação e teste.'],
'Repetir centenas de escolhas na mesma validação também pode adaptar as decisões a ela. Regista experiências e limita conclusões.',
'from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodelo = make_pipeline(StandardScaler(), LogisticRegression())\n# modelo.fit(X_treino, y_treino)\n# modelo.predict(X_teste)',[
choice('Treino 100%, validação 60% sugere:',['Possível sobreajustamento','Sucesso garantido'],0,'Compara visto e não visto.','O desfasamento exige investigação; treino perfeito não prova generalização.'),n('5 partições, 100 linhas igualmente distribuídas: quantas por partição?',20,'Divide 100 por 5.','100/5=20.'),choice('Ajustar scaler antes da validação cruzada é adequado?',['Não, ajustar em cada treino','Sim, sempre'],0,'As médias podem usar a partição avaliada.','O scaler deve ser aprendido apenas na parte de treino de cada iteração.')],
'Escreve uma lista das transformações que aprendem estatísticas e indica em que dados podem ser ajustadas.');

add('machine-learning','ML04',1,'Clustering e distância','Atribuir pontos a centros e questionar o significado dos grupos.','M01 e B04.',[
'Clustering agrupa observações por uma noção de proximidade. No k-means, escolhes k centros, atribuis cada ponto ao centro mais próximo e recalculas cada centro como a média dos pontos atribuídos. Repetes até estabilizar segundo um critério.',
'A escala muda distâncias. Se uma característica mede bytes e outra conta cliques, a primeira pode dominar. Normalização exige reflexão sobre o significado: não é uma correção automática de qualquer representação.',
'Os grupos encontrados não são rótulos verdadeiros. Escolher k, a representação e a distância muda o resultado. K-means favorece grupos compatíveis com a distância euclidiana e pode sofrer com valores extremos ou formas complexas.'
],'atribuir ao centro mais próximo → recalcular médias → repetir',
['Uma dimensão','Pontos [1,2,8,9], centros 1 e 9. 1 e 2 ficam com o primeiro; 8 e 9 com o segundo. Novos centros: (1+2)/2=1,5 e (8+9)/2=8,5. A atribuição mantém-se.'],
['Sessões','Um grupo com muitos cliques pode significar interesse ou dificuldade em encontrar algo. A conta não escolhe entre interpretações: examina sessões e cruza com informação pertinente.'],
'Não chames automaticamente “bons clientes” a um grupo numerado 0. Os números dos grupos são arbitrários.',
'pontos = [1,2,8,9]\ncentros = [1,9]\ngrupos = [min(range(2), key=lambda i: abs(x-centros[i])) for x in pontos]\nprint(grupos) # [0,0,1,1]',[
n('Média dos pontos 2 e 6, novo centro?',4,'Soma e divide.','(2+6)/2=4.'),n('Distância em linha entre 3 e 8?',5,'Valor absoluto da diferença.','|3−8|=5.'),choice('O número do grupo define qualidade?',['Não','Sim'],0,'É apenas um identificador.','O significado requer interpretação e validação externa.')],
'Agrupa seis números com dois centros à mão e descreve uma situação em que o agrupamento não seria útil.');
