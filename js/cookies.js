/* ==========================================================================
   LA COCINITA · CONSENTIMIENTO DE COOKIES
   --------------------------------------------------------------------------
   Banner con Aceptar / Rechazar / Configurar. La elección se guarda en
   localStorage ("lc_cookies") durante 12 meses.
   Categorías: "mapas" (Google Maps). Las técnicas siempre están activas.
   Otros scripts pueden preguntar:  window.Consentimiento.tiene("mapas")
   y escuchar el evento "consentimiento" en document.
   ========================================================================== */

(function () {
  "use strict";

  var CLAVE = "lc_cookies";
  var DURACION_MS = 365 * 24 * 60 * 60 * 1000;
  var I = window.ICONOS || {};

  function leer() {
    try {
      var d = JSON.parse(localStorage.getItem(CLAVE) || "null");
      if (d && d.fecha && Date.now() - d.fecha < DURACION_MS) return d;
    } catch (e) { /* nada */ }
    return null;
  }

  var estado = leer();

  function guardar(mapas) {
    estado = { version: 1, mapas: !!mapas, fecha: Date.now() };
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* nada */ }
    cerrarBanner();
    document.dispatchEvent(new CustomEvent("consentimiento", { detail: estado }));
  }

  var banner = null;
  var panel = null;

  function crearBanner() {
    if (banner) return;
    banner = document.createElement("section");
    banner.className = "banner-cookies";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-labelledby", "cookies-titulo");
    banner.innerHTML =
      '<h2 id="cookies-titulo" data-i18n="cookies.title"></h2>' +
      '<p data-i18n="cookies.text"></p>' +
      '<a href="cookies.html" data-i18n="cookies.policy"></a>' +
      '<div class="fila-botones">' +
        '<button type="button" class="btn btn--contorno" data-accion="rechazar" data-i18n="cookies.reject"></button>' +
        '<button type="button" class="btn btn--contorno" data-accion="configurar" data-i18n="cookies.configure"></button>' +
        '<button type="button" class="btn btn--primario" data-accion="aceptar" data-i18n="cookies.accept"></button>' +
      "</div>";
    banner.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-accion]");
      if (!b) return;
      var a = b.getAttribute("data-accion");
      if (a === "aceptar") guardar(true);
      else if (a === "rechazar") guardar(false);
      else abrirPanel();
    });
    document.body.appendChild(banner);
    if (window.I18N) window.I18N.aplicar(banner);
  }

  function cerrarBanner() {
    if (banner) { banner.remove(); banner = null; }
  }

  function crearPanel() {
    if (panel) return panel;
    panel = document.createElement("dialog");
    panel.className = "panel-cookies";
    panel.setAttribute("aria-labelledby", "panel-cookies-titulo");
    panel.innerHTML =
      '<form method="dialog" class="panel-cookies__cuerpo">' +
        '<h2 id="panel-cookies-titulo" data-i18n="cookies.panelTitle"></h2>' +
        '<div class="opcion-cookie">' +
          '<div><strong id="ck-tec" data-i18n="cookies.necessary"></strong><p data-i18n="cookies.necessaryDesc"></p></div>' +
          '<label class="interruptor"><input type="checkbox" checked disabled aria-labelledby="ck-tec"><span></span></label>' +
        "</div>" +
        '<div class="opcion-cookie">' +
          '<div><strong id="ck-mapas" data-i18n="cookies.maps"></strong><p data-i18n="cookies.mapsDesc"></p></div>' +
          '<label class="interruptor"><input type="checkbox" name="mapas" aria-labelledby="ck-mapas"><span></span></label>' +
        "</div>" +
        '<div class="fila-botones">' +
          '<button type="button" class="btn btn--contorno" data-accion="rechazar" data-i18n="cookies.reject"></button>' +
          '<button type="button" class="btn btn--contorno" data-accion="guardar" data-i18n="cookies.save"></button>' +
          '<button type="button" class="btn btn--primario" data-accion="aceptar" data-i18n="cookies.accept"></button>' +
        "</div>" +
      "</form>";
    panel.addEventListener("click", function (ev) {
      if (ev.target === panel) { panel.close(); return; } // clic fuera
      var b = ev.target.closest("[data-accion]");
      if (!b) return;
      var a = b.getAttribute("data-accion");
      if (a === "aceptar") guardar(true);
      else if (a === "rechazar") guardar(false);
      else guardar(panel.querySelector('input[name="mapas"]').checked);
      panel.close();
    });
    document.body.appendChild(panel);
    return panel;
  }

  function abrirPanel() {
    var p = crearPanel();
    if (window.I18N) window.I18N.aplicar(p);
    p.querySelector('input[name="mapas"]').checked = !!(estado && estado.mapas);
    if (typeof p.showModal === "function") p.showModal();
    else p.setAttribute("open", "");
  }

  document.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-abrir-cookies]")) abrirPanel();
  });

  if (!estado) crearBanner();

  window.Consentimiento = {
    tiene: function (categoria) { return !!(estado && estado[categoria]); },
    decidido: function () { return !!estado; },
    aceptar: function (categoria) {
      var mapas = categoria === "mapas" ? true : !!(estado && estado.mapas);
      guardar(mapas);
    },
    abrirPanel: abrirPanel
  };

  // Cuando cambie el idioma, traducir el banner y el panel si están abiertos
  if (window.I18N) {
    window.I18N.alCambiar(function () {
      if (banner) window.I18N.aplicar(banner);
      if (panel) window.I18N.aplicar(panel);
    });
  }
})();
