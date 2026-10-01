const fotoPerfil = document.querySelector('header img');
const nomePerfil = document.querySelector('header h1');
const cargoPerfil = document.querySelector('.cargo');
const containerProjetos = document.querySelector('.projetos');
const usuarioGithub = 'KDalcantara';
const gradientes = ['projeto-1', 'projeto-2', 'projeto-3'];

const criarAviso = (texto, classe = 'aviso') => {
  const aviso = document.createElement('p');
  aviso.className = classe;
  aviso.textContent = texto;
  return aviso;
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

const carregarProjetos = async () => {
  containerProjetos.replaceChildren(criarAviso('Carregando projetos...'));

  try {
    const resposta = await fetch(`https://api.github.com/users/${usuarioGithub}/repos?sort=updated&per_page=6`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar projetos');
    }

    const repositorios = await resposta.json();
    if (!Array.isArray(repositorios) || repositorios.length === 0) {
      throw new Error('Nenhum projeto encontrado');
    }

    const fragmento = document.createDocumentFragment();
    repositorios.forEach((repositorio, indice) => {
      const artigo = document.createElement('article');
      const imagem = document.createElement('div');
      imagem.className = `projeto-imagem ${gradientes[indice % gradientes.length]}`;
      imagem.setAttribute('aria-hidden', 'true');

      const titulo = document.createElement('h3');
      titulo.textContent = repositorio.name;

      const descricao = document.createElement('p');
      descricao.textContent = repositorio.description || 'Projeto sem descrição disponível.';

      const link = document.createElement('a');
      link.href = repositorio.html_url;
      link.textContent = 'Ver projeto';
      link.setAttribute('aria-label', `Ver o projeto ${repositorio.name} no GitHub`);

      artigo.append(imagem, titulo, descricao, link);
      fragmento.append(artigo);
    });

    containerProjetos.replaceChildren(fragmento);
  } catch (erro) {
    containerProjetos.replaceChildren(criarAviso('Não foi possível carregar os projetos.', 'aviso erro'));
    console.error('Não foi possível carregar os projetos', erro);
  } finally {
    containerProjetos.setAttribute('aria-busy', 'false');
  }
};

carregarPerfil();
carregarProjetos();