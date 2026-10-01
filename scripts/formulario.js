const botaoMensagem = document.querySelector('.btn-mensagem');
const formularioContato = document.querySelector('.formulario-contato');
const inputNome = document.querySelector('.input-nome');
const feedback = document.querySelector('.feedback');

botaoMensagem.addEventListener('click', () => {
  const formularioAberto = formularioContato.hidden;
  formularioContato.hidden = !formularioAberto;
  botaoMensagem.setAttribute('aria-expanded', String(formularioAberto));
  botaoMensagem.textContent = formularioAberto ? 'Cancelar envio' : 'Enviar mensagem';

  if (formularioAberto) {
    inputNome.focus();
  } else {
    botaoMensagem.focus();
  }
});

formularioContato.addEventListener('submit', (event) => {
  event.preventDefault();

  const mensagem = document.createElement('div');
  mensagem.className = 'feedback-sucesso';

  const texto = document.createElement('span');
  texto.textContent = `Mensagem enviada com sucesso, ${inputNome.value.trim()}!`;

  const fechar = document.createElement('button');
  fechar.type = 'button';
  fechar.className = 'fechar-feedback';
  fechar.setAttribute('aria-label', 'Fechar confirmação de envio');
  fechar.textContent = 'x';
  fechar.addEventListener('click', () => {
    feedback.hidden = true;
    botaoMensagem.focus();
  });

  mensagem.append(texto, fechar);
  feedback.replaceChildren(mensagem);
  feedback.hidden = false;
  formularioContato.reset();
  fechar.focus();
});