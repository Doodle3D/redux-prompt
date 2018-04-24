const PREFIX = '___PROMPT___';

export const OPEN = `${PREFIX}_OPEN`;
export function open(content) {
  return { type: OPEN, content };
}

export const SUBMIT = `${PREFIX}_SUBMIT`;
export function submit(data) {
  return { type: SUBMIT, data };
}

export const REJECT = `${PREFIX}_REJECT`;
export function reject() {
  return { type: REJECT };
}
