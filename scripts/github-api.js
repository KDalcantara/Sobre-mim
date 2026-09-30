//selecionar os elemntos que a API vai preencher

const fotoPerfil = document.querySelector('header img');
const nomePerfil = document.querySelector('header h1');
const CargoPerfil = document.querySelector('.cargo');
const containerProjetos = document.querySelector('.projetos');

//de quem eu vou pegar essas informações
const usuarioGithub = 'KDalcantara';

//dados do perfil vindo da API

const carregarPerfil = async() => {
    try{
        const resposta = await fetch(`https://api.github.com/users/${usuarioGithub}`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar perfil');
        }
        const dados = await resposta.json();


        //tratamento de dados que podem vir vazios
        fotoPerfil.src = dados.avatar_url;
        nomePerfil.textContent = dados.name || 'Kelvin Alcantara';
        CargoPerfil.textContent = dados.bio || 'Engenharia de software';
        } catch(erro){
            console.log('Nao foi possivel carregar o perfil', erro);
    }
};

//projetos vindos dos repositorios
const gradientes = ['projeto-1', 'projeto-2', 'projeto-3']

const CarregarProjetos = async () => {
    //loading
    containerProjetos.innerHTML = '<p>Carregando projetos..';
    try {
        const resposta = await fetch (`https://api.github.com/users/${usuarioGithub}/repos?sort=update&per_page=6`);
        const repos = await resposta.json();
        //atualizar o html com os projetos
        console.log(repos);
    } catch(erro) {

    }
};

carregarPerfil();
CarregarProjetos();
//chamar a função carregarProjeto

