"""Validated didactic-guide data and safe HTML for published lessons."""

import html
import json


LABELS = (
    "Tema", "Objetivo", "Conceptos", "Ejemplo", "Práctica", "Tarea", "Quiz",
    "Conclusión", "Siguiente tema",
)


def load_lesson_sections(path, unit_ids):
    """Load one complete, non-empty ordered guide for each published unit."""
    data = json.loads(path.read_text(encoding="utf-8"))
    if data.get("schemaVersion") != 1 or set(data) != {"schemaVersion", "sections"}:
        raise ValueError("Invalid lesson sections schema")
    sections = data["sections"]
    if set(sections) != set(unit_ids):
        raise ValueError("Lesson sections must match the published unit ids")
    for unit_id, guide in sections.items():
        if list(guide) != list(LABELS):
            raise ValueError(f"Lesson sections must use the required order: {unit_id}")
        if any(not isinstance(value, str) or not value.strip() for value in guide.values()):
            raise ValueError(f"Lesson sections must be non-empty: {unit_id}")
    return sections


def render_lesson_guide(guide, next_href, next_title):
    """Render trusted, validated guide prose while escaping every configuration value."""
    cards = []
    for label in LABELS:
        text = html.escape(guide[label], quote=True)
        if label == "Quiz":
            text += ' <a href="#evaluaciones">Ir a la evaluación</a>.'
        elif label == "Siguiente tema":
            text += f' <a href="{html.escape(next_href, quote=True)}">{html.escape(next_title, quote=True)}</a>.'
        cards.append(f'<div class="lesson-guide-item"><h2>{label}</h2><p>{text}</p></div>')
    return '<section class="lesson-guide" aria-label="Guía didáctica">' + "".join(cards) + "</section>"
