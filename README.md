# SOMAP - Plataforma WebGIS

SOMAP é uma plataforma WebGIS moderna desenvolvida para fornecer visualização de mapas, processamento e análise de dados espaciais com alta performance e usabilidade.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

- **[Vue 3](https://vuejs.org/)**: Framework JavaScript utilizando Composition API para criação de interfaces web.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida e moderna.
- **[OpenLayers (ol)](https://openlayers.org/)**: Biblioteca robusta para criação de mapas web dinâmicos e interativos.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first que agiliza a criação de layouts responsivos.
- **[Pinia](https://pinia.vuejs.org/)**: Gerenciamento de estado (Store) oficial para Vue.
- **[Vue Router](https://router.vuejs.org/)**: Controle de rotas avançado na aplicação.
- **[MSW (Mock Service Worker)](https://mswjs.io/)**: Ferramenta de mock de chamadas de API, facilitando o desenvolvimento sem depender ativamente de um backend.
- **[TypeScript](https://www.typescriptlang.org/)**: Adiciona tipagem estática e segurança na estruturação do código.

## 🎯 Funcionalidades Principais (Fase 1)

- **Mapa Integrado e Interativo**: Exibição da área espacial focada e controlada via componentes com suporte ao OpenLayers.
- **Composables e Estado**: Estruturação usando hooks customizados (composables) focando nos mapas, ferramentas e sistema.
- **Interface Gráfica (UI)**: Layouts compreendendo Sidebars de controle, Toolbars (barra de ferramentas) na interface e fluxos visuais em tela utilizando Tailwind.
- **Mock Service Worker**: Simulando uma infraestrutura server-side para validação da UI e testes em ambiente local.
- **Fluxo de Login**: Página pronta para controle de acessos da plataforma WebGIS simulada.

## 🛠️ Instalação e Configuração

### Pré-requisitos

Possuir o **Node.js** instalado. Recomendado versão superior à descrita no `engines` do `package.json` (Node v20.19.0+ ou >=22.12.0).

### Passos

1. **Instale as dependências** do projeto:
   ```sh
   npm install
   ```

2. **Inicie o servidor de desenvolvimento** com Hot-Module-Replacement (HMR):
   ```sh
   npm run dev
   ```

3. Abra `http://localhost:5173/` (ou a porta exposta pelo Vite) em seu navegador.

## 📦 Scripts Disponíveis

Alem do `dev`, outras rotinas do npm podem ser chamadas no ambiente do projeto:

- `npm run build`: Roda a verificação de tipagem via `vue-tsc` e constrói os assets de produção utilizando Vite.
- `npm run preview`: Previsualiza o bundle gerado antes da subida para o servidor externo.
- `npm run type-check`: Faz a checagem manual das tipagens utilizando TypeScript.
- `npm run lint`: Aciona os analisadores do código pelo ESLint customizado e Oxlint para checagem rápida de padrões.

## ⚙️ Ambiente de Desenvolvimento (Recomendado)

Recomenda-se utilizar a IDE [VS Code](https://code.visualstudio.com/) combinada com a extensão [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (sugere-se desabilitar o Vetur) para completo suporte à tipagem e IntelliSense. Você também pode aproveitar o [Vue.js Devtools](https://devtools.vuejs.org/) nativo para Chromium ou Firefox.
