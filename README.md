# Documentação do Frontend para o Projeto de Sistema de Pontuação

## Visão Geral

O frontend de um sistema de pontuação é responsável por fornecer uma interface intuitiva para os usuários interagirem com as funcionalidades do aplicativo. Este aplicativo é projetado para gerenciar informações de ligas de premiação corporativa, incluindo o registro de equipes, consulta de rankings e acompanhamento de pontuações em tempo real.

## Tecnologias Utilizadas

- **Framework:** Next.js 14
- **Linguagem:** TypeScript
- **CSS:** Tailwind CSS
- **Component Library:** ShadCN/UI

## Estrutura do Projeto

A estrutura do frontend seguirá boas práticas de organização de código, com os seguintes diretórios principais:

```
/src
  |-- /app          # Diretório para rotas e páginas
  |-- /components   # Componentes reutilizáveis
  |-- /styles       # Arquivos de estilo personalizados
  |-- /utils        # Funções utilitárias
  |-- /hooks        # Hooks customizados
  |-- /services     # Integrações com APIs
```

## Funcionalidades Planejadas

1. **Cadastro de Equipes:**

   - Formulário dinâmico para registro de equipes.
   - Validação de campos como nome e tipo da equipe.

2. **Consulta de Rankings:**

   - Exibição de rankings em tempo real.
   - Possibilidade de filtrar rankings por tipo e categoria.

3. **Acompanhamento de Pontuações:**

   - Interface para visualizar pontuações e métricas por equipe.
   - Atualizações dinâmicas via WebSocket ou polling.

4. **Visualização de Dados:**
   - Páginas com layout intuitivo para navegar entre as equipes, rankings e pontuações.

## Integração com Backend

O frontend consumirá as rotas RESTful do backend, desenvolvido em Flask, através de chamadas à API.
Exemplo de chamada com `Fetch API`:

```typescript
async function fetchRankings() {
  const response = await fetch('http://127.0.0.1:5000/api/rankings')
  const data = await response.json()
  return data
}
```

## Dependências Previstas

Abaixo estão algumas dependências que serão utilizadas:

- **React:** Base para o Next.js.
- **Tailwind CSS:** Estilização rápida e eficiente.
- **ShadCN/UI:** Componentes prontos para construção de interfaces.
- **Axios:** Para requisições HTTP (se necessário).
- **React Query ou SWR:** Gerenciamento de estado remoto para manipulação de dados da API.
- **Headless UI:** Componentes acessíveis e estilizados para melhorar a experiência do usuário.
- **clsx:** Manipulação de classes CSS condicionalmente.

Outras dependências podem ser adicionadas conforme as necessidades do projeto.

## Scripts Disponíveis

Os principais comandos para execução e desenvolvimento local:

### Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento na porta padrão 3000. A aplicação será acessível em `http://localhost:3000`.

### Build de Produção

```bash
npm run build
```

Gera uma build otimizada para produção.

### Iniciar o Servidor de Produção

```bash
npm start
```

Inicia o servidor usando a build gerada.

## Roadmap do Frontend

1. Configuração inicial do projeto e dependências.
2. Criação dos componentes principais, como Navbar, Footer e Layout.
3. Desenvolvimento das páginas:
   - Cadastro de Equipes.
   - Rankings.
   - Pontuações em tempo real.
4. Integração com a API do backend.
5. Testes de integração e acessibilidade.

## Contribuição

Contribuições são bem-vindas! Certifique-se de seguir os padrões de codificação e de abrir um pull request com descrições claras das mudanças realizadas.

---

Esta documentação será atualizada à medida que o projeto avança e novas funcionalidades forem implementadas.
