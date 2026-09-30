// ==========================================
// AULA 5: LISTA DINÂMICA DE SKILLS (HABILIDADES)
// ==========================================

// Pegamos o formulário de adicionar skills usando a classe correta do HTML ('.form-skills').
const formSkill = document.querySelector('.form-skills');

// Pegamos o campo de texto onde se digita a nova skill usando o ID ('nova-skill').
const inputSkill = document.getElementById('nova-skill');

// Pegamos a lista <ul> vazia do HTML onde vamos jogar as skills criadas.
const listaSkills = document.querySelector('.lista-skills');

// Criamos uma lista inicial de textos (Array) com algumas habilidades padrão.
const skillsPadrao = [
  'HTML',
  'CSS',
  'JavaScript',
  'Flexbox',
  ' Responsividade',
  'Arrow function',
  'DOM',
  'Map',
  'Template literals',
  'LocalStorage',
];

// Criamos a nossa lista oficial de trabalho. Ela começa valendo a lista padrão de cima.
let skills = skillsPadrao;

// MÁQUINA DE DESENHAR SKILLS: Essa função pega a lista de palavras e transforma em tags <li> para aparecer na tela.
const renderizarSkills = () => {
  // CORRIGIDO: Removida a barra invertida. Agora o JS renderiza a palavra certinha da lista.
  const skillsHTML = skills.map((skill) => {
    return `<li>${skill}</li>`; 
  });

  // O '.join('')' pega todas as tags <li> que estavam separadas na lista e junta todas em um único texto corrido, tirando as vírgulas.
  listaSkills.innerHTML = skillsHTML.join('');
};

// BUSCAR DO ARMAZENAMENTO (LocalStorage): O LocalStorage é como um "mini banco de dados" que fica salvo no navegador da pessoa.
const skillsSalvas = localStorage.getItem('skills');

// Se o navegador encontrar alguma skill salva anteriormente...
if (skillsSalvas) {
  // Como o LocalStorage só guarda texto puro, usamos o 'JSON.parse' para transformar esse texto de volta em uma lista (Array) de verdade.
  skills = JSON.parse(skillsSalvas);
}

// MÁQUINA DE SALVAR: Essa função salva a lista atualizada dentro do navegador.
const salvarSkills = () => {
  // Como o LocalStorage só aceita texto, usamos o 'JSON.stringify' para transformar nossa lista (Array) em um texto comum.
  localStorage.setItem('skills', JSON.stringify(skills)); 
};

// EVENTO DE ADICIONAR NOVA SKILL: Quando o usuário digita uma habilidade e clica em "Salvar skill"...
formSkill.addEventListener('submit', (evento) => {
  // Evita que a página recarregue ao clicar no botão.
  evento.preventDefault();

  // Pegamos o texto digitado e o '.trim()' remove espaços vazios inúteis que o usuário possa ter digitado sem querer no começo ou fim.
  const novaSkill = inputSkill.value.trim();

  // Se o campo estiver totalmente vazio, o 'return' para o código aqui mesmo e não faz mais nada.
  if (!novaSkill) {
    return;
  }
  
  // O '.push' joga a nova palavra digitada para o final da nossa lista 'skills'.
  skills.push(novaSkill);
  
  // Chamamos a função de salvar para guardar a nova lista no navegador.
  salvarSkills();
  
  // Chamamos a função de receber para redesenhar a lista na tela com o novo item incluso.
  renderizarSkills();
  
  // Limpa o campo de texto do formulário.
  formSkill.reset();
  
  // Coloca o cursor piscando de volta dentro do campo de texto para o usuário digitar a próxima skill direto.
  inputSkill.focus(); 
  inputNome.focus();
});

// MANDANDO EXECUTAR: Assim que a página abre pela primeira vez, nós rodamos essa função para mostrar as skills na tela imediatamente.
renderizarSkills();