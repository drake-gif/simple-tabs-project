class Tabs {
  constructor(root) {
    this.tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    this.panels = this.tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.select(index));
      tab.addEventListener('keydown', event => this.onKeydown(event, index));
    });
  }

  select(index) {
    this.tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', active);
      tab.tabIndex = active ? 0 : -1;
      this.panels[i].hidden = !active;
    });
  }

  onKeydown(event, index) {
    const last = this.tabs.length - 1;
    let next = null;

    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;

    if (next !== null) {
      event.preventDefault();
      this.select(next);
      this.tabs[next].focus();
    }
  }
}

document.querySelectorAll('.tabs').forEach(el => new Tabs(el));
