export function filterEntries(entries, query) {
  const term = String(query).trim().toLocaleLowerCase('es');
  return term ? entries.filter((entry) => String(entry.text).toLocaleLowerCase('es').includes(term)) : entries;
}

export function quizFeedback(selected, answer) {
  if (selected === null || selected === undefined || selected === '') {
    return { state: 'unanswered', message: 'Selecciona una opción antes de comprobar tu respuesta.' };
  }
  if (Number(selected) === Number(answer)) {
    return { state: 'correct', message: 'Correcto. Puedes continuar con la siguiente pregunta.' };
  }
  return { state: 'wrong', message: 'Aún no es correcto. Revisa el contenido e inténtalo de nuevo.' };
}

function initializeSearch() {
  const input = document.querySelector('#site-search');
  const status = document.querySelector('#search-status');
  const entries = [...document.querySelectorAll('[data-search]')].map((element) => ({
    element, text: element.textContent
  }));
  if (!input || !status || !entries.length) return;

  const update = () => {
    const matches = new Set(filterEntries(entries, input.value));
    entries.forEach((entry) => { entry.element.hidden = !matches.has(entry); });
    const term = input.value.trim();
    status.textContent = term
      ? (matches.size ? `${matches.size} resultado${matches.size === 1 ? '' : 's'} para “${term}”.` : `No hay resultados para “${term}”.`)
      : '';
  };
  input.addEventListener('input', update);
}

function initializeQuizzes() {
  document.querySelectorAll('form.quiz').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const fieldset = form.querySelector('fieldset[data-answer]');
      const feedback = form.querySelector('.feedback');
      const selected = form.querySelector('input[type="radio"]:checked');
      const result = quizFeedback(selected?.value ?? null, fieldset?.dataset.answer);
      feedback.textContent = result.message;
      feedback.dataset.state = result.state;
    });
  });
}

if (typeof document !== 'undefined') {
  initializeSearch();
  initializeQuizzes();
}
