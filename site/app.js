export function filterEntries(entries, query) {
  const term = String(query).trim().toLocaleLowerCase('es');
  return term ? entries.filter((entry) => String(entry.text).toLocaleLowerCase('es').includes(term)) : entries;
}

export function quizFeedback(selected, answer, reviewHref = '') {
  if (selected === null || selected === undefined || selected === '') {
    return { state: 'unanswered', message: 'Selecciona una opción antes de comprobar tu respuesta.' };
  }
  if (Number(selected) === Number(answer)) {
    return { state: 'correct', message: 'Correcto. Puedes continuar con la siguiente pregunta.' };
  }
  return {
    state: 'wrong',
    message: 'Aún no es correcto. Repasa el concepto y vuelve a intentarlo.',
    reviewHref: String(reviewHref).startsWith('#') ? reviewHref : ''
  };
}

export function readerNavigationState({ isReader, scrollY, lastScrollY, navigationHasFocus }) {
  if (!isReader || navigationHasFocus || scrollY < 96 || scrollY <= lastScrollY) return 'visible';
  return 'hidden';
}

export function readerRailState({ event, hasHover, hasFocus, hoverSuppressed }) {
  if (event === 'escape') return { open: false, hoverSuppressed: hasHover };
  if (event === 'enter') return { open: hasHover && !hoverSuppressed, hoverSuppressed };
  if (event === 'leave') return { open: hasFocus && !hoverSuppressed, hoverSuppressed: false };
  return { open: false, hoverSuppressed };
}

function initializeSearch() {
  const input = document.querySelector('#site-search');
  const status = document.querySelector('#search-status');
  const entries = [...document.querySelectorAll('[data-search]')].map((element) => ({
    element, text: element.textContent
  }));
  const scope = input?.closest('[data-search-scope]')?.dataset.searchScope;
  if (!input || !status || !scope || !entries.length) return;

  const update = () => {
    const matches = new Set(filterEntries(entries, input.value));
    entries.forEach((entry) => { entry.element.hidden = !matches.has(entry); });
    const term = input.value.trim();
    status.textContent = term
      ? (matches.size ? `${matches.size} resultado${matches.size === 1 ? '' : 's'} en ${scope} para “${term}”.` : `No hay resultados en ${scope} para “${term}”.`)
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
      const result = quizFeedback(selected?.value ?? null, fieldset?.dataset.answer, fieldset?.dataset.reviewHref);
      feedback.replaceChildren(document.createTextNode(result.message));
      if (result.reviewHref) {
        const review = document.createElement('a');
        review.href = result.reviewHref;
        review.textContent = ' Repasar conceptos.';
        feedback.append(review);
      }
      feedback.dataset.state = result.state;
    });
  });
}

function initializeReaderNavigation() {
  const header = document.querySelector('#site-header');
  const sidebar = document.querySelector('#course-sidebar');
  const restore = document.querySelector('.reader-navigation-restore');
  const topicToggle = document.querySelector('.reader-rail-toggle');
  const isReader = Boolean(sidebar?.querySelector('nav ul'));
  if (!header || !sidebar || !restore || !isReader) return;

  let lastScrollY = window.scrollY;
  const setVisibility = (state) => {
    const hidden = state === 'hidden';
    document.body.classList.toggle('reader-navigation-hidden', hidden);
    restore.hidden = !hidden;
  };

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const navigationHasFocus = header.contains(document.activeElement) || sidebar.contains(document.activeElement);
    setVisibility(readerNavigationState({ isReader, scrollY, lastScrollY, navigationHasFocus }));
    lastScrollY = scrollY;
  }, { passive: true });

  restore.addEventListener('click', () => {
    setVisibility('visible');
    lastScrollY = window.scrollY;
    header.querySelector('a, button, input, summary')?.focus();
  });

  if (!topicToggle) return;
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let hoverSuppressed = false;
  let pointerInside = false;
  const setRailState = (event, hasFocus = topicToggle.matches(':focus-within')) => {
    const state = readerRailState({ event, hasHover: pointerInside, hasFocus, hoverSuppressed });
    topicToggle.open = state.open;
    hoverSuppressed = state.hoverSuppressed;
  };

  topicToggle.addEventListener('pointerenter', (event) => {
    if (!supportsHover || event.pointerType !== 'mouse') return;
    pointerInside = true;
    setRailState('enter');
  });
  topicToggle.addEventListener('pointerleave', (event) => {
    if (!supportsHover || event.pointerType !== 'mouse') return;
    pointerInside = false;
    setRailState('leave');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !topicToggle.open) return;
    setRailState('escape');
    event.preventDefault();
  });
}

if (typeof document !== 'undefined') {
  initializeSearch();
  initializeQuizzes();
  initializeReaderNavigation();
}
