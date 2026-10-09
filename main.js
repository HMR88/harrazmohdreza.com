// Shared site behavior: mobile nav, footer year, external links, phase selector.
(function () {
  var toggle = document.querySelector('.navtoggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }

  // Harden external links: never leak referrer or expose window.opener.
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== location.hostname) {
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Phase selector (home page, phone layout): WAI-ARIA tabs with arrow-key support.
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.phasesel__tabs [role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) { tab.focus(); }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t, false); });
    t.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') { next = tabs[(i + 1) % tabs.length]; }
      if (e.key === 'ArrowLeft') { next = tabs[(i + tabs.length - 1) % tabs.length]; }
      if (e.key === 'Home') { next = tabs[0]; }
      if (e.key === 'End') { next = tabs[tabs.length - 1]; }
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
})();
