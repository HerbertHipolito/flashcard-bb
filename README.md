# React Native Flashcard app

Aplicativo desenvolvido enquanto eu estava estudando para o concurso do Banco do Brasil. O aplicativo utiliza a ideia de flashcards, ou seja, uma carta será mostrada aleatoriamente de um deck e o usuário terá a opção de ver a resposta, caso não lembre.
Assim, a constante repetição da visualização das cartas facilita/solidifica o processo de memorização e absorção do conteúdo em questão.
Para cada matéria desse concurso, o usuário pode guardar um conjunto de cartas para poder vê-las posteriormente. 
O usuário pode também ver todas as cartas aprendidas.

> Tecnologias utilizadas: React Native, JavaScript e Jest.

# Principais funcionalidades

## Adicionar carta

Será solicitado ao usuário dois inputs: questão e resposta. A questão corresponde o que estaria na frente da carta. Nessa minha implementação, foi utilizado a async-storage
para o armazenamento dos cartas localmente. 

## Revisar cartas

A cada rodada uma carta será selecionada e mostrada para o usuário, que pode escolher ver a resposta, marca com aprendida ou com não aprendida. Caso clique em aprendida,
A carta será movida para a lista de cartas aprendidas.

## Ver cartas aprendidas

Visualiza todas as cartas aprendidas até então pelo usuário. É possível excluí-la também.

