import {add,n,choice} from './lessons.mjs';
add('aplicacoes','A01',0,'Do problema à funcionalidade','Definir uma utilidade mensurável antes de escolher tecnologia.','I01 e ML02.',[
'Começa pela tarefa: quem faz o quê, com que dificuldade e com que consequência? “Usar IA” não é uma especificação. “Sugerir a categoria de um pedido para reduzir tempo de triagem sem aumentar erros graves” já permite avaliar uma solução.',
'Separa métrica técnica e métrica de produto. Recall mede deteção de casos positivos; tempo de triagem mede parte do trabalho. Uma melhoria técnica pode não reduzir tempo se a interface obrigar a verificações demoradas.',
'Define uma alternativa sem IA e um critério para abandonar a ideia. Isto protege tempo de desenvolvimento e evita implementar um sistema mais difícil de manter do que o problema original.'
],'utilizador → tarefa → dificuldade → hipótese → medição',
['Suporte','Hipótese: sugestões reduzem triagem média de 60 para 45 segundos mantendo a taxa de erros graves abaixo da referência. Primeiro mede a referência em tarefas comparáveis; depois avalia o protótipo.'],
['Pesquisa','Se uma lista de atalhos resolve as cinco perguntas mais frequentes, pode ser suficiente. Um modelo de linguagem só se justifica se resolver necessidades adicionais com qualidade e custo aceitáveis.'],
'Não confundas uma demonstração convincente com uma medição controlada de utilidade.',
'antes, depois = 60, 45\nprint((antes-depois)/antes * 100) # 25.0',[
n('Reduzir 60 s para 45 s poupa quantos segundos?',15,'Subtrai depois a antes.','60−45=15 s.'),n('Qual é a redução relativa em percentagem?',25,'Divide a poupança por 60.','15/60×100=25%.'),choice('Uma hipótese deve ter critério de avaliação?',['Sim','Não'],0,'Precisas de poder concluir que falhou.','Um critério mensurável torna a proposta testável.')],
'Escreve uma hipótese, uma métrica técnica, uma métrica de produto e um critério de desistência.');

add('aplicacoes','A02',0,'Contrato entre modelo e interface','Projetar pedidos, respostas e estados de falha.','HTTP/JSON e ML02.',[
'A interface deve comunicar com um serviço de previsão através de um contrato. Define os campos necessários, tamanho máximo da entrada, categorias possíveis, versão do modelo e comportamento em erro. O mesmo cuidado que aplicas a uma API convencional continua a ser necessário.',
'GitHub Pages serve ficheiros estáticos: não executa um servidor Python. O protótipo pode usar respostas simuladas; uma integração real precisa de um backend separado. Credenciais de serviços externos ficam nesse backend, nunca no JavaScript público.',
'Mostra estados de carregamento, erro e ausência de sugestão. Uma pontuação pode ser útil para lógica interna, mas não a apresentes como certeza se não for calibrada. Permite correção manual e associa a resposta ao pedido correto quando há chamadas concorrentes.'
],'pedido JSON → validação no servidor → previsão → resposta versionada → interface',
['Resposta','Uma resposta pode conter categoria="conta", score=0,71 e model_version="v1". A UI mostra “Sugestão: conta” e um seletor para corrigir. Score não deve ser apresentado automaticamente como 71% de certeza.'],
['Erro','Se a chamada excede o tempo limite, remove o estado de espera e oferece triagem manual. Não reutilizes a sugestão de um pedido anterior para o pedido atual.'],
'Colocar uma chave num ficheiro .env usado pelo build do front-end pode incluí-la no bundle público. Segredos exigem um servidor.',
'// Mock local para desenhar a interface; não é inferência real.\nconst resposta = { categoria: "conta", score: 0.71, model_version: "v1" };\nconsole.log(`Sugestão: ${resposta.categoria}`);',[
choice('GitHub Pages executa o backend Python?',['Não','Sim'],0,'É alojamento estático.','Precisas de um serviço separado para inferência Python online.'),choice('Onde guardar uma chave de API privada?',['No servidor','No JavaScript distribuído'],0,'O utilizador pode ler os ficheiros públicos.','Mantém segredos do lado do servidor.'),choice('Score 0,71 garante 71% de probabilidade correta?',['Não automaticamente','Sim sempre'],0,'Depende da definição e calibração.','Uma pontuação precisa de validação para ser interpretada como probabilidade.')],
'Desenha quatro estados de UI: espera, sugestão, erro e revisão manual. Escreve um exemplo JSON para sucesso e erro.');

add('aplicacoes','A03',1,'Monitorização, custo e mudança','Detetar quando o contexto de uso se afasta do treino.','A02 e B04.',[
'Depois de publicar, entradas e comportamentos podem mudar. Data drift é mudança na distribuição das entradas. Concept drift é mudança na relação entre entradas e alvo. Alteração de distribuição pode alertar para risco, mas não prova por si só perda de qualidade.',
'Monitoriza disponibilidade, latência, custo e qualidade quando os rótulos chegam. Compara segmentos e períodos semelhantes. Define um responsável e uma ação para cada alerta; um painel sem resposta prevista tem pouca utilidade.',
'Escolher cloud ou hardware exige medir a carga. Considera CPU, memória, tempo por pedido, concorrência e volume. Treino e inferência têm necessidades diferentes. Não precisas de GPU para começar os laboratórios deste percurso.'
],'medir → comparar com referência → investigar → corrigir ou reverter',
['Custo hipotético','Assume 0,002 € por pedido, apenas para a conta. Para 10 000 pedidos, custo=20 €. Se houver uma repetição por pedido, passas a 20 000 chamadas e 40 €. São valores fictícios, não preços de um fornecedor.'],
['Novo vocabulário','Após lançar uma funcionalidade, aparecem termos novos nas mensagens. A taxa de termos desconhecidos sobe. Recolhe exemplos e avalia qualidade com rótulos antes de decidir voltar a treinar.'],
'Drift é um sinal para investigar. Não exige automaticamente retreino, e ausência de drift medido não garante ausência de falhas.',
'pedidos, custo_unitario = 10000, 0.002\nprint(pedidos * custo_unitario) # 20.0 euros hipotéticos',[
n('5000 pedidos a 0,002 €: custo em euros?',10,'Multiplica volume por custo unitário.','5000×0,002=10 €.'),choice('Drift prova sozinho quebra de qualidade?',['Não','Sim'],0,'Pode faltar a relação com resultados reais.','Avalia com dados e rótulos pertinentes.'),choice('Um alerta deve ter uma ação e responsável?',['Sim','Não'],0,'O objetivo é responder à mudança.','Define investigação, alternativa ou reversão e quem decide.')],
'Define três métricas de operação e uma resposta concreta quando cada uma ultrapassa o limite proposto.');

add('aplicacoes','A04',1,'Avaliar impacto e manter controlo','Escolher salvaguardas proporcionais ao caso de uso.','I04 e A03.',[
'Uma sugestão de etiqueta e uma decisão sobre acesso a um serviço têm impactos diferentes. Define o âmbito de atuação antes de automatizar. Quanto maior o dano potencial, mais exigente deve ser a validação e a possibilidade de revisão.',
'Minimizar dados reduz exposição e complexidade. Um exercício de triagem pode usar mensagens sintéticas, sem nomes ou contactos. Num projeto real, verifica origem, permissões, retenção e acesso apropriado ao contexto; não uses dados pessoais só porque estão disponíveis.',
'Explica ao utilizador o papel da sugestão, permite corrigir e mantém a funcionalidade manual disponível. Regista correções com critérios: feedback humano também pode ser inconsistente, e não deve entrar automaticamente no treino sem revisão.'
],'âmbito limitado + dados necessários + revisão + alternativa manual',
['Triagem','A IA sugere conta ou pagamento; a pessoa confirma antes de encaminhar. Em caso ambíguo, escolhe revisão manual. A interface deve deixar claro que é uma sugestão e não bloquear a correção.'],
['Aplicação de maior impacto','Um protótipo educativo de classificação não justifica decisões clínicas. O tipo de consequência exige validação especializada e requisitos próprios. Delimita a demonstração para evitar extrapolações.'],
'Guardar todos os inputs “para melhorar depois” aumenta risco e não garante dados de treino úteis.',
'registo = {"categoria_sugerida": "conta", "categoria_confirmada": "pagamento"}\n# Este exemplo não guarda texto, nomes ou contactos.\nprint(registo)',[
choice('Mais dados pessoais são sempre melhores?',['Não','Sim'],0,'Pergunta se são necessários ao objetivo.','Recolhe o necessário e justifica retenção e acesso.'),choice('Feedback humano entra automaticamente no treino?',['Não, validar primeiro','Sim sempre'],0,'Também pode conter erros.','Verifica consistência e contexto antes de o usar como rótulo.'),choice('Uma sugestão deve poder ser corrigida?',['Sim','Não'],0,'O sistema pode falhar.','A correção é essencial para manter controlo e resolver casos errados.')],
'Escreve uma página de limites do protótipo: utilização prevista, utilização excluída, dados e processo de revisão.');

add('projeto','F01',0,'Definir um projeto pequeno e defensável','Fixar âmbito, pergunta e critérios de sucesso.','I02 e A01.',[
'O projeto proposto é um assistente de triagem de suporte. Recebe uma mensagem e sugere conta, pagamento ou problema técnico. A pessoa confirma ou corrige. Não responde automaticamente nem encerra pedidos nesta primeira versão.',
'A pergunta de investigação pode ser: uma representação TF-IDF com classificador linear melhora sobre a classe mais frequente em mensagens não vistas? A pergunta de produto é diferente: a sugestão ajuda a pessoa a triar com menos tempo e sem mais erros?',
'Limita entregáveis: dados documentados, referência, modelo, avaliação e interface de demonstração. Define o que fica fora e o que farias com mais tempo. Uma comparação bem feita vale mais do que muitas integrações sem avaliação.'
],'problema → hipótese → dados → referência → avaliação → demonstração',
['Critério técnico','Comparar macro-F1 do modelo com a referência no mesmo teste. Macro-F1 calcula F1 por classe e tira a média, dando o mesmo peso a cada classe. Define a diferença desejada antes das experiências; não a inventes depois de ver resultados.'],
['Critério de âmbito','Primeira versão: três categorias, CPU e interface com mock. Segunda fase: dados reais autorizados e API. Um protótipo sintético não é evidência de melhoria real no suporte.'],
'Não transformes o projeto numa coleção de chatbots, agentes e dashboards sem uma pergunta central.',
'categorias = ["conta", "pagamento", "tecnico"]\nprint(len(categorias)) # 3',[
n('Quantas categorias tem o projeto proposto?',3,'Conta a lista.','Conta, pagamento e técnico: 3.'),choice('A hipótese deve ser definida antes dos resultados?',['Sim','Não'],0,'Evita escolher o objetivo para coincidir com o resultado.','Defini-la antes torna a avaliação mais honesta.'),choice('Dados sintéticos provam eficácia em produção?',['Não','Sim'],0,'O contexto real pode diferir.','Demonstram o fluxo técnico e permitem aprender, mas não validam eficácia real.')],
'Escreve um README inicial com problema, utilizador, hipótese, âmbito incluído e excluído.');

add('projeto','F02',0,'Dados, rótulos e divisão','Criar um protocolo de anotação e avaliação.','P03 e P04.',[
'Define cada categoria com exemplos e regras para casos ambíguos. “Conta” pode significar acesso ou fatura em português; o protocolo deve esclarecer que problemas de cobrança pertencem a pagamento e acesso pertence a conta.',
'Regista origem, licença ou autorização, unidade de observação e limitações. Para começar, usa os dados sintéticos do laboratório. Mantém famílias de mensagens e duplicados no mesmo lado da divisão para evitar memorização disfarçada.',
'Se duas pessoas discordarem, analisa o caso e melhora a regra. Acordo entre anotadores ajuda a avaliar consistência, mas não prova que a categoria seja útil. Congela o teste e guarda a versão dos dados usada em cada experiência.'
],'protocolo → anotação → revisão de ambiguidades → divisão → versão',
['Ambiguidade','“Não consigo pagar porque não consigo entrar.” Pode ter duas intenções. O protocolo pode dar prioridade à causa de acesso ou permitir revisão manual. A decisão precisa de ser consistente, não adivinhada caso a caso.'],
['Divisão','De 60 exemplos independentes, reservas 12 para teste e trabalhas nos 48 restantes. Se forem variantes de 6 mensagens originais, a unidade de divisão deve ser a família, não a linha.'],
'Mais exemplos quase iguais não equivalem a mais diversidade independente.',
'item = {"id":"s01", "origem":"sintetico", "familia":"login",\n        "texto":"Não consigo entrar", "rotulo":"conta"}\nprint(item["familia"])',[
n('60 exemplos com 12 de teste: quantos ficam para desenvolvimento?',48,'Subtrai o teste.','60−12=48.'),choice('Variantes quase iguais devem ficar separadas entre treino e teste?',['Não, agrupar por família','Sim, sempre aleatoriamente'],0,'Podem revelar o mesmo conteúdo.','Mantê-las juntas reduz memorização entre conjuntos.'),choice('Um protocolo deve explicar ambiguidades?',['Sim','Não'],0,'O mesmo caso deve receber tratamento consistente.','Regras claras melhoram consistência e tornam limitações visíveis.')],
'Escreve a definição das três categorias e anota seis mensagens, incluindo duas ambíguas.');

add('projeto','F03',1,'Comparar e analisar erros','Construir uma tabela de resultados e tirar conclusões limitadas.','ML02–ML03 e N02.',[
'Compara todos os modelos na mesma divisão e com as mesmas métricas. A referência mais frequente revela o valor de não aprender nada além da distribuição das classes. Regista também tempo e requisitos de execução quando forem relevantes para o produto.',
'F1 combina precisão e recall: 2PR/(P+R), quando o denominador é positivo. Macro-F1 calcula por classe e faz a média simples. Não é o mesmo que calcular F1 a partir de precisão e recall médios.',
'Analisa erros concretos: negações, ambiguidade, vocabulário novo e mensagens curtas. Se alterares o modelo com base nos erros do teste, reconhece que esse teste passou a desenvolvimento e reserva uma nova avaliação independente.'
],'comparação justa = mesmos dados + mesmas métricas + decisões documentadas',
['F1','Precisão 0,5 e recall 1: F1=2×0,5×1/(0,5+1)=1/1,5≈0,667. A média harmónica penaliza o desequilíbrio entre as duas métricas.'],
['Macro','F1 por classe: 0,9;0,6;0,3. Macro-F1=(0,9+0,6+0,3)/3=0,6. A classe mais difícil continua a importar, mesmo que seja menos frequente.'],
'Não escrevas “modelo robusto” com base num teste de meia dúzia de frases. Descreve dimensão e limitações.',
'p, r = 0.5, 1.0\nf1 = 2*p*r/(p+r)\nprint(round(f1, 3)) # 0.667',[
n('Macro-F1 de 0,8 e 0,4?',0.6,'Média dos F1 por classe.','(0,8+0,4)/2=0,6.'),choice('Usar erros do teste para ajustar o modelo mantém o teste independente?',['Não','Sim'],0,'As decisões passam a usar essa informação.','Reserva novo teste ou reporta a perda de independência.'),n('Precisão=1 e recall=1. F1?',1,'Substitui na fórmula.','2×1×1/(1+1)=1.')],
'Executa o laboratório e cria uma tabela referência/modelo. Acrescenta três falhas ou limitações e uma experiência futura.');

add('projeto','F04',1,'Entregar, demonstrar e defender','Explicar o que fizeste e o que os resultados permitem concluir.','F01–F03.',[
'Uma entrega reproduzível inclui código, dependências, comandos, dados ou instruções de acesso, resultados e limitações. Outra pessoa deve conseguir executar a experiência sem depender do estado da tua máquina.',
'Organiza uma demonstração de cinco minutos: problema, exemplo de entrada, sugestão e correção, comparação com referência e uma falha conhecida. Explicar uma falha mostra compreensão dos limites; não precisas de esconder imperfeições.',
'Na defesa, prepara respostas sobre escolha da métrica, divisão dos dados, alternativa sem IA, custo e próximos passos. A grelha proposta neste repositório é pedagógica e não substitui os critérios do docente da pós-graduação.'
],'problema → método → evidência → limites → próximos passos',
['Uma conclusão defensável','“Neste conjunto sintético, o modelo superou a referência segundo macro-F1. Ainda não medimos tempo de triagem nem generalização a mensagens reais.” Distingue resultado observado de hipótese futura.'],
['Reproduzir','Numa pasta nova, cria ambiente, instala dependências e executa o laboratório. Confirma que os comandos do README chegam ao resultado sem células manuais escondidas.'],
'Não afirmes que a interface executa IA se ainda usa um mock. Identifica claramente o que foi implementado e avaliado.',
'entrega = ["README", "dados", "codigo", "dependencias", "resultados", "limites"]\nprint(len(entrega)) # 6',[
choice('Uma demo deve identificar quando usa respostas simuladas?',['Sim','Não'],0,'O público precisa de perceber o alcance.','Distingue protótipo visual de inferência real.'),choice('Devem constar falhas conhecidas?',['Sim','Não'],0,'São parte da evidência.','Documentar falhas permite avaliar riscos e próximos passos.'),n('Problema 15%, dados 20%, avaliação 25%, código 20%, comunicação 20%: total?',100,'Soma os pesos.','15+20+25+20+20=100%. É uma grelha proposta, não oficial.')],
'Grava ou ensaia cinco minutos de apresentação e executa o projeto seguindo apenas o README.');
