const fotoPerfil = document.querySelector('header img');
const nomePerfil = document.querySelector('header h1');
const cargoPerfil = document.querySelector('.cargo');
const containerProjetos = document.querySelector('.projetos');
const usuarioGithub = 'KDalcantara';
const gradientes = ['projeto-1', 'projeto-2', 'projeto-3'];
const imagensGenericas = {
  'ceara-servico': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85',
};
const descricoesProjetos = {
  'Barbearia-Alura': 'Página institucional para barbearia, com apresentação da marca, missão, benefícios e foco na experiência do cliente.',
  'site-mapa': 'Portfólio Front-End com navegação entre páginas, estrutura semântica, metadados básicos de SEO e interação com JavaScript.',
  'pokemon-raros': 'Aplicação web que consome a PokéAPI para carregar e apresentar Pokémon lendários e míticos de forma dinâmica.',
};
const projetosFallback = [
  { name: 'Barbearia-Alura', html_url: 'https://github.com/KDalcantara/Barbearia-Alura' },
  { name: 'Sobre-mim', html_url: 'https://github.com/KDalcantara/Sobre-mim', description: 'Página pessoal com integração ao GitHub e apresentação de habilidades em HTML, CSS e JavaScript.' },
  { name: 'site-mapa', html_url: 'https://github.com/KDalcantara/site-mapa' },
  { name: 'pokemon-raros', html_url: 'https://github.com/KDalcantara/pokemon-raros' },
  { name: 'ceara-servico', html_url: 'https://github.com/KDalcantara/ceara-servico', description: 'Site de serviços de pintura, pedreiro e assistência técnica.' },
  { name: 'GoodPay', html_url: 'https://github.com/KDalcantara/GoodPay', description: 'POC de interface de pagamentos com Bootstrap e JavaScript.' },
];

const criarAviso = (texto, classe = 'aviso') => {
  const aviso = document.createElement('p');
  aviso.className = classe;
  aviso.textContent = texto;
  return aviso;
};

const criarImagemProjeto = (repositorio, classeGradiente) => {
  const moldura = document.createElement('div');
  moldura.className = `projeto-imagem ${classeGradiente}`;

  const imagem = document.createElement('img');
  const capaGithub = `https://opengraph.githubassets.com/1/${usuarioGithub}/${encodeURIComponent(repositorio.name)}`;
  const imagemGoodPay = 'https://raw.githubusercontent.com/KDalcantara/GoodPay/main/img/banner/BannerGoodPay.png';
  const imagemGenerica = imagensGenericas[repositorio.name];
  imagem.src = repositorio.name === 'GoodPay' ? imagemGoodPay : imagemGenerica || capaGithub;
  imagem.alt = `Imagem de apresentação do projeto ${repositorio.name}`;
  imagem.loading = 'lazy';
  imagem.decoding = 'async';
  imagem.addEventListener('error', () => {
    if (imagem.src !== capaGithub) {
      imagem.src = capaGithub;
      return;
    }

    imagem.remove();
  });

  moldura.append(imagem);
  return moldura;
};

const carregarPerfil = async () => {
  try {
    const resposta = await fetch(`https://api.github.com/users/${usuarioGithub}`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar perfil');
    }

    const dados = await resposta.json();
    fotoPerfil.src = dados.avatar_url || './images/kelvin%20curriculo.jpg';
    nomePerfil.textContent = dados.name || 'Kelvin Alcantara';
    cargoPerfil.textContent = dados.bio || 'Engenharia de software';
  } catch (erro) {
    console.error('Não foi possível carregar o perfil', erro);
  }
};

const renderizarProjetos = (repositorios) => {
  const fragmento = document.createDocumentFragment();

  repositorios.forEach((repositorio, indice) => {
    const artigo = document.createElement('article');
    const imagem = criarImagemProjeto(repositorio, gradientes[indice % gradientes.length]);

    const titulo = document.createElement('h3');
    titulo.textContent = repositorio.name;

    const descricao = document.createElement('p');
    descricao.textContent = repositorio.description || descricoesProjetos[repositorio.name] || 'Projeto sem descrição disponível.';

    const link = document.createElement('a');
    link.href = repositorio.html_url;
    link.textContent = 'Ver projeto';
    link.setAttribute('aria-label', `Ver o projeto ${repositorio.name} no GitHub`);

    artigo.append(imagem, titulo, descricao, link);
    fragmento.append(artigo);
  });

  containerProjetos.replaceChildren(fragmento);
};

const carregarProjetos = async () => {
  containerProjetos.replaceChildren(criarAviso('Carregando projetos...'));

  try {
    const resposta = await fetch(`https://api.github.com/users/${usuarioGithub}/repos?sort=updated&per_page=100`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar projetos');
    }

    const repositoriosDisponiveis = await resposta.json();
    const barbearia = repositoriosDisponiveis.find(
      (repositorio) => repositorio.name === 'Barbearia-Alura',
    );
    const repositorios = [
      barbearia,
      ...repositoriosDisponiveis.filter(
        (repositorio) => repositorio.name !== 'KDalcantara' && repositorio.name !== 'Barbearia-Alura',
      ),
    ].filter(Boolean).slice(0, 6);
    if (!Array.isArray(repositorios) || repositorios.length === 0) {
      throw new Error('Nenhum projeto encontrado');
    }

    renderizarProjetos(repositorios);
  } catch (erro) {
    renderizarProjetos(projetosFallback);
    console.warn('Projetos exibidos a partir do fallback local', erro);
  } finally {
    containerProjetos.setAttribute('aria-busy', 'false');
  }
};

carregarPerfil();
carregarProjetos();