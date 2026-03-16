# Betalent Teste

## Sobre este projeto
Este projeto é um teste para a empresa Betalent. Ele é um sistema gerenciador de pagamentos multi-gateway

O fluxo do sistema consiste em:

1. Ao realizar uma compra, o sistema calcula o valor total da compra
junto ao gateway, e os gateways possuem uma ordem definida
2. Se caso o primeiro gateway falhar, o sistema deve tentar o próximo gateway
3. Se caso todos os gateways falharem, o sistema deve retornar um erro
4. Se caso o pagamento for aprovado, o sistema deve retornar um sucesso

### Tecnologias utilizadas
- Framework: AdonisJS
- Banco de dados: MySql

## Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) v20+
- [MySQL](https://www.mysql.com/) 8+
- [Docker](https://docs.docker.com/get-docker/) (necessário para o mock dos gateways)

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd betalent-teste
```

### 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo e preencha os valores:
```bash
cp .env.example .env
```

Gere a chave da aplicação e adicione no `.env`:
```bash
node ace generate:key
```
```
APP_KEY=<chave-gerada>
```

Configure também as credenciais do banco de dados no `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua-senha
DB_DATABASE=betalent
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Subir o mock dos gateways
```bash
docker run -p 3001:3001 -p 3002:3002 matheusprotzen/gateways-mock
```

### 5. Rodar as migrations e o seeder
```bash
node ace migration:run
node ace db:seed
```

### 6. Iniciar o servidor
```bash
node ace serve --hmr
```

### 7. Testar a API
A API estará disponível em `http://localhost:3333/api/v1`.

Para autenticar, faça login:
```bash
curl -X POST http://localhost:3333/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@email.com", "password": "Admin_dev123"}'
```

Use o token retornado nas requisições protegidas:
```bash
curl http://localhost:3333/api/v1/products \
  -H "Authorization: Bearer <token>"
```

### Rotas

Todas as rotas possuem o prefixo `/api/v1`. As rotas protegidas exigem o header `Authorization: Bearer <token>`.

#### Autenticação
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/login` | Login (retorna token) | Não |
| POST | `/auth/logout` | Logout (revoga token) | Sim |

#### Gateways
Roles: `admin`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/gateways` | Listar gateways |
| PATCH | `/gateways/:id/priority` | Alterar prioridade |
| PATCH | `/gateways/:id/toggle` | Ativar/desativar gateway |

#### Produtos
Roles: `admin`, `manager`, `finance`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/products` | Listar produtos |
| GET | `/products/:id` | Detalhes do produto |
| POST | `/products` | Criar produto |
| PATCH | `/products/:id` | Atualizar produto |
| DELETE | `/products/:id` | Remover produto |

#### Usuários
Roles: `admin`, `manager`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users` | Listar usuários |
| GET | `/users/:id` | Detalhes do usuário |
| POST | `/users` | Criar usuário |
| PATCH | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Remover usuário |

#### Clientes
Roles: `admin`, `user`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/clients` | Listar clientes |
| GET | `/clients/:id` | Detalhes do cliente |

#### Transações
Roles (leitura): `admin`, `user` | Roles (reembolso): `admin`, `finance`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/transactions` | Listar transações |
| GET | `/transactions/:id` | Detalhes da transação |
| POST | `/transactions/:id/refund` | Reembolsar transação |

#### Compras
Roles: `admin`, `user`

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/purchases` | Realizar compra |

### Comentários
O projeto tinha 3 níveis de dificuldade, e cada um tinha metas diferentes. Decidi desenvolver o teste de uma forma incremental, começando pelo básico e adicionando funcionalidades aos poucos. O projeto conta com funcionalidades do nível 1, 2, e do 3 parcialmente. Está ausente do projeto: orquestração de containers com o Docker Compose, e testes.

### Dificuldades
A primeira dificuldade que encontrei foi a falta de familiaridade com os frameworks permitidos do teste. A fim de me desafiar, decidi utilizar o AdonisJS, que é um framework que eu nunca tinha utilizado antes. Para me familiarizar com o framework, estudei a documentação oficial e segui os tutoriais disponíveis.

A segunda dificuldade foi entender o fluxo de pagamento multi-gateway, que é um conceito que eu nunca tinha trabalhado antes.

### IA
Construí este projeto com auxílio do Claude Code, utilizando o modelo Opus 4.6. Utilizei a IA principalmente para me ajudar a entender o conceito do fluxo de pagamento multi-gateway, e criar planos de implementação para as funcionalidades do projeto.



