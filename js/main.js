/* ==========================================================================
   LA COCINITA · FUNCIONES GENERALES
   --------------------------------------------------------------------------
   Menú móvil, selector de idioma, enlaces de teléfono/WhatsApp, horario,
   galería con ampliación, mapa (con consentimiento) y datos schema.org.
   Todo se alimenta de js/config.js y de los textos de /i18n/.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  var I18N = window.I18N;
  var I = window.ICONOS;
  var esc = window.escaparHTML;
  var t = function (k, v) { return I18N.t(k, v); };


  /* ---------- Menú móvil ---------- */
  var boton = document.querySelector(".boton-menu");
  var nav = document.getElementById("nav-principal");

  function cerrarMenu() {
    if (!nav || !boton) return;
    nav.classList.remove("abierta");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", t("nav.open") || "Abrir menú");
  }
  if (boton && nav) {
    boton.addEventListener("click", function () {
      var abierto = nav.classList.toggle("abierta");
      boton.setAttribute("aria-expanded", String(abierto));
      boton.setAttribute("aria-label", t(abierto ? "nav.close" : "nav.open"));
    });
    nav.addEventListener("click", function (ev) { if (ev.target.closest("a")) cerrarMenu(); });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && nav.classList.contains("abierta")) { cerrarMenu(); boton.focus(); }
    });
    document.addEventListener("click", function (ev) {
      if (nav.classList.contains("abierta") && !ev.target.closest(".site-header")) cerrarMenu();
    });
  }

  /* ---------- Sección activa en el menú (solo portada) ---------- */
  if (document.body.getAttribute("data-pagina") === "home" && "IntersectionObserver" in window) {
    var enlacesNav = {};
    document.querySelectorAll(".nav-principal a[data-seccion]").forEach(function (a) {
      enlacesNav[a.getAttribute("data-seccion")] = a;
    });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var a = enlacesNav[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          Object.keys(enlacesNav).forEach(function (k) { enlacesNav[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(enlacesNav).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  /* ---------- Selector de idioma ---------- */
  function nombreIdioma(codigo) {
    try {
      var n = new Intl.DisplayNames([codigo], { type: "language" }).of(codigo);
      return n.charAt(0).toUpperCase() + n.slice(1);
    } catch (e) { return codigo.toUpperCase(); }
  }

  function pintarSelector() {
    var cont = document.querySelector(".selector-idioma");
    if (!cont) return;
    var lista = I18N.disponibles;
    if (lista.length < 2) { cont.hidden = true; return; }
    cont.innerHTML = lista.map(function (c) {
      return '<button type="button" lang="' + c + '" data-idioma="' + c + '" aria-pressed="' + (c === I18N.idioma) + '" title="' + esc(nombreIdioma(c)) + '" aria-label="' + esc(nombreIdioma(c)) + '">' + c.toUpperCase() + "</button>";
    }).join("");
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-idioma]");
    if (b) I18N.cambiar(b.getAttribute("data-idioma"));
  });

  /* ---------- Teléfono, WhatsApp, dirección ---------- */
  var c = C.contacto;
  var direccionCompleta = c.calle + ", " + c.codigoPostal + " " + c.ciudad;
  var urlMaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.mapa.consulta);

  function pintarContacto() {
    document.querySelectorAll("[data-tel]").forEach(function (a) { a.href = "tel:" + c.telefonoEnlace; });
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(t("book.waMessage"));
      a.target = "_blank";
      a.rel = "noopener";
    });
    document.querySelectorAll("[data-telefono-texto]").forEach(function (el) { el.textContent = c.telefono; });
    document.querySelectorAll("[data-direccion]").forEach(function (el) {
      el.innerHTML = esc(c.calle) + "<br>" + esc(c.codigoPostal) + " " + esc(c.ciudad);
    });
    document.querySelectorAll("[data-maps-link]").forEach(function (a) {
      a.href = urlMaps; a.target = "_blank"; a.rel = "noopener";
    });
  }

  /* ---------- Pizarra del menú del día ---------- */
  var pizarra = document.querySelector(".pizarra");
  if (pizarra && !(C.menuDelDia && C.menuDelDia.mostrar)) pizarra.hidden = true;

  /* ---------- Horario ---------- */
  function pintarHorario() {
    var cuerpo = document.querySelector("[data-horario]");
    if (!cuerpo) return;
    var orden = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var hoy = orden[new Date().getDay()];
    cuerpo.innerHTML = C.horario.map(function (d) {
      var esHoy = d.dia === hoy;
      var horas = d.turnos && d.turnos.length
        ? d.turnos.map(function (h) { return "<span>" + esc(h) + "</span>"; }).join("")
        : '<span class="horario__cerrado">' + esc(t("hours.closed")) + "</span>";
      return '<tr class="' + (esHoy ? "hoy" : "") + '"' + (esHoy ? ' aria-current="date"' : "") + ">" +
        '<th scope="row">' + esc(t("hours.days." + d.dia)) +
        (esHoy ? '<span class="etiqueta-hoy">' + esc(t("hours.today")) + "</span>" : "") + "</th>" +
        "<td>" + horas + "</td></tr>";
    }).join("");
  }

  /* ---------- Galería y visor ampliado ---------- */
  var galeria = document.querySelector("[data-galeria]");
  var lightbox = document.querySelector(".lightbox");
  var indice = 0;

  function pintarGaleria() {
    if (!galeria) return;
    galeria.innerHTML = C.galeria.map(function (f, i) {
      var alt = t("gallery.alt." + f.alt);
      return '<li><button type="button" data-foto="' + i + '" aria-label="' + esc(t("gallery.open") + alt) + '">' +
        '<img src="' + esc(f.archivo) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" width="1200" height="900"></button></li>';
    }).join("");
  }

  function mostrarFoto(i) {
    var total = C.galeria.length;
    indice = (i + total) % total;
    var f = C.galeria[indice];
    var img = lightbox.querySelector("img");
    img.src = f.archivo;
    img.alt = t("gallery.alt." + f.alt);
    lightbox.querySelector("[data-pie-foto]").textContent = img.alt;
    lightbox.querySelector(".lightbox__contador").textContent = t("lightbox.counter", { n: indice + 1, total: total });
  }

  if (galeria && lightbox) {
    galeria.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-foto]");
      if (!b) return;
      mostrarFoto(Number(b.getAttribute("data-foto")));
      lightbox.showModal();
    });
    lightbox.querySelector(".lightbox__cerrar").addEventListener("click", function () { lightbox.close(); });
    lightbox.querySelector(".lightbox__anterior").addEventListener("click", function () { mostrarFoto(indice - 1); });
    lightbox.querySelector(".lightbox__siguiente").addEventListener("click", function () { mostrarFoto(indice + 1); });
    lightbox.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") mostrarFoto(indice - 1);
      if (ev.key === "ArrowRight") mostrarFoto(indice + 1);
    });
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox || ev.target.tagName === "FIGURE") lightbox.close();
    });
    lightbox.addEventListener("close", function () {
      var b = galeria.querySelector('[data-foto="' + indice + '"]');
      if (b) b.focus();
    });
    // Deslizar con el dedo
    var x0 = null;
    lightbox.addEventListener("touchstart", function (ev) { x0 = ev.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", function (ev) {
      if (x0 === null) return;
      var dx = ev.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mostrarFoto(indice + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Mapa (solo con consentimiento) ---------- */
  var mapa = document.querySelector("[data-mapa]");
  function pintarMapa() {
    if (!mapa) return;
    var aviso = mapa.querySelector(".mapa__aviso");
    var iframe = mapa.querySelector("iframe");
    if (window.Consentimiento && window.Consentimiento.tiene("mapas")) {
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(C.mapa.consulta) + "&output=embed";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.setAttribute("allowfullscreen", "");
        mapa.appendChild(iframe);
      }
      iframe.title = t("location.mapTitle");
      if (aviso) aviso.hidden = true;
    } else {
      if (iframe) iframe.remove();
      if (aviso) aviso.hidden = false;
    }
  }
  document.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-cargar-mapa]")) window.Consentimiento.aceptar("mapas");
  });
  document.addEventListener("consentimiento", pintarMapa);

  /* ---------- schema.org (Restaurant) ---------- */
  function pintarSchema() {
    if (document.body.getAttribute("data-pagina") !== "home") return;
    var dias = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
    var horarios = [];
    C.horario.forEach(function (d) {
      (d.turnos || []).forEach(function (turno) {
        var p = turno.split(/[–-]/);
        if (p.length === 2) horarios.push({ "@type": "OpeningHoursSpecification", dayOfWeek: dias[d.dia], opens: p[0].trim(), closes: p[1].trim() === "00:00" ? "23:59" : p[1].trim() });
      });
    });
    var datos = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: C.nombre,
      description: t("meta.home.description"),
      url: C.urlPublica,
      image: C.urlPublica + "img/og-imagen.jpg",
      logo: C.urlPublica + "img/favicon.svg",
      telephone: c.telefonoEnlace,
      email: c.email,
      servesCuisine: ["Spanish", "Traditional Spanish", "Madrid"],
      priceRange: "€€",
      acceptsReservations: "True",
      menu: C.urlPublica + C.carta.ruta,
      hasMenu: C.urlPublica + C.carta.ruta,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.calle,
        postalCode: c.codigoPostal,
        addressLocality: c.ciudad,
        addressRegion: c.region,
        addressCountry: c.pais
      },
      geo: { "@type": "GeoCoordinates", latitude: C.mapa.latitud, longitude: C.mapa.longitud },
      openingHoursSpecification: horarios,
      sameAs: Object.keys(C.redes || {}).map(function (k) { return C.redes[k]; }).filter(Boolean)
    };
    var s = document.getElementById("schema-restaurante");
    if (!s) {
      s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = "schema-restaurante";
      document.head.appendChild(s);
    }
    s.textContent = JSON.stringify(datos);
  }

  /* ---------- Arranque ---------- */
  pintarContacto();
  I18N.alCambiar(function () {
    pintarSelector();
    pintarContacto();
    pintarHorario();
    pintarGaleria();
    pintarMapa();
    pintarSchema();
    if (lightbox && lightbox.open) mostrarFoto(indice);
    if (boton) boton.setAttribute("aria-label", t(nav.classList.contains("abierta") ? "nav.close" : "nav.open"));
  });
  I18N.iniciar();
})();
