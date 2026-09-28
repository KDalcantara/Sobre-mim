// ==========================================
// PARTE 1: VARIÁVEIS E TIPOS DE DADOS
// ==========================================

// Criamos uma caixinha chamada 'nome' que guarda um texto. O 'const' significa que esse valor nunca muda.
const nome = 'Thiago Oliveira';

// Criamos uma caixinha chamada 'totalCompra' que começa com o número zero. O 'let' significa que esse número pode mudar depois.
let totalCompra = 0;

// O 'isActive' guarda um valor do tipo Boolean (Verdadeiro ou Falso). Aqui diz que está Ativo (true).
const isActive = true;

// Aqui diz que NÃO é professor (false).
const isTeacher = false;

// OBJETOS: É uma caixinha maior que guarda várias informações organizadas de uma coisa só (neste caso, do Aluno 1).
const aluno1 = {
  nome: 'Kelvin alcantara',       // Texto
  cargo: 'Engenheiro de software', // Texto
  isActive: true,                 // Verdadeiro ou Falso
  skills: ['HTML', 'CSS', 'JAVASCRIPT'], // Uma lista (Array) de textos
};

// FUNÇÃO: É como uma receita de bolo ou uma máquina. Você dá ingredientes para ela, e ela te devolve algo pronto.
// Essa função recebe um 'nome' e um 'sobrenome' e junta tudo em uma frase de boa noite.
function saudacao(nome, sobrenome) {
  return 'Boa noite ' + nome + ' ' + sobrenome; // O 'return' joga o resultado para fora da função
}


// ==========================================
// PARTE 2: PEGANDO COISAS DA TELA (DOM) E EVENTOS
// ==========================================

// Vamos até o HTML e pegamos o botão que tem a classe '.btn-mensagem' para usar aqui no JS.
const botaoMenssagem = document.querySelector('.btn-mensagem');

// Pegamos o formulário de contato do HTML pela classe '.formulario-contato'.
const formularioContato = document.querySelector('.formulario-contato');

// Pegamos o campo de texto onde o usuário digita o nome pela classe '.input-nome'.
const inputNome = document.querySelector('.input-nome');

// Pegamos o espaço onde vamos mostrar a mensagem de sucesso pela classe '.feedback'.
const feedback = document.querySelector('.feedback');

// EVENTO DE CLIQUE: Dizemos para o botão: "Fique esperando um clique. Quando clicarem em você, faça o seguinte..."
botaoMenssagem.addEventListener('click', () => {
  // Mostra um aviso secreto no console do desenvolvedor para testar se funcionou.
  console.log('MEU DEUS TA FUNCIONANDOOOO !!!!');
  
  // O 'toggle' funciona como um interruptor de luz: se a classe 'escondido' estiver no HTML, ele tira. Se não estiver, ele coloca.
  formularioContato.classList.toggle('escondido');

  // Se o formulário agora estiver com a classe 'escondido' (ou seja, sumiu da tela)...
  if (formularioContato.classList.contains('escondido')) {
    botaoMenssagem.textContent = 'Enviar mensagem'; // Muda o texto do botão para "Enviar mensagem"
  } else { // Se o formulário NÃO estiver escondido (está aparecendo)...
    botaoMenssagem.textContent = 'Cancelar envio'; // Muda o texto do botão para "Cancelar envio"
  }
});

// EVENTO DE ENVIO (SUBMIT): Dizemos para o formulário de contato o que fazer quando o usuário clicar em enviar.
formularioContato.addEventListener('submit', (event) => {
  // O navegador por padrão recarrega a página ao enviar um formulário. Essa linha IMPEDE que a página recarregue.
  event.preventDefault();
  
  // Pegamos o texto exato que o usuário digitou dentro do campo de nome.
  const nomeInput = inputNome.value;
  
  // Mudamos o HTML de dentro da caixinha 'feedback' para mostrar um balão de sucesso com o nome da pessoa.
  feedback.innerHTML = `
    <div class="feedback-sucesso">
      <span>Mensagem Enviada com Sucesso, ${nomeInput}!</span>
      <button class="fechar-feedback">x</button>
    </div>
  `;
  
  // Limpa todos os campos do formulário automaticamente.
  formularioContato.reset();
});


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
