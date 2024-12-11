Integração com a API da Twitch

O código apresentado implementa uma integração com a API da Twitch para buscar informações sobre streams, 
com funcionalidades como autenticação, busca por jogos e exibição de resultados em uma interface.
Abaixo, detalhamos a funcionalidade de cada seção: 

Autenticação com a API da Twitch: A função getAccessToken é responsável por autenticar a aplicação na API da Twitch e obter um access token.
Este token é necessário para realizar qualquer solicitação autenticada à API. 

Obter ID do Jogo pelo Nome: A função getGameId busca o identificador (ID) de um jogo com base em seu nome.

Buscar Streams: A função fetchStreams obtém informações sobre streams ao vivo.

Renderizar Streams: A função renderStreams exibe as informações das streams na interface.

Buscar Streams com Base no Jogo: A função searchStreams realiza a busca de streams com base no nome do jogo inserido pelo usuário.

Execução Inicial: A função main é executada ao carregar a página.
