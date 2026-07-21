# Gerenciador Financeiro
O Gerenciador Financeiro é uma plataforma web moderna para o controle de fluxo de caixa, consolidando receitas, despesas e saldo de usuários de forma ágil e centralizada.

<p align="center">
  
# Gerenciador Financeiro 💸

<p align="center">
  <img src="https://via.placeholder.com/400x150/231536/FFFFFF?text=Gerenciador+Financeiro" width="400" alt="Gerenciador Financeiro Logo">
</p>

<p align="center">
  <strong>Uma solução web para a gestão completa do ciclo financeiro, desde os lançamentos até a consolidação de relatórios.</strong>
  <br><br>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

---

## 📖 Sobre o Projeto

O **Gerenciador Financeiro** nasceu da necessidade de organizar e monitorar transações financeiras vinculadas a diferentes pessoas físicas ou jurídicas em um único ambiente. Construída como uma *Single Page Application* (SPA), a plataforma processa grandes volumes de dados no lado do cliente, garantindo alta performance e feedback visual instantâneo.

Com uma interface gráfica inspirada em grandes *fintechs* (utilizando uma paleta de cores moderna em tons de roxo e bege), o objetivo do sistema é entregar uma experiência de usuário (UX) fluida, isolando a complexidade dos cálculos matemáticos através de painéis analíticos e filtros dinâmicos.

## 🚀 Funcionalidades

### 👥 Gestão de Pessoas
- **Controle de Usuários:** Interface dedicada para o cadastro, listagem e administração das pessoas que participam do ecossistema financeiro.
- **Validações Nativas:** Regras de negócio aplicadas diretamente no formulário para garantir a integridade dos dados cadastrais.

### 💸 Gestão Financeira (Transações)
- **Painel de Lançamentos:** Registro de entradas (Receitas) e saídas (Despesas) atreladas a usuários específicos.
- **Filtros Combinados:** Motor de busca em tempo real que permite cruzar dados, filtrando simultaneamente por "Pessoa" e "Tipo de Movimentação".
- **Feedback Visual:** Formatação condicional de valores (verde para positivo, vermelho para negativo) para rápida interpretação do extrato.

### 📊 Consultas & Dashboard
- **Relatório de Fechamento:** Tabela dinâmica que consolida matematicamente o total de receitas, despesas e o saldo líquido individual de cada pessoa cadastrada.
- **Totais Globais:** Cálculo automático do balanço geral da instituição, refletindo instantaneamente as alterações feitas nos filtros de busca.

  ## 📋 Lista Completa de Funcionalidades

| Código     | Funcionalidade                          | Descrição                                                                                                          |
|------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **RF001**  | Cadastro e Listagem de Pessoas          | Módulo de Gestão de Pessoas para registrar os titulares das transações.                                            |
| **RF002**  | Lançamento de Transações                | Permite o registro detalhado de despesas e receitas, vinculando-as através de chaves estrangeiras (`pessoaId`).    |
| **RF003**  | Menu de Navegação Global                | Header fixo (`position: fixed`) blindado com navegação em abas (Pessoas, Transações e Dashboard).                  |
| **RF004**  | Motor de Filtros Dinâmicos              | Painel de *checkboxes* modulares para incluir ou excluir pessoas do cálculo de extratos e resumos.                 |
| **RF005**  | Consolidação Matemática                 | Script que processa a matriz de dados, executando a função `reduce` para entregar saldos líquidos precisos.        |
| **RF006**  | Prevenção de Exclusão Acidental         | Implementação de confirmação nativa (`window.confirm`) antes de deletar registros críticos.                        |
| **ENH001** | UI/UX Modular e Responsiva              | Interface modularizada baseada em "Bento Cards", garantindo padronização visual em diferentes resoluções.          |
| **ENH002** | Formatação de Moeda Brasileira          | Uso do `Intl.NumberFormat` para padronizar a exibição de todos os valores financeiros em BRL (R$).                 |


---

## 🛠️ Tecnologias e Bibliotecas

| Tecnologia | Propósito |
| :--- | :--- |
| **React (Hooks)** | Biblioteca principal para a reatividade e renderização dos componentes (`useState`, `useEffect`). |
| **TypeScript** | Tipagem estática (`Interfaces`) para garantir a integridade dos objetos (Pessoas e Transações) durante o desenvolvimento. |
| **Vite** | Ferramenta de *build* e servidor de desenvolvimento ultra-rápido. |
| **CSS3 (Puro)** | Estilização componentizada através de variáveis (`:root`) e arquitetura Flexbox/Grid sem dependência de frameworks externos. |
| **Axios** | Cliente HTTP baseado em Promises utilizado para realizar requisições (`GET`, `POST`, `DELETE`) à API (backend). |

---

## 🖥️ Interface Gráfica do Projeto no Figma:

(Insira o link do seu Figma aqui)

---

## ⚙️ Instalação e Execução

Para executar o Gerenciador Financeiro no seu ambiente local, siga os passos abaixo.

### Pré-requisitos
- Node.js (Versão 18 ou superior)
- NPM ou Yarn ou PNPM (Gestor de Pacotes)
- Uma API REST rodando localmente (na porta mapeada no `Services/Api.ts`)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SeuUsuario/gerenciador-financeiro.git](https://github.com/SeuUsuario/gerenciador-financeiro.git)
    ```

2.  **Instale as dependências do projeto:**
    ```bash
    cd gerenciador-financeiro
    npm install
    ```

3.  **Execute a aplicação:**
    Inicie o servidor de desenvolvimento do Vite.
    ```bash
    npm run dev
    ```

4.  **Acesse no Navegador:**
    O terminal exibirá a URL local (geralmente `http://localhost:5173`). Abra este link para utilizar a aplicação.

---
**Desenvolvido por Pedro Peres Benício**
