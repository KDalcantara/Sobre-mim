# Portfólio pessoal com JavaScript

Projeto de uma página pessoal responsiva desenvolvida para praticar a construção de interfaces Front-End com HTML5, CSS3 e JavaScript moderno. A aplicação apresenta perfil profissional, habilidades, projetos do GitHub e um formulário de contato interativo.

O projeto também funciona como uma vitrine técnica: os dados do perfil e dos repositórios são carregados pela GitHub REST API, enquanto a interface mantém conteúdo de fallback quando a API está indisponível.

## Funcionalidades

- Integração assíncrona com a GitHub REST API usando `fetch`, `async/await` e tratamento de respostas HTTP.
- Carregamento dinâmico do perfil, biografia e repositórios do usuário.
- Cards de projetos com capa, descrição, link para o repositório e `alt` descritivo.
- Seleção prioritária de projetos relevantes para a apresentação profissional, como Barbearia-Alura.
- Fallback local para projetos, descrições e links quando ocorre indisponibilidade ou rate limit da API.
- Imagens de projetos com lazy loading, `decoding="async"` e fallback visual por gradiente.
- Lista dinâmica de skills com inclusão por formulário e persistência usando `localStorage`.
- Renderização segura de conteúdo do usuário com `textContent`, evitando injeção de HTML no DOM.
- Formulário de contato com validação nativa, feedback de sucesso e limpeza automática dos campos.
- Abertura e fechamento do formulário controlados por JavaScript, com gerenciamento de foco.

## Acessibilidade

- Estrutura semântica com `header`, `main`, `section`, `article` e `footer`.
- Link para pular diretamente ao conteúdo principal.
- Labels associados aos campos de formulário e atributos `required`, `name` e `autocomplete`.
- Uso de `aria-label`, `aria-expanded`, `aria-controls`, `aria-live`, `aria-atomic` e `aria-busy` nos estados dinâmicos.
- Feedbacks anunciados para leitores de tela por meio de regiões com `role="status"`.
- Foco visível para navegação por teclado com `:focus-visible`.
- Contraste visual revisado e suporte a `prefers-reduced-motion`.
- Layout responsivo para dispositivos móveis e telas maiores.

As decisões seguem boas práticas alinhadas aos princípios POUR e aos critérios de acessibilidade WCAG 2.2 nível AA. Uma certificação formal ainda depende de auditoria manual com leitores de tela e usuários reais.

## Tecnologias e conceitos

- HTML5 semântico
- CSS3, Flexbox e Media Queries
- JavaScript ES6+
- DOM API e eventos com `addEventListener`
- Fetch API e integração REST
- GitHub API
- `localStorage`
- Programação assíncrona
- Renderização dinâmica com `DocumentFragment`
- Validação de formulários
- Acessibilidade Web, WCAG e WAI-ARIA
- Segurança no DOM e prevenção de XSS baseado em HTML não confiável

## Estrutura

```text
.
├── index.html
├── estilo.css
├── script.js
├── images/
└── scripts/
	├── formulario.js
	├── github-api.js
	└── skills.js
```

## Como executar

Abra o arquivo `index.html` no navegador ou utilize a extensão Live Server no VS Code. A integração com a GitHub API requer conexão com a internet; sem conexão, o fallback local mantém os cards principais disponíveis.

## Palavras-chave

`Front-End` `HTML5` `CSS3` `JavaScript` `ES6+` `DOM` `REST API` `GitHub API` `Fetch API` `async/await` `localStorage` `responsive design` `accessibility` `WCAG` `WAI-ARIA` `web performance` `secure DOM manipulation`
