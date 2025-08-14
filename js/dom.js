// ASCII DOM tree for any selected page
document.addEventListener('DOMContentLoaded', () => {
  const pageSelect = document.getElementById('pageSelect');
  const pre = document.getElementById('domPre');
  const status = document.getElementById('status');

  async function load(page) {
    status.textContent = `Loading ${page}…`;
    pre.textContent = 'Loading…';

    try {
      const res = await fetch(page, { cache: 'no-cache' });
      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const lines = [];
      lines.push('[DOCUMENT]');

      if (doc.documentElement) {
        renderElement(doc.documentElement, true, '');
      }

      pre.textContent = lines.join('\n');
      status.textContent = `Showing ${page} (elements only)`;

      function renderElement(el, isLast, prefix) {
        lines.push(prefix + (isLast ? '└── ' : '├── ') + labelFor(el));
        const childPrefix = prefix + (isLast ? '    ' : '│   ');
        const children = Array.from(el.children); // elements only
        children.forEach((child, idx) => {
          const last = idx === children.length - 1;
          renderElement(child, last, childPrefix);
        });
      }

      function labelFor(el) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const classes =
          el.className && typeof el.className === 'string'
            ? '.' + el.className.trim().split(/\s+/).filter(Boolean).join('.')
            : '';
        return `<${tag}>${id}${classes}`;
      }
    } catch (e) {
      console.error(e);
      pre.textContent = `Failed to load ${page}\n${e}`;
      status.textContent = 'Error';
    }
  }

  pageSelect.addEventListener('change', () => load(pageSelect.value));
  load(pageSelect.value);
});