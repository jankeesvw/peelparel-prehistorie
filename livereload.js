// Herlaadt de pagina automatisch als er iets verandert in de map van deze game.
// Werkt alleen lokaal via bin/serve; op GitHub Pages doet dit script niets.
(function () {
  if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
  var dir = location.pathname.split('/').filter(Boolean)[0] || '';
  var last = null;
  setInterval(function () {
    fetch('/__mtime?dir=' + encodeURIComponent(dir), { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        if (last !== null && t !== last) location.reload();
        last = t;
      })
      .catch(function () {});
  }, 500);
})();
