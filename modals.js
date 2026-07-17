/* Shared experiment modals: fetches /modals.html, injects it, and wires
   every [data-modal] trigger (catalog cards + homepage carousel cards)
   to open the popup in place. Also supports deep links via #m-… hashes. */
(function () {
  fetch('/modals.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      document.body.insertAdjacentHTML('beforeend', html);
      init();
    });

  function init() {
    var overlay = document.getElementById('overlay');
    var modals = overlay.querySelectorAll('.modal');

    function closeAll() {
      overlay.classList.remove('open');
      modals.forEach(function (m) { m.classList.remove('open'); });
      document.body.style.overflow = '';
      if (location.hash) history.replaceState(null, '', location.pathname);
    }
    function open(id) {
      var m = document.getElementById(id);
      if (!m) return;
      modals.forEach(function (x) { x.classList.remove('open'); });
      m.classList.add('open');
      overlay.classList.add('open');
      overlay.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    }

    document.querySelectorAll('[data-modal]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        open(el.getAttribute('data-modal'));
      });
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeAll();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
    if (location.hash) open(location.hash.slice(1));
  }
})();
