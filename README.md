# Interface Web - Papelaria Candy 

Aplicação web desenvolvida em **React** para a disciplina de Tecnologias para Internet. Este projeto consome a API `gestao-papelaria-api` (Spring Boot) para fornecer uma interface gráfica de gerenciamento para uma papelaria.

O projeto cumpre os requisitos do trabalho, implementando operações de **CRUD** (Cadastrar, Listar, Editar, Excluir) e navegação entre páginas.

## ✨ Funcionalidades

* **Listagem de Produtos (GET):** Busca e exibe os produtos da API em formato de cards.
* **Cadastro de Produtos (POST):** Formulário completo com busca de categorias para criar novos produtos.
* **Edição de Produtos (PUT & GET by ID):** Formulário pré-preenchido que busca os dados do produto pela rota `/produtos/{id}` e salva as alterações.
* **Exclusão de Produtos (DELETE):** Botão na tela de edição com janela de confirmação para excluir produtos.
* **Navegação:** Roteamento entre as páginas (Home, Lista, Cadastro, Edição) usando `react-router-dom`.
* **Interface:** Estilização com a biblioteca `Chakra UI`.

## 🛠️ Tecnologias Utilizadas

* **React 18**
* **Vite** (Build tool)
* **React Router DOM** (Roteamento)
* **Chakra UI** (Componentes de UI)
* **Axios** (Requisições HTTP)

---

## 🚀 Como Executar o Projeto

**Este projeto é um front-end e depende do back-end (API) para funcionar.** Siga os dois passos abaixo:

### 1. (Pré-requisito) Rodando o Back-end (API)

1.  Clone o repositório da API:
    ```bash
    git clone [https://github.com/NataniMoraes/gestao-papelaria-api.git](https://github.com/NataniMoraes/gestao-papelaria-api.git)
    cd gestao-papelaria-api
    ```

2.  **Configure o Banco de Dados:**
    * Crie um banco MySQL chamado `gestao_papelaria`.
    * Abra o arquivo `src/main/resources/application.properties` e configure seu usuário e senha do MySQL.
    * (Opcional) Execute o script `data-load-script.sql` (incluído na raiz da API) para popular o banco com dados.

3.  Rode a API:
    ```bash
    mvn spring-boot:run
    ```

4.  **A API deve estar rodando em `http://localhost:8080`.** Mantenha este terminal aberto.

### 2. Rodando o Front-end (Este Projeto)

1.  Abra um **novo terminal**.
2.  Clone este repositório:
    ```bash
    git clone [https://github.com/NataniMoraes/papelaria-candy-web.git](https://github.com/NataniMoraes/papelaria-candy-web.git)
    cd papelaria-candy-web
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

4.  Rode o projeto:
    ```bash
    npm run dev
    ```

5.  Acesse `http://localhost:5173` no seu navegador.

> **Nota de Teste:** Você pode inspecionar as chamadas de API que este front-end faz abrindo as **Ferramentas de Desenvolvedor** do navegador (tecla `F12`) e indo para a aba **"Rede" (Network)**.
