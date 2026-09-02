import {
  EditorState,
  Range,
  StateField,
} from '@codemirror/state';

import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from '@codemirror/view';

class VariableChipWidget extends WidgetType {

  constructor(readonly variableName: string) {
    super();
  }

  toDOM(): HTMLElement {
    const chip = document.createElement('span');

    chip.className = 'cm-variable-chip';

    const icon = document.createElement('span');
    icon.className = 'cm-variable-chip-icon';
    icon.textContent = 'data_array';

    const text = document.createElement('span');
    text.className = 'cm-variable-chip-text';
    text.textContent = this.variableName;

    chip.appendChild(icon);
    chip.appendChild(text);

    return chip;
  }

  override eq(other: VariableChipWidget): boolean {
    return other instanceof VariableChipWidget && other.variableName === this.variableName;
  }

  /**
   * Prevent CodeMirror from trying to edit the content
   * inside the widget itself.
   */
  override ignoreEvent(): boolean {
    return false;
  }
}

export const variableDecorations = StateField.define<DecorationSet>({
  create(state) {
    return buildVariableDecorations(state);
  },
  update(decorations, transaction) {
    if (!transaction.docChanged) return decorations;
    return buildVariableDecorations(transaction.state);
  },
  provide: field => EditorView.decorations.from(field),
});

export function buildVariableDecorations(state: EditorState): DecorationSet {
  const decorations: Range<Decoration>[] = [];
  const text = state.doc.toString();

  // Matches:
  //
  // {{name}}
  // {{gameScore}}
  // {{some_variable}}
  // {{some-variable}}
  //
  // const regex = /\{\{([^{}]+)\}\}/g;
  // const regex = /\[\[([^[]]+)]]/g;
  const regex = /\[\[([^\]]*)]]/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const fullMatch = match[0];
    const variableName = match[1].trim();

    const from = match.index;
    const to = from + fullMatch.length;

    decorations.push(
      Decoration.replace({
        widget: new VariableChipWidget(variableName),
        // Don't let the cursor get stuck inside the widget.
        inclusive: false,
        // Give CodeMirror a reasonable estimate of its size.
        block: false,
      }).range(from, to),
    );
  }
  return Decoration.set(decorations, true);
}
