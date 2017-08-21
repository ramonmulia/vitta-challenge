# vitta-challenge

Pré-requisitos:
    - [Node.js](https://nodejs.org/) v6+.
    - [Mongodb]() v3+

Para gerar os containers basta executar:
```sh
$ docker-compose up
```
Este comando inicia cria 2 containers que servirão para testar a aplicação:
- mongo:  (container contendo a imagem do mongodb)
- vittachallenge_web: (container contendo a imagem da aplicação)

Para teste da API basta colocar o IP da máquina do docker (docker-machine) e a porta 8888

Ex:
```sh
$ curl http://192.168.99.100:8888/territories
```

Para executar os testes execute os seguintes comandos na pasta do projeto:
```sh
$ npm i
$ npm test
```
