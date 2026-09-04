(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');
  if (!nav) return;
  nav.id = 'header-navigation';
  const button = document.createElement('button');
  button.className = 'menu-toggle';
  button.type = 'button';
  button.setAttribute('aria-controls', nav.id);
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'メニューを開く');
  button.innerHTML = '<span></span><span></span><span></span>';
  header.insertBefore(button, nav);
  const setOpen = open => {
    header.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) { setOpen(false); button.focus(); }
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) setOpen(false); });
  matchMedia('(max-width: 800px)').addEventListener('change', () => setOpen(false));
  header.classList.add('menu-ready');
})();
