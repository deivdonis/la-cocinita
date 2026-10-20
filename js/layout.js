/* ==========================================================================
   LA COCINITA · CABECERA, PIE E ICONOS COMUNES
   --------------------------------------------------------------------------
   La cabecera y el pie son iguales en todas las páginas, así que se generan
   desde aquí. Cada página solo necesita:
     <div id="cabecera"></div>  ...  <div id="pie"></div>
   Los iconos (SVG) también están aquí, en window.ICONOS, para reutilizarlos.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.SITE_CONFIG;

  function svg(contenido, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"' + (extra || "") + ">" + contenido + "</svg>";
  }
  function svgRelleno(path) {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + path + '"/></svg>';
  }

  var I = {
    olla: '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="23" fill="#f8f5ee"/><circle cx="24" cy="24" r="20.5" fill="none" stroke="#7c1d2c" stroke-width="1.5"/><path d="M15 9c-1.5 2 1.5 3 0 5M24 7c-1.5 2 1.5 3 0 5M33 9c-1.5 2 1.5 3 0 5" fill="none" stroke="#7c1d2c" stroke-width="1.6" stroke-linecap="round"/><path d="M10 20h28v3c0 8-6 14-14 14s-14-6-14-14v-3z" fill="#1d4a37"/><path d="M7 21.5h3M38 21.5h3" stroke="#1d4a37" stroke-width="2.6" stroke-linecap="round"/><rect x="9" y="17" width="30" height="3.4" rx="1.7" fill="#12301f"/><path d="M14 27h20" stroke="#d8a440" stroke-width="1.4" stroke-dasharray="2 2.4"/></svg>',
    menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    cerrar: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    telefono: svg('<path d="M5 4h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>'),
    whatsapp: svgRelleno("M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A9.9 9.9 0 1 0 12 2zm0 1.8a8.1 8.1 0 1 1-4.2 15l-.3-.2-3 .8.8-3-.2-.3A8.1 8.1 0 0 1 12 3.8zm-3.3 4c-.2 0-.5 0-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.6 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.3-1.8-.9c-.2 0-.4-.1-.6.2l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.5z"),
    instagram: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
    facebook: svgRelleno("M13.5 21.5v-7.7h2.6l.4-3h-3V8.9c0-.9.3-1.5 1.5-1.5h1.6V4.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7h3.1z"),
    tiktok: svgRelleno("M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3a7 7 0 0 1-3.9-1.2v6a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.7 2.3V3h2.9z"),
    izquierda: svg('<path d="M15 5l-7 7 7 7"/>'),
    derecha: svg('<path d="M9 5l7 7-7 7"/>'),
    mas: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3M11 8v6M8 11h6"/>'),
    menos: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3M8 11h6"/>'),
    ajustar: svg('<path d="M4 12h16M7 9l-3 3 3 3M17 9l3 3-3 3M4 5v14M20 5v14" stroke-width="1.6"/>'),
    descargar: svg('<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>'),
    pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    metro: svg('<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8.5 14h.01M15.5 14h.01M8 21l2-4M16 21l-2-4"/>'),
    wifi: svg('<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.3" r="1" fill="currentColor"/>'),
    qr: svg('<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5M20.5 14.5v.01M14.5 20.5h.01M17.5 20.5h3v-3"/>'),
    movil: svg('<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M9 8.5l2 2 4-4"/>'),
    mano: svg('<path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4.5a1.5 1.5 0 0 1 3 0v6M14 10.5V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7.5-6.5 7.5-2.4 0-4-1-5.4-3L3.6 13.6a1.5 1.5 0 0 1 2.4-1.8L8 14"/>'),
    campana: svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 20.5a2 2 0 0 0 4 0M12 3v2"/>'),
    carta: svg('<path d="M4 4.5h6a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5H4zM20 4.5h-6a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5H20z"/>'),
    mensaje: svg('<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9.5h8M8 12.5h5"/>'),
    microfono: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>'),
    cuenta: svg('<path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z"/><path d="M9 8h6M9 11.5h6M9 15h3"/>'),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>'),
    cesta: svg('<path d="M3.5 10h17l-1.6 9a1.5 1.5 0 0 1-1.5 1.2H6.6A1.5 1.5 0 0 1 5.1 19z"/><path d="M8 10l3-6M16 10l-3-6M9 14v3M12 14v3M15 14v3"/>'),
    llama: svg('<path d="M12 21c-3.6 0-6-2.5-6-5.8 0-3.6 3-5.6 3.5-9.2 2 1.2 3 3 3 5 1-1 1.4-2.2 1.4-3.4 2.3 1.6 4.1 4.4 4.1 7.6 0 3.3-2.4 5.8-6 5.8z"/><path d="M12 21c-1.4 0-2.4-1-2.4-2.4 0-1.6 1.4-2.4 2.4-4 1 1.6 2.4 2.4 2.4 4 0 1.4-1 2.4-2.4 2.4z"/>'),
    casa: svg('<path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-4.5a2 2 0 0 1 4 0V20"/>'),
    flecha: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    flechaIzq: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    externo: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V7.5A1.5 1.5 0 0 1 5.5 6H10"/>')
  };
  window.ICONOS = I;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  window.escaparHTML = esc;

  var pagina = document.body.getAttribute("data-pagina");
  var enInicio = pagina === "home";
  // En la portada los enlaces son anclas (#carta); en el resto, index.html#carta
  function ancla(id) { return (enInicio ? "" : "index.html") + "#" + id; }

  var enlaces = [
    { id: "inicio", clave: "nav.home" },
    { id: "nosotros", clave: "nav.about" },
    { id: "carta", clave: "nav.menu" },
    { href: "servicio.html", clave: "nav.service", pagina: "service" },
    { id: "galeria", clave: "nav.gallery" },
    { id: "horario", clave: "nav.hours" },
    { id: "ubicacion", clave: "nav.location" }
  ];

  var htmlNav = enlaces.map(function (e) {
    var href = e.href || ancla(e.id);
    var actual = e.pagina && e.pagina === pagina ? ' aria-current="page"' : "";
    return '<li><a href="' + href + '" data-i18n="' + e.clave + '"' + (e.id ? ' data-seccion="' + e.id + '"' : "") + actual + "></a></li>";
  }).join("") + '<li class="nav-reservar"><a href="' + ancla("reservas") + '" data-i18n="nav.book"></a></li>';

  var cabecera = document.getElementById("cabecera");
  if (cabecera) {
    cabecera.outerHTML =
      '<header class="site-header">' +
        '<div class="contenedor site-header__barra">' +
          '<a class="logo" href="' + ancla("inicio") + '">' + I.olla + "<span>" + esc(C.nombre) + "</span></a>" +
          '<div class="cabecera-acciones">' +
            '<div class="selector-idioma" role="group" data-i18n-attr="aria-label:nav.lang" aria-label="Idioma"></div>' +
            '<button type="button" class="boton-menu" aria-expanded="false" aria-controls="nav-principal" data-i18n-attr="aria-label:nav.open" aria-label="Abrir menú">' +
              '<span class="icono-abrir">' + I.menu + '</span><span class="icono-cerrar">' + I.cerrar + "</span>" +
            "</button>" +
          "</div>" +
          '<nav class="nav-principal" id="nav-principal" data-i18n-attr="aria-label:nav.main" aria-label="Navegación principal"><ul>' + htmlNav + "</ul></nav>" +
        "</div>" +
        '<div class="franja-azulejo" aria-hidden="true"></div>' +
      "</header>";
  }

  var redes = [
    { clave: "instagram", nombre: "Instagram" },
    { clave: "facebook", nombre: "Facebook" },
    { clave: "tiktok", nombre: "TikTok" }
  ].filter(function (r) { return C.redes && C.redes[r.clave]; });

  var htmlRedes = redes.map(function (r) {
    return '<li><a href="' + esc(C.redes[r.clave]) + '" target="_blank" rel="noopener" aria-label="' + r.nombre + '" title="' + r.nombre + '">' + I[r.clave] + "</a></li>";
  }).join("");

  var c = C.contacto;
  var pie = document.getElementById("pie");
  if (pie) {
    pie.outerHTML =
      '<footer class="site-footer">' +
        '<div class="franja-azulejo" aria-hidden="true"></div>' +
        '<div class="contenedor pie">' +
          "<div>" +
            '<a class="logo" href="' + ancla("inicio") + '">' + I.olla + "<span>" + esc(C.nombre) + "</span></a>" +
            '<p data-i18n="footer.tagline"></p>' +
          "</div>" +
          "<div>" +
            '<h2 data-i18n="footer.contact"></h2>' +
            "<address>" + esc(c.calle) + "<br>" + esc(c.codigoPostal) + " " + esc(c.ciudad) + "<br>" +
              '<a href="tel:' + esc(c.telefonoEnlace) + '">' + esc(c.telefono) + "</a><br>" +
              '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" +
            "</address>" +
          "</div>" +
          (htmlRedes ? '<div><h2 data-i18n="footer.follow"></h2><ul class="redes">' + htmlRedes + "</ul></div>" : "") +
          '<nav data-i18n-attr="aria-label:footer.legalNav" aria-label="Información legal">' +
            '<h2 data-i18n="footer.legalNav"></h2>' +
            "<ul>" +
              '<li><a href="aviso-legal.html" data-i18n="footer.legal"></a></li>' +
              '<li><a href="privacidad.html" data-i18n="footer.privacy"></a></li>' +
              '<li><a href="cookies.html" data-i18n="footer.cookies"></a></li>' +
              '<li><button type="button" class="enlace-boton" data-abrir-cookies data-i18n="footer.cookieSettings"></button></li>' +
            "</ul>" +
          "</nav>" +
        "</div>" +
        '<div class="pie__final"><div class="contenedor">© ' + new Date().getFullYear() + " " + esc(C.nombre) + '. <span data-i18n="footer.rights"></span></div></div>' +
      "</footer>";
  }

  // Iconos declarados en el HTML con <span data-icono="telefono"></span>
  document.querySelectorAll("[data-icono]").forEach(function (el) {
    var nombre = el.getAttribute("data-icono");
    if (I[nombre]) el.outerHTML = I[nombre];
  });
})();
