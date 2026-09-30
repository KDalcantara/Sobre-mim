

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