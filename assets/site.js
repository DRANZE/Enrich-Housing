/* Enrich Housing: shared behaviour (mobile menu, Projects dropdown, callback popup, lead forms) */
(function () {
  // OPTIONAL: set this to a form endpoint (Formspree, Web3Forms, your CRM webhook...) to receive leads.
  // Example: window.ENRICH_FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx';
  window.ENRICH_FORM_ENDPOINT = window.ENRICH_FORM_ENDPOINT || '';

  var d = document;

  // Mobile menu
  var menuBtn = d.getElementById('menuBtn');
  var nav = d.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function () {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Projects dropdown (hover on desktop via CSS, click/tap toggles)
  var dd = d.querySelector('.dd');
  var ddb = dd && dd.querySelector('.ddb');
  if (ddb) {
    ddb.addEventListener('click', function (e) {
      e.stopPropagation();
      dd.classList.toggle('open');
    });
    d.addEventListener('click', function (e) {
      if (!e.target.closest('.dd')) dd.classList.remove('open');
    });
  }

  // Collect and send a lead form (returns false if the phone number is missing)
  function collect(btn) {
    var box = btn.closest('.cd') || btn.parentNode;
    var data = {};
    var phone = null;
    box.querySelectorAll('input,select').forEach(function (el) {
      var lab = el.previousElementSibling;
      var key = (lab && lab.tagName === 'LABEL' ? lab.textContent : el.id) || el.id;
      data[key] = el.value;
      if (el.type === 'tel' && !phone) phone = el;
    });
    if (phone && !phone.value.trim()) { phone.focus(); return null; }
    data.page = location.pathname;
    return data;
  }
  function send(data) {
    var ep = window.ENRICH_FORM_ENDPOINT;
    if (!ep) return;
    try {
      fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) });
    } catch (err) { /* ignore */ }
  }

  // Callback popup (home page)
  var pop = d.getElementById('popup');
  if (pop) {
    var closed = false;
    try { closed = sessionStorage.getItem('enrichPopupClosed') === '1'; } catch (err) {}
    var show = function () { pop.style.display = 'flex'; };
    var hide = function () {
      pop.style.display = 'none';
      try { sessionStorage.setItem('enrichPopupClosed', '1'); } catch (err) {}
    };
    if (!closed) setTimeout(show, 1200);
    pop.addEventListener('click', function (e) { if (e.target === pop) hide(); });
    ['popClose', 'popClose2'].forEach(function (id) {
      var b = d.getElementById(id);
      if (b) b.addEventListener('click', hide);
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
    var ps = d.getElementById('popSubmit');
    if (ps) ps.addEventListener('click', function () {
      var data = collect(ps);
      if (!data) return;
      send(data);
      d.getElementById('popForm').style.display = 'none';
      d.getElementById('popThanks').style.display = 'block';
    });
  }

  // Other lead forms (Contact section, Enrich Eva page)
  d.querySelectorAll('[data-lead]').forEach(function (btn) {
    if (btn.id === 'popSubmit') return;
    btn.addEventListener('click', function () {
      var data = collect(btn);
      if (!data) return;
      send(data);
      btn.textContent = 'Thank you, we’ll call you shortly';
      btn.disabled = true;
    });
  });
})();
