// Conteúdo original de preparação. Cada aula é gerada como documento independente.
// Q: enunciado, resposta numérica ou opções, pista, resolução.
export const lessons=[];
export function add(course,id,module,title,goal,prereq,paragraphs,formula,exampleA,exampleB,error,code,questions,task){
 lessons.push({course,id,module,title,goal,prereq,paragraphs,formula,exampleA,exampleB,error,code,questions,task});
}
export const n=(q,a,h,s)=>({q,a,h,s});
export const choice=(q,options,a,h,s)=>({q,options,a,h,s});

add('bases','B01',0,'Frações, percentagens e sinais','Converter proporções e distinguir variação absoluta de relativa.','Saber somar, multiplicar e dividir.',[
'Uma fração descreve uma parte de um total. Se 12 de 80 visitas convertem, a parte é 12 e o total é 80. A divisão 12 ÷ 80 dá 0,15. Multiplicar por 100 expressa a mesma proporção por cada cem: 15%. Não mudaste o fenómeno; mudaste a representação.',
'Uma taxa passar de 20% para 25% é subir 5 pontos percentuais. O aumento relativo compara a diferença com o valor inicial: 5 ÷ 20 = 0,25, ou 25%. Esta distinção evita exagerar resultados de modelos ou experiências A/B.',
'Os parênteses indicam o que calcular primeiro. Em 2 × (3 − 5), a diferença é −2 e o resultado é −4. Um erro pode ser negativo: previsão − observado informa a direção. Ao elevar ao quadrado, usa parênteses: (−4)² = 16.'
],'proporção = parte / total; percentagem = 100 × proporção',
['Conversão de um formulário','Há 200 visitas e 30 envios. Divide 30 por 200: 0,15. Multiplica por 100: 15%. Se houver 50 envios, a taxa será 25%. A diferença é 10 pontos percentuais; o crescimento relativo é 10/15 ≈ 66,67%.'],
['Uma previsão abaixo do real','Prevês 90 ms e observas 120 ms. O erro assinado é 90 − 120 = −30 ms. O erro absoluto é 30 ms. O quadrado do erro é 900 ms²; já não tem unidades de tempo simples.'],
'Não somes denominadores: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Torna as partes comparáveis primeiro.',
'const taxa = 30 / 200;\nconsole.log(taxa * 100); // 15',[
n('Quanto é 25% de 80?',20,'25% é 25/100.','80 × 25/100 = 80 × 0,25 = 20.'),n('De 40% para 50%, quantos pontos percentuais aumentou?',10,'Subtrai as duas percentagens.','50 − 40 = 10 pontos percentuais; o aumento relativo seria 10/40 = 25%.'),n('Qual é o quadrado de (3 − 7)?',16,'Resolve primeiro os parênteses.','3 − 7 = −4; (−4) × (−4) = 16.')],
'Calcula a taxa de sucesso de 18 pedidos em 60 e explica a diferença entre taxa de sucesso e número de sucessos.');

add('bases','B02',0,'Álgebra sem saltos','Isolar uma incógnita e interpretar pesos numa expressão.','B01: sinais e divisão.',[
'Uma variável guarda um valor que pode mudar. Em matemática, x pode representar o número de imagens numa página. Um coeficiente é um multiplicador: em 3x, o 3 multiplica x. Escrever 3x é escrever 3 × x; não é um nome de variável como em JavaScript.',
'Uma equação afirma que duas expressões têm o mesmo valor. Para descobrir x, mantém a igualdade: uma operação feita num lado tem de ser feita no outro. Não precisas de decorar “passa para o outro lado”; pensa em retirar a mesma quantidade aos dois pratos de uma balança.',
'Um modelo linear combina uma parte variável com uma parte fixa. Em y = wx + b, x é a entrada, w o peso ou declive, b o valor de base e y a saída. Aprender um modelo será escolher w e b a partir de dados. Nesta aula apenas calculamos com valores conhecidos.'
],'y = w × x + b',
['Orçamento de carregamento','Cada imagem custa 20 ms e há 100 ms fixos. Para um total de 180 ms: 20x + 100 = 180. Subtrai 100 dos dois lados: 20x = 80. Divide ambos por 20: x = 4 imagens. Substitui para verificar: 20 × 4 + 100 = 180.'],
['Distribuir e simplificar','2(x + 3) = 14 equivale a 2x + 6 = 14. Subtrai 6: 2x = 8. Divide por 2: x = 4. Também podias dividir a equação inicial por 2: x + 3 = 7.'],
'2(x + 3) não é 2x + 3: o multiplicador aplica-se a cada termo dentro dos parênteses.',
'const prever = (x, w = 20, b = 100) => w * x + b;\nconsole.log(prever(4)); // 180',[
n('Resolve 3x + 2 = 14. Qual é x?',4,'Retira 2 aos dois lados e divide por 3.','3x = 12; x = 12/3 = 4.'),n('Se w = 2, x = 5 e b = −1, quanto vale y?',9,'Multiplica antes de somar.','y = 2 × 5 + (−1) = 10 − 1 = 9.'),n('Resolve 2(x + 1) = 10.',4,'Divide primeiro os dois lados por 2.','x + 1 = 5; subtrai 1: x = 4.')],
'Escreve a fórmula do preço de um serviço com 5 € fixos e 2 € por pedido. Resolve para um total de 17 €.');

add('bases','B03',1,'Funções, gráficos e potências','Ler uma função como transformação e interpretar a inclinação.','B02: variáveis e expressões.',[
'Uma função recebe uma entrada válida e devolve uma saída. Já fazes isto em código. O domínio é o conjunto de entradas permitidas: se x conta imagens, usar −3 pode não fazer sentido no contexto. A notação f(x) lê-se “f de x”, o valor da função na entrada x.',
'Num gráfico, a entrada costuma estar no eixo horizontal e a saída no vertical. Cada par (x, f(x)) é um ponto. O declive de uma reta é a variação vertical dividida pela variação horizontal. É uma taxa: milissegundos por imagem, por exemplo.',
'Uma potência representa multiplicação repetida: x² = x × x. Na função f(x) = x², a inclinação não é constante. Entre 1 e 2, a saída aumenta 3; entre 2 e 3, aumenta 5. Um logaritmo responde à pergunta inversa de uma potência: log₂(8) = 3 porque 2³ = 8. Vais voltar a esta ideia ao estudar perdas e probabilidades.'
],'declive = (saída final − saída inicial) / (entrada final − entrada inicial)',
['Uma reta de latência','f(x) = 20x + 100. Para x = 0, f(0) = 100. Para x = 2, f(2) = 140. Os pontos (0,100) e (2,140) dão declive (140−100)/(2−0) = 20 ms por imagem. O valor de base é 100 ms.'],
['Crescimento quadrático','Com f(x) = x², a tabela para x = 0,1,2,3 é 0,1,4,9. Duplicar x de 2 para 4 muda f(x) de 4 para 16: a saída quadruplica. Não confundas uma curva com uma reta só por ambas crescerem.'],
'f(x) não é f × x. É uma chamada de função. E x² não é 2x: para x = 3, dão 9 e 6.',
'const f = x => x ** 2;\nconsole.table([0, 1, 2, 3].map(x => ({ x, y: f(x) })));',[
n('Se f(x) = 3x + 1, quanto vale f(2)?',7,'Substitui x por 2.','3 × 2 + 1 = 7.'),n('Uma saída cresce de 10 para 22 quando x passa de 1 para 4. Qual é a taxa média?',4,'Divide a variação de saída pela variação de entrada.','(22−10)/(4−1) = 12/3 = 4.'),n('Quanto vale log₂(16)?',4,'Procura o expoente em 2 elevado a esse número.','2 × 2 × 2 × 2 = 16, logo log₂(16) = 4.')],
'Desenha à mão os pontos de f(x) = 2x + 1 para x = 0,1,2. Identifica o declive e o valor na origem.');

add('bases','B04',1,'Médias, dispersão e amostras','Resumir dados sem esconder valores extremos nem confundir amostra com população.','B01: frações.',[
'A média reparte a soma igualmente pelo número de observações. A mediana é o valor central depois de ordenar; com uma quantidade par de valores, é a média dos dois centrais. Ambas resumem o centro, mas respondem de forma diferente a valores extremos.',
'A dispersão descreve quanto os valores variam. A amplitude é máximo menos mínimo. A variância populacional faz a média dos quadrados das distâncias à média; o desvio padrão é a raiz quadrada da variância e recupera as unidades originais. Ao estimar variância populacional a partir de uma amostra, é habitual dividir por n−1; nesta aula descrevemos apenas o conjunto completo e dividimos por n.',
'Uma amostra é um subconjunto de uma população. Medir apenas o teu computador não representa todos os utilizadores. Mais dados do mesmo tipo não corrigem automaticamente a falta de dispositivos lentos. Antes de calcular, pergunta quem ficou de fora.'
],'média = soma / n; amplitude = máximo − mínimo (n = número de valores)',
['Latências e um pedido lento','Para 100, 110 e 390 ms, a soma é 600 e a média é 600/3 = 200 ms. A mediana é 110 ms. A amplitude é 390−100 = 290 ms. A média de 200 não descreve um pedido típico tão bem como a mediana neste pequeno conjunto.'],
['Dispersão à mão','Para 2 e 4, a média é 3. Os desvios são −1 e 1; os quadrados são 1 e 1. A variância populacional é (1+1)/2 = 1. O desvio padrão é √1 = 1.'],
'Uma média baixa não garante ausência de pedidos muito lentos. Examina a distribuição e segmentos relevantes.',
'const xs = [100, 110, 390];\nconst media = xs.reduce((s, x) => s + x, 0) / xs.length;\nconsole.log(media); // 200',[
n('Qual é a média de 2, 4 e 9?',5,'Soma os três valores e divide por 3.','(2+4+9)/3 = 15/3 = 5.'),n('Qual é a mediana de 8, 1 e 3?',3,'Ordena antes de escolher o centro.','A sequência ordenada é 1,3,8. O centro é 3.'),choice('Testar só num portátil potente representa todos os dispositivos?',['Sim, se repetir mil vezes','Não, faltam outros dispositivos'],1,'Repetição não muda quem está representado.','A amostra continua limitada ao mesmo tipo de dispositivo; precisamos de diversidade pertinente.')],
'Mede ou inventa cinco latências, incluindo uma muito alta. Calcula média e mediana e explica qual comunicarias junto da lista completa.');

add('bases','B05',2,'Ambiente Python e primeiro script','Executar Python num ambiente isolado e compreender o que fica no repositório.','Saber abrir um terminal na pasta do projeto.',[
'Python vai servir para preparar dados e treinar modelos; o navegador continua a executar HTML, CSS e JavaScript. Não precisas de abandonar a experiência de front-end. Vais acrescentar uma ferramenta para tarefas numéricas e depois comunicar resultados por ficheiros ou APIs.',
'Instala Python 3 a partir da fonte oficial e verifica a instalação com python --version. No Windows também podes usar py --version. Um ambiente virtual é uma pasta com um intérprete e dependências isoladas para o projeto. É semelhante a separar dependências por projeto, mas não é um equivalente exato de node_modules.',
'Cria o ambiente com py -m venv .venv. No Windows podes executar diretamente .venv\\Scripts\\python.exe, sem ativar scripts de PowerShell. Guarda código e uma lista de dependências no Git; não guardes a pasta .venv. Executar um ficheiro do início ao fim ajuda a evitar estados escondidos de notebooks.'
],'ficheiro .py → intérprete Python → resultado no terminal',
['Primeira execução','Cria ola.py com print(2 + 3). Executa py ola.py na mesma pasta. O resultado é 5. Se aparecer “ficheiro não encontrado”, confirma a pasta atual e o nome antes de reinstalar ferramentas.'],
['Um projeto isolado','Executa py -m venv .venv. Depois .venv\\Scripts\\python.exe -m pip --version. O caminho mostrado deve apontar para .venv. Para instalar bibliotecas nesse ambiente, usa esse mesmo intérprete com -m pip install.'],
'Instalar com um pip e executar com outro Python pode causar ModuleNotFoundError. Usa python -m pip com o intérprete do projeto.',
'# ola.py — executa com py ola.py\nvalores = [100, 200, 300]\nprint(sum(valores) / len(valores))  # 200.0',[
choice('O que executa um ficheiro .py?',['O navegador diretamente','O intérprete Python'],1,'O HTML e o Python têm runtimes diferentes.','O intérprete lê e executa o script. GitHub Pages não executa Python no servidor.'),choice('Deves guardar a pasta .venv no Git?',['Não','Sim'],0,'O ambiente é recriável e depende da máquina.','Guarda código e dependências declaradas; exclui .venv.'),n('Qual é a saída numérica de sum([3, 6, 9]) / len([3, 6, 9])?',6,'A soma é 18 e há três elementos.','18/3 = 6. Em Python a divisão produz 6.0.')],
'Executa ola.py, altera um valor e volta a executar. Guarda o comando e o resultado num ficheiro de notas.');

add('bases','B06',2,'Diagnóstico e método de estudo','Identificar lacunas e decidir o que rever antes de avançar.','Tentar B01–B05, mesmo com dificuldades.',[
'Este diagnóstico serve para escolher revisões, não para te classificar. Tenta sem consultar a resolução e escreve os passos. Uma resposta certa por acaso não significa domínio; uma resposta errada com um raciocínio quase certo mostra exatamente onde intervir.',
'Além das três questões abaixo, resolve no papel: 25% de 120; f(3) para f(x)=2x+1; e a mediana de 9,2,4. As respostas são, respetivamente, 30, 7 e 4. Tapa esta frase na primeira tentativa. Se errares percentagens, volta a B01; funções, B03; mediana, B04.',
'Organiza uma sessão de 60 minutos: 10 minutos de recuperação sem olhar para notas, 20 de leitura e exemplos, 25 de exercícios e 5 de registo do erro principal. Revê a mesma ideia dois dias depois. Se conseguires 5 das 6 questões e explicar os passos, avança; caso contrário, dedica a próxima sessão à base em falta. O progresso do site é uma marca pessoal, não uma avaliação automática de domínio.'
],'tentativa → identificar o erro → rever uma base → nova tentativa',
['O erro como informação','Se escreveste 2(x+3)=2x+3, volta à distributiva em B02. Experimenta x=1: o original dá 8 e a expressão errada dá 5. Um contraexemplo simples ajuda-te a perceber por que a regra falhou.'],
['Uma semana sustentável','Com 8 horas semanais, podes fazer quatro sessões de 1 hora e duas de 2 horas. Reserva as sessões longas para o laboratório. Se só houver 4 horas, mantém a revisão e reduz a quantidade de aulas novas.'],
'Ler uma resolução e reconhecer os passos não é o mesmo que a conseguir produzir. Volta a resolver com a resposta fechada.',
'// Pequena verificação; tenta primeiro no papel.\nconsole.log(0.25 * 120, 2 * 3 + 1); // 30, 7',[
n('Resolve 4x − 2 = 10.',3,'Soma 2 a ambos os lados.','4x = 12, logo x = 3. Revê B02 se a transformação não for clara.'),n('Qual é a média de 10, 20 e 30?',20,'Divide a soma pelo número de valores.','60/3 = 20. Revê B04 se confundiste soma com média.'),n('20 sucessos em 80 tentativas correspondem a que percentagem?',25,'Faz parte/total e multiplica por 100.','20/80 = 0,25; 0,25 × 100 = 25%. Revê B01 se necessário.')],
'Escreve três linhas: a base mais forte, a maior dificuldade e o horário da próxima sessão. Repete o diagnóstico após 48 horas.');
