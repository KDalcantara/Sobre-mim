const formSkill = document.querySelector('.form-skills');
const inputSkill = document.getElementById('nova-skill');
const listaSkills = document.querySelector('.lista-skills');
const statusSkills = document.querySelector('.skill-status');

const skillsPadrao = [
  'HTML',
  'CSS',
  'JavaScript',
  'Flexbox',
  'Responsividade',
  'Arrow function',
  'DOM',
  'Map',
  'Template literals',
  'LocalStorage',
];

let skills = skillsPadrao;
const skillsSalvas = localStorage.getItem('skills');

if (skillsSalvas) {
  try {
    const skillsArmazenadas = JSON.parse(skillsSalvas);
    if (Array.isArray(skillsArmazenadas)) {
      skills = skillsArmazenadas.filter((skill) => typeof skill === 'string');
    }
  } catch {
    localStorage.removeItem('skills');
  }
}

const renderizarSkills = () => {
  const fragmento = document.createDocumentFragment();

  skills.forEach((skill) => {
    const item = document.createElement('li');
    item.textContent = skill;
    fragmento.append(item);
  });

  listaSkills.replaceChildren(fragmento);
};

const salvarSkills = () => {
  localStorage.setItem('skills', JSON.stringify(skills));
};

formSkill.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const novaSkill = inputSkill.value.trim();

  if (!novaSkill) {
    return;
  }

  skills.push(novaSkill);
  salvarSkills();
  renderizarSkills();
  statusSkills.textContent = `Skill ${novaSkill} adicionada.`;
  formSkill.reset();
  inputSkill.focus();
});

renderizarSkills();