# Projeto Store Manager

Esse projeto tem como objetivo testar meus conhecimentos em node.js express, arquitetura MSC.

Nesse projeto foi desenvolvido uma api RESTFULL para o gerenciamento de vendas. Para isso foi necessário desenvolver um CRUD de produtos e vendas, utilizando um banco de dados MYSQL para a gestão armazenamento dos dados.

# Como usar Docker/Local
### 1 - Clone o projeto

~~~
git clone git@github.com:Leandroswq/Store-Manager.git
~~~
* Entre na pasta do repositório que você acabou de clonar:
~~~
cd Store-Manager
~~~
<br>

### 2 - Instale as dependências

~~~
npm install
~~~
<br>

## Local
### 3 - Crie um arquivo .env na raiz do projeto e copie as variáveis de ambiente do arquivo .env.example para ele.  
<br>

### 4 - No arquivo .env atualize os valores das variáveis de ambiente de acordo com as suas necessidades
<br>

### 5- Inicie a aplicação

~~~
npm start
~~~
<br>

## Docker  

<details>

<summary>Opção 1</summary>

### 3 - Inicialize o compose

~~~
npm run compose
~~~

<br>

### 4 - Inicialize a aplicação dentro do container

~~~
npm run container:start
~~~

Se der o erro `ERROR: connect ECONNREFUSED 123.123.123.1:3306`
significa que não deu tempo do banco de dados iniciar. Para resolver isso basta esperar alguns segundos e rodar o comando novamente.
</details>

<details>

<summary>Opção 2</summary>

### 3 Inicialize o compose junto com a aplicação

~~~
npm run compose:start
~~~

</details>

<br>

# Como acessar a documentação

### 1 - Inicie aplicação
<br>

### 2 - Acesse o endpoint host/api-docs
Exemplo
~~~
http://localhost:3000/docs
~~~

# Como testar a aplicação

Local
~~~
npm test
~~~

Docker

~~~
npm run container:test
~~~
