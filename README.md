# Instalar dependências

As dependências necessárias para rodar o Spotunes Server podem ser facilmente instaladas executando apenas `npm install`.

# Executar ambiente de desenvolvimento

Para executar o ambiente de desenvolvimento basta rodar `npm run development`.
O ambiente estará disponível em http://localhost:8888/

# Build e deploy

O repositório já está pronto para o deploy em sua branch `master`, basta escolher a plataforma de sua escolha (como o Heroku, por exemplo) e seguir as instruções nestes sites.

# Instância já deployada

Uma instância rodando sempre a `master` atualizada já está deployada no Heroku e pode ser encontrada em https://spotunes-server.herokuapp.com/

# Arquivo `.env`

Para funcionar corretamente, o Spotunes Server precisa de um arquivo `.env` em seu diretório raiz contendo os valores conforme exemplo abaixo:

```
SPOTIFY_CLIENT_ID = "<token-aqui>"
SPOTIFY_CLIENT_SECRET = "token-aqui>"
```

Para um tutorial de como obter os tokens necessários: https://support.heateor.com/get-spotify-client-id-client-secret/

# Como utilizar a API

Há apenas uma rota de GET (https://spotunes-server.herokuapp.com/api/spotify/search), que recebe dois parâmetros (obrigatórios): `name` e `type`
* `name`: Nome da música ou artista a ser buscado na API do Spotify
* `type`: Assume apenas dois valores (`track` ou `artist`)

Exemplos de busca:
* https://spotunes-server.herokuapp.com/api/spotify/search?name=super+max&type=track
* https://spotunes-server.herokuapp.com/api/spotify/search?name=pink+floyd&type=artist
