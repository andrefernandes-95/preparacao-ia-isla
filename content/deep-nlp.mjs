import {add,n,choice} from './lessons.mjs';
add('deep-learning','D01',0,'Um neurónio explicado à mão','Calcular uma soma ponderada e uma ativação.','M01 e ML01.',[
'Um neurónio artificial recebe números, multiplica cada um por um peso, soma e acrescenta um viés. Esta primeira parte já conheces do modelo linear. A ativação aplica uma função ao resultado, permitindo construir relações não lineares.',
'ReLU devolve o maior valor entre zero e a entrada: ReLU(z)=max(0,z). Valores negativos tornam-se zero; positivos mantêm-se. Sem ativações não lineares, empilhar camadas lineares continua a representar uma transformação linear ou afim.',
'Uma camada pode ter vários neurónios que observam a mesma entrada com pesos diferentes. A saída de uma camada torna-se a entrada da seguinte. Estes números intermédios não têm necessariamente um significado humano simples.'
],'z = w·x + b; saída = ReLU(z) = max(0,z)',
['Ativar uma característica','x=[2,1], w=[3,−1], b=−2. Produtos: 6 e −1. Soma e viés: 6−1−2=3. ReLU(3)=3.'],
['Desativar','Com x=[0,2] e os mesmos pesos: 0−2−2=−4. ReLU(−4)=0. A ativação introduz uma mudança que uma única reta não representa.'],
'Um neurónio artificial é uma ferramenta matemática, não uma simulação completa de um neurónio biológico.',
'def neuronio(x, w, b):\n    z = sum(a*c for a,c in zip(x,w)) + b\n    return max(0, z)\nprint(neuronio([2,1], [3,-1], -2)) # 3',[
n('Quanto é ReLU(−5)?',0,'Escolhe o maior entre zero e −5.','max(0,−5)=0.'),n('Quanto é ReLU(4)?',4,'Valores positivos mantêm-se.','max(0,4)=4.'),n('x=[1,2], w=[2,3], b=−1. Saída ReLU?',7,'Primeiro soma ponderada.','2+6−1=7, e ReLU(7)=7.')],
'Calcula dois neurónios com a mesma entrada e pesos diferentes. Organiza as duas saídas num vetor.');

add('deep-learning','D02',0,'Gradientes e regra da cadeia','Relacionar perda, previsão e atualização de peso.','M04 e D01.',[
'Backpropagation calcula como cada parâmetro influencia a perda, percorrendo as operações na ordem inversa. A regra da cadeia multiplica sensibilidades locais. Se uma alteração do peso muda a previsão, e a previsão muda a perda, combinamos as duas relações.',
'Para previsão p=wx e perda L=(p−y)², temos dL/dp=2(p−y) e dp/dw=x. Portanto dL/dw=2(p−y)x. O símbolo dL/dw significa taxa de mudança da perda em relação ao peso; y é o alvo observado.',
'Ferramentas como PyTorch constroem um grafo das operações e calculam gradientes automaticamente. Isto poupa contas, mas não escolhe a perda nem corrige shapes erradas. É útil verificar um caso mínimo à mão antes do treino completo.'
],'dL/dw = dL/dp × dp/dw = 2(p−y) × x',
['Do peso à perda','x=2, y=6, w=1. Previsão p=2. Erro p−y=−4. Perda=16. dL/dp=−8; dp/dw=2. Gradiente=−16. Com taxa 0,1, novo w=1−0,1×(−16)=2,6.'],
['Verificar a melhoria','Com w=2,6, p=5,2. Erro=−0,8 e perda=0,64, abaixo de 16. Isto confirma esta atualização; outras taxas podem falhar.'],
'Em PyTorch os gradientes acumulam por defeito. Limpa-os entre atualizações quando não pretendes acumulação.',
'import torch\nw = torch.tensor(1.0, requires_grad=True)\np = w * 2\nloss = (p - 6) ** 2\nloss.backward()\nprint(w.grad.item()) # -16.0',[
n('p=2, y=6. Qual é 2(p−y)?',-8,'Subtrai primeiro.','2×(2−6)=−8.'),n('Se dL/dp=−8 e dp/dw=2, qual é dL/dw?',-16,'Multiplica sensibilidades.','−8×2=−16.'),n('w=1, taxa=0,1, gradiente=−16. Novo peso?',2.6,'Subtrai taxa vezes gradiente.','1−0,1×(−16)=2,6.')],
'Repete o cálculo para x=1, y=3, w=0. Confirma gradiente e atualização com código.');

add('deep-learning','D03',1,'O ciclo de treino','Ordenar previsão, perda, gradiente e atualização.','D02 e P04.',[
'Uma época é uma passagem pelo conjunto de treino. Um batch é um grupo de exemplos usado numa atualização. Com 100 exemplos e batches de 20, há cinco atualizações por época, assumindo uma passagem sem descarte.',
'O ciclo normal limpa gradientes, calcula previsões, calcula perda, executa backward e atualiza parâmetros. Na avaliação, não atualizes pesos. model.eval() altera o comportamento de camadas como dropout; no_grad() desativa o registo para gradientes. São funções diferentes.',
'Regista perda de treino e validação. Se o treino melhora e a validação piora, considera sobreajustamento. Escolhe o momento de parar pela validação. Não uses o teste final para escolher o número de épocas.'
],'zero_grad → forward → loss → backward → step',
['Contar atualizações','120 exemplos em batches de 30: 120/30=4 passos por época. Em 10 épocas, são 40 atualizações. Não são 1200 atualizações.'],
['Escolher checkpoint','Perda de validação nas épocas 1,2,3: 0,8;0,5;0,7. O melhor checkpoint segundo esta perda é o da época 2, mesmo que o treino continue a melhorar na 3.'],
'model.eval() não impede, sozinho, calcular gradientes. E no_grad() não muda sozinho o modo de dropout.',
'# Esquema: modelo, otimizador, loss_fn, X e y já definidos.\n# modelo.train()\n# otimizador.zero_grad()\n# perda = loss_fn(modelo(X), y)\n# perda.backward()\n# otimizador.step()',[
n('100 exemplos, batch 20: passos por época?',5,'Divide exemplos por batch.','100/20=5.'),choice('Quando executar backward?',['Depois de calcular a perda','Antes das previsões'],0,'É preciso um grafo e uma perda.','Backward calcula gradientes da perda já calculada.'),choice('Escolher épocas pelo teste final?',['Não','Sim'],0,'É uma escolha de treino.','Usa validação para escolher e preserva o teste.')],
'Executa o laboratório de rede em CPU e identifica as cinco operações do ciclo. Regista a perda inicial e final.');

add('deep-learning','D04',1,'Arquiteturas e transferência','Relacionar a estrutura dos dados com a rede escolhida.','D01 e D03.',[
'Uma rede densa liga cada entrada a cada neurónio da camada seguinte. Uma CNN aplica filtros locais partilhados, úteis em imagens: o mesmo filtro procura um padrão em posições diferentes. Não precisas de um peso independente para cada posição.',
'Modelos de sequência lidam com ordem. Redes recorrentes transportam estado ao longo da sequência. Transformers usam atenção para combinar informação de posições diferentes; isso não significa que cada peso de atenção seja uma explicação completa da decisão.',
'Transfer learning reutiliza parâmetros aprendidos noutros dados. Podes congelar a base e treinar uma cabeça pequena, ou ajustar parte do modelo. Verifica compatibilidade dos dados, pré-processamento e recursos. Começa com uma referência simples antes de assumir que uma rede grande é necessária.'
],'dados e objetivo → referência simples → arquitetura → comparação',
['Parâmetros densos','Uma camada de 3 entradas e 2 neurónios tem 3×2=6 pesos e 2 vieses: 8 parâmetros. Aumentar dimensões aumenta memória e dados necessários para treinar de forma útil.'],
['Reutilizar visão','Uma base treinada para imagens fornece características. Congelas essa base e treinas uma pequena cabeça para as tuas categorias. O teste deve incluir imagens do contexto real; transferência não garante adequação.'],
'Escolher a maior rede pode aumentar custo e sobreajustamento. Compara no mesmo conjunto e com a mesma métrica.',
'entradas, saidas = 3, 2\nparametros = entradas * saidas + saidas\nprint(parametros) # 8',[
n('Camada densa de 4 entradas e 3 saídas, com viés: parâmetros?',15,'Pesos mais um viés por saída.','4×3+3=15.'),choice('Uma CNN partilha filtros entre posições?',['Sim','Não'],0,'O mesmo padrão pode aparecer em locais diferentes.','A partilha é uma propriedade central da convolução.'),choice('Congelar uma base significa:',['Não atualizar os seus pesos','Apagar os pesos'],0,'Reutilizas o que foi aprendido.','Os parâmetros são mantidos durante esse treino.')],
'Escolhe uma arquitetura para texto, imagem e dados tabulares e justifica também uma referência mais simples.');

add('nlp','N01',0,'Texto, tokens e vocabulário','Converter texto numa representação numérica simples.','P01 e M01.',[
'Um modelo precisa de números. Tokenização divide texto em unidades, que podem ser palavras, partes de palavras ou caracteres. Um token não é sempre uma palavra; modelos diferentes podem segmentar o mesmo texto de forma diferente.',
'Uma representação bag-of-words conta ocorrências num vocabulário fixo. A posição de cada termo no vetor tem de ser consistente. Esta representação perde a ordem, mas permite construir uma referência útil e compreensível.',
'Normalizar texto exige cuidado. Minúsculas podem ajudar; remover “não” pode inverter o sentido. Aprende vocabulário apenas no treino. Textos novos podem ter termos desconhecidos, e deves saber como a representação os trata.'
],'texto → tokens → posições no vocabulário → vetor',
['Contar termos','Vocabulário [erro,conta,pagamento]. “erro conta erro” torna-se [2,1,0]. O vetor mantém sempre a mesma ordem, mesmo quando um termo não aparece.'],
['Perder ordem','“não funciona” e “funciona não” têm as mesmas contagens. Bag-of-words não distingue ordem. Usar pares de termos, chamados bigramas, pode conservar alguma informação local.'],
'Não assumes que dividir por espaços reproduz a tokenização de um modelo de linguagem; aqui é apenas uma demonstração simples.',
'vocabulario = ["erro", "conta", "pagamento"]\ntokens = "erro conta erro".split()\nvetor = [tokens.count(t) for t in vocabulario]\nprint(vetor) # [2,1,0]',[
n('Quantas ocorrências de erro há em “erro conta erro”?',2,'Conta as repetições.','O termo aparece duas vezes.'),n('Vocabulário com 7 termos: dimensão do vetor de contagens?',7,'Uma posição por termo.','São 7 posições.'),choice('Remover “não” é sempre seguro?',['Não','Sim'],0,'A negação pode definir a intenção.','Pode inverter o significado e prejudicar a classificação.')],
'Cria um vocabulário de cinco termos e representa três mensagens. Inclui uma negação e um termo desconhecido.');

add('nlp','N02',0,'Classificar texto com uma referência','Treinar representação e classificador sem fuga de dados.','N01 e ML02–ML03.',[
'TF-IDF pondera frequência local de termos e reduz o peso de termos muito comuns no conjunto. Existem variantes de cálculo. O objetivo é dar uma representação mais informativa do que contar tudo com o mesmo peso.',
'Um pipeline pode combinar TfidfVectorizer e LogisticRegression. O vectorizer aprende o vocabulário e estatísticas no treino; o classificador aprende a relação com as categorias. Ao prever, reutiliza ambos sem reaprender.',
'Mensagens duplicadas ou do mesmo pedido nos dois conjuntos inflacionam a avaliação. Divide por origem quando necessário e examina a matriz de confusão. Um pequeno conjunto sintético serve para aprender a ferramenta, não para demonstrar qualidade de produção.'
],'treino: ajustar vocabulário e classificador; teste: transformar e prever',
['Categorias de suporte','“não consigo entrar” recebe conta; “cobrança duplicada” recebe pagamento. São rótulos humanos. Se “conta” também significar fatura, a ambiguidade exige contexto e exemplos mais diversos.'],
['Uma falha útil','O modelo erra “não é um problema de pagamento”. Não basta acrescentar a frase ao teste até melhorar: analisa a negação, altera usando desenvolvimento e reserva uma avaliação nova independente.'],
'Treinar o vectorizer no corpus inteiro revela ao modelo estatísticas do teste. Coloca-o dentro do pipeline.',
'from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nmodelo = make_pipeline(TfidfVectorizer(ngram_range=(1,2)),\n                       LogisticRegression(max_iter=500))\n# Ver labs/suporte.py para dados e execução completa.',[
choice('Onde ajustar o vocabulário?',['No treino','Em todos os textos antes da divisão'],0,'Preserva a avaliação independente.','Ajusta no treino e transforma os outros conjuntos.'),choice('Mensagens duplicadas em treino e teste podem inflacionar resultados?',['Sim','Não'],0,'O modelo pode reconhecer texto já visto.','A avaliação deixa de medir bem generalização a mensagens novas.'),n('3 categorias, 4 casos de teste por categoria: quantos casos?',12,'Multiplica categorias por casos.','3×4=12.')],
'Executa labs/suporte.py. Lê os erros impressos e escreve duas limitações dos dados sintéticos.');

add('nlp','N03',1,'Embeddings e atenção','Interpretar semelhança vetorial e combinação de contexto.','M01 e D01.',[
'Um embedding representa um token ou texto por um vetor aprendido. Ao contrário das contagens, as dimensões não correspondem necessariamente a palavras explícitas. Textos próximos no espaço podem partilhar propriedades úteis, dependendo do modelo e do treino.',
'A similaridade do cosseno é o produto escalar dividido pelo produto das normas. Mede alinhamento de direção e exige normas não nulas. Semelhança alta não prova equivalência, verdade ou adequação ao problema.',
'A atenção calcula pesos para combinar informação de várias posições. Um peso maior aumenta a contribuição de uma representação nessa operação. Num transformer há várias camadas e cabeças; não interpretes um único mapa de atenção como toda a explicação da resposta.'
],'cosseno(a,b) = (a·b) / (norma(a) × norma(b))',
['Mesma direção','a=[1,0], b=[2,0]. Produto escalar=2; normas=1 e 2. Cosseno=2/(1×2)=1. Têm comprimentos diferentes, mas a mesma direção.'],
['Misturar contexto','Valores 10 e 20 com pesos 0,25 e 0,75 produzem 0,25×10+0,75×20=17,5. É uma combinação ponderada ilustrativa, não uma implementação completa de atenção.'],
'Não compares vetores produzidos por modelos incompatíveis como se partilhassem o mesmo espaço.',
'import math\na, b = [1,0], [2,0]\ndot = sum(x*y for x,y in zip(a,b))\nnorma = lambda v: math.sqrt(sum(x*x for x in v))\nprint(dot/(norma(a)*norma(b))) # 1.0',[
n('Cosseno entre [1,0] e [0,1]?',0,'O produto escalar é zero.','0/(1×1)=0.'),n('0,25×10 + 0,75×20?',17.5,'Calcula cada contribuição.','2,5+15=17,5.'),choice('Similaridade alta garante verdade factual?',['Não','Sim'],0,'Semelhança e verdade são propriedades distintas.','É uma relação entre representações, não uma verificação de factos.')],
'Calcula cossenos de três vetores bidimensionais e explica por que não o defines para o vetor zero.');

add('nlp','N04',1,'Modelos de linguagem e RAG','Desenhar uma resposta apoiada em documentos e avaliar falhas.','N02 e N03.',[
'Um modelo de linguagem atribui probabilidades a tokens seguintes, condicionadas pelo contexto, e pode gerar uma sequência. Esse mecanismo permite respostas úteis, mas não garante que as afirmações sejam verdadeiras ou atualizadas.',
'RAG combina recuperação de documentos com geração. Primeiro procura passagens relevantes, depois passa-as como contexto ao modelo. Recuperação fraca limita a resposta; contexto correto também não garante uso correto. Avalia as duas partes separadamente.',
'Numa aplicação, apresenta fontes e permite dizer “não encontrei suporte”. Documentos externos são dados, não instruções com autoridade. Uma passagem pode conter texto que tenta alterar o comportamento do sistema; não lhe entregues controlo sobre ferramentas, permissões ou ações.'
],'pergunta → recuperar passagens → gerar com contexto → verificar suporte → apresentar fontes',
['Documentação de uma API','O utilizador pergunta pelo limite de pedidos. Recuperas a secção atual com o limite e a data. A resposta deve corresponder à secção e citar a origem. Se não houver suporte, pede clarificação ou informa a falta de dados.'],
['Avaliar em separado','Em 10 perguntas, a recuperação encontra a passagem certa em 8. Nessas 8, a geração responde corretamente em 6. Tens um problema de recuperação em 2 e de utilização do contexto em 2, com 6 sucessos finais.'],
'Uma citação visível não garante que a fonte sustente a frase. Verifica a correspondência entre afirmação e passagem.',
'# Contrato ilustrativo; não chama um serviço externo.\nresultado = {"resposta": None, "fontes": [], "estado": "sem_suporte"}\nprint(resultado["estado"])',[
n('Passagem certa em 8 de 10 perguntas: percentagem?',80,'8/10×100.','80% de sucesso de recuperação nesta amostra.'),n('6 respostas corretas em 10: sucesso final em percentagem?',60,'Usa todas as perguntas.','6/10×100=60%.'),choice('Instruções dentro de um documento recuperado devem controlar ferramentas?',['Não','Sim'],0,'O documento é material de consulta.','Não lhe atribuas autoridade para mudar permissões ou executar ações.')],
'Escreve cinco perguntas sobre uma documentação, a passagem correta e um critério verificável para cada resposta.');
