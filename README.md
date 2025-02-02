# API de E-commerce

Esta é uma API desenvolvida para suportar um e-commerce. Ela permite o gerenciamento de produtos, categorias, carrinho de compras e pedidos, e inclui autenticação de usuários com JWT.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
- **Express**: Framework para criação de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **JWT**: Para autenticação de usuários com tokens.
- **Bcryptjs**: Para criptografar senhas dos usuários.
- **Nodemon**: Ferramenta para reiniciar o servidor automaticamente durante o desenvolvimento.
- **TS-Node**: Para executar código TypeScript diretamente.

## Endpoints da API

### 1. **Usuários (Autenticação)**

- **POST /api/auth/register**: Registra um novo usuário.
- **POST /api/auth/login**: Faz login e retorna um token JWT para autenticação.

### 2. **Produtos**

- **GET /api/products**: Lista todos os produtos.
- **GET /api/products/:id**: Obtém detalhes de um produto específico.
- **POST /api/products**: Adiciona um novo produto (autenticado).
- **PUT /api/products/:id**: Atualiza um produto existente (autenticado).
- **DELETE /api/products/:id**: Remove um produto (autenticado).

### 3. **Categorias**

- **GET /api/categories**: Lista todas as categorias.
- **POST /api/categories**: Adiciona uma nova categoria (autenticado).

### 4. **Carrinho de Compras**

- **POST /api/cart**: Adiciona um item ao carrinho.
- **PUT /api/cart/update**: Atualiza a quantidade de um item no carrinho.
- **DELETE /api/cart/remove**: Remove um item do carrinho.
- **GET /api/cart/:userId**: Obtém o conteúdo do carrinho do usuário.

### 5. **Pedidos (Vendas)**

- **POST /api/orders**: Cria um novo pedido (venda) e atualiza o estoque dos produtos.
- **GET /api/orders**: Lista todos os pedidos (vendas).
- **GET /api/orders/:orderId**: Obtém os detalhes de um pedido específico.

## Como Executar

### 1. **Instalação de Dependências**

Clone o repositório e instale as dependências do projeto:

```bash
git clone <URL-DO-REPOSITORIO>
cd ecommerce-api
npm install
```

### 2. **Configuração do Banco de Dados**

Certifique-se de que você tenha o **MongoDB** em funcionamento. Você pode usar uma instância local ou um serviço como **MongoDB Atlas**.

Se for utilizar o **MongoDB Atlas**, crie um cluster e obtenha a URL de conexão do seu banco de dados.

Crie um arquivo `.env` na raiz do projeto e adicione sua URL de conexão MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=seu_token_secreto
PORT=3000
```

### 3. **Executando o Servidor**

#### Modo Desenvolvimento

Durante o desenvolvimento, você pode rodar a API com **Nodemon** para recarregar o servidor automaticamente ao fazer alterações no código:

```bash
npm run dev
```

#### Modo Produção

Se você deseja compilar o código TypeScript e rodar a versão compilada:

```bash
npm run prod
```

Esse comando irá compilar o código para a pasta `dist/` e, em seguida, iniciar o servidor.

### 4. **Scripts no package.json**

- **`npm run dev`**: Roda o servidor em modo desenvolvimento com `nodemon` e `ts-node`.
- **`npm run build`**: Compila o código TypeScript.
- **`npm run start`**: Roda a versão compilada em produção.
- **`npm run prod`**: Compila o código e roda o servidor em produção.

## Estrutura do Projeto

Aqui está uma visão geral da estrutura de pastas do projeto:

```
ecommerce-api/
├── dist/                # Código compilado (gerado após o comando npm run build)
├── node_modules/        # Dependências do projeto
├── src/                 # Código fonte
│   ├── controllers/     # Lógica dos controladores de cada recurso
│   ├── models/          # Modelos de dados (ex: Produto, Carrinho, Pedido)
│   ├── routes/          # Definição das rotas da API
│   ├── server.ts        # Arquivo principal do servidor (inicializa o Express)
│   └── utils/           # Funções auxiliares (ex: autenticação)
├── .env                 # Variáveis de ambiente (conexão com MongoDB, JWT secret)
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências e scripts do projeto
```

## Testes

Você pode testar os endpoints da API usando ferramentas como **Postman** ou **Insomnia**. Aqui estão alguns exemplos de requisições:

- **POST /api/auth/register**  
  Corpo da requisição: 
  ```json
  {
    "username": "usuario",
    "email": "usuario@email.com",
    "password": "senha123"
  }
  ```

- **POST /api/auth/login**  
  Corpo da requisição: 
  ```json
  {
    "email": "usuario@email.com",
    "password": "senha123"
  }
  ```

- **POST /api/products**  
  Corpo da requisição: 
  ```json
  {
    "name": "Produto Teste",
    "price": 99.99,
    "category": "Categoria Teste",
    "stock": 100
  }
  ```

## Contribuindo

Contribuições são bem-vindas! Se você deseja melhorar o projeto, basta seguir esses passos:

1. Fork este repositório.
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações.
4. Teste as mudanças localmente.
5. Envie um pull request.
