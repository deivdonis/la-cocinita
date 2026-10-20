/* ==========================================================================
   LA COCINITA · VISOR DE LA CARTA (PDF.js)
   --------------------------------------------------------------------------
   Muestra /carta/carta.pdf dentro de la página con PDF.js (desde CDN):
   pasar páginas, ampliar/reducir, ajustar al ancho y deslizar en móvil.
   - La URL lleva ?v=<versión> (js/config.js > carta.version) para que los
     navegadores no muestren una carta antigua guardada en caché.
   - Si el PDF no existe, muestra "Carta disponible próximamente".
   - PDF.js solo se descarga cuando la sección de la carta se acerca a la
     pantalla, para que la portada cargue rápido.
   ========================================================================== */

(function () {
  "use strict";

  var PDFJS_VERSION = "3.11.174";
  var PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/pdf.min.js";
  var WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/pdf.worker.min.js";

  var C = window.SITE_CONFIG;
  var I18N = window.I18N;
  var t = function (k, v) { return I18N.t(k, v); };

  var visor = document.querySelector("[data-visor-carta]");
  if (!visor) return;

  var urlPdf = C.carta.ruta + "?v=" + encodeURIComponent(C.carta.version);
  var lienzo = visor.querySelector(".visor__lienzo");
  var barra = visor.querySelector(".visor__barra");
  var pie = visor.querySelector(".visor__pie");
  var textoPagina = visor.querySelector(".visor__pagina");
  var bAnterior = visor.querySelector('[data-accion="anterior"]');
  var bSiguiente = visor.querySelector('[data-accion="siguiente"]');
  var bMas = visor.querySelector('[data-accion="mas"]');
  var bMenos = visor.querySelector('[data-accion="menos"]');
  var bAjustar = visor.querySelector('[data-accion="ajustar"]');
  var descargar = visor.querySelector("[data-descargar-carta]");

  descargar.href = urlPdf;
  descargar.setAttribute("download", C.carta.nombreDescarga || "carta.pdf");

  var ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
  var pdf = null;
  var pagina = 1;
  var zoom = 1;              // 1 = ajustado al ancho
  var tareaRender = null;
  var pendiente = false;
  var canvas = null;
  var estadoActual = "cargando"; // cargando | listo | proximamente | error

  function mostrarEstado(tipo) {
    estadoActual = tipo;
    barra.hidden = tipo !== "listo";
    if (tipo === "listo") return;
    var html;
    if (tipo === "cargando") {
      html = '<div class="spinner" aria-hidden="true"></div><span>' + t("menu.loading") + "</span>";
    } else if (tipo === "proximamente") {
      html = "<strong>" + t("menu.soon") + "</strong><span>" + t("menu.soonDetail") + "</span>";
      pie.hidden = true;
    } else {
      html = "<strong>" + t("menu.error") + '</strong><a class="btn btn--primario" href="' + urlPdf + '" target="_blank" rel="noopener">' + t("menu.openPdf") + "</a>";
    }
    lienzo.innerHTML = '<div class="visor__estado" role="status">' + html + "</div>";
  }

  function actualizarControles() {
    if (!pdf) return;
    textoPagina.textContent = t("menu.page", { n: pagina, total: pdf.numPages });
    bAnterior.disabled = pagina <= 1;
    bSiguiente.disabled = pagina >= pdf.numPages;
    bMenos.disabled = zoom <= ZOOMS[0];
    bMas.disabled = zoom >= ZOOMS[ZOOMS.length - 1];
    bAjustar.setAttribute("aria-pressed", String(zoom === 1));
  }

  function renderizar() {
    if (!pdf) return;
    if (tareaRender) { pendiente = true; return; }
    pdf.getPage(pagina).then(function (pag) {
      var base = pag.getViewport({ scale: 1 });
      var estilo = getComputedStyle(lienzo);
      var anchoDisponible = lienzo.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
      var escala = Math.max(0.2, (anchoDisponible / base.width) * zoom);
      var vp = pag.getViewport({ scale: escala });
      var ppp = Math.min(window.devicePixelRatio || 1, 3);

      if (!canvas) {
        lienzo.innerHTML = "";
        canvas = document.createElement("canvas");
        canvas.setAttribute("role", "img");
        lienzo.appendChild(canvas);
      }
      canvas.width = Math.floor(vp.width * ppp);
      canvas.height = Math.floor(vp.height * ppp);
      canvas.style.width = Math.floor(vp.width) + "px";
      canvas.style.height = Math.floor(vp.height) + "px";
      canvas.setAttribute("aria-label", t("menu.page", { n: pagina, total: pdf.numPages }));
      // Con zoom > 1 el contenido se alinea a la izquierda para poder desplazarse
      lienzo.style.justifyContent = zoom > 1 ? "flex-start" : "center";

      var ctx = canvas.getContext("2d");
      tareaRender = pag.render({
        canvasContext: ctx,
        viewport: vp,
        transform: ppp !== 1 ? [ppp, 0, 0, ppp, 0, 0] : null
      });
      return tareaRender.promise;
    }).then(function () {
      tareaRender = null;
      actualizarControles();
      if (pendiente) { pendiente = false; renderizar(); }
    }).catch(function (err) {
      tareaRender = null;
      if (err && err.name === "RenderingCancelledException") return;
      console.error(err);
    });
  }

  function irA(n) {
    if (!pdf) return;
    var nueva = Math.min(Math.max(1, n), pdf.numPages);
    if (nueva === pagina) return;
    pagina = nueva;
    lienzo.scrollTop = 0;
    renderizar();
  }

  function cambiarZoom(dir) {
    var i = ZOOMS.indexOf(zoom);
    if (i === -1) i = ZOOMS.indexOf(1);
    i = Math.min(Math.max(0, i + dir), ZOOMS.length - 1);
    zoom = ZOOMS[i];
    renderizar();
  }

  bAnterior.addEventListener("click", function () { irA(pagina - 1); });
  bSiguiente.addEventListener("click", function () { irA(pagina + 1); });
  bMas.addEventListener("click", function () { cambiarZoom(1); });
  bMenos.addEventListener("click", function () { cambiarZoom(-1); });
  bAjustar.addEventListener("click", function () { zoom = 1; renderizar(); });

  lienzo.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowRight" || ev.key === "PageDown") { irA(pagina + 1); ev.preventDefault(); }
    if (ev.key === "ArrowLeft" || ev.key === "PageUp") { irA(pagina - 1); ev.preventDefault(); }
    if (ev.key === "+" || ev.key === "=") cambiarZoom(1);
    if (ev.key === "-") cambiarZoom(-1);
  });

  // Deslizar con el dedo para pasar de página (solo si no está ampliada)
  var toque = null;
  lienzo.addEventListener("touchstart", function (ev) {
    if (ev.touches.length !== 1) { toque = null; return; }
    toque = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
  }, { passive: true });
  lienzo.addEventListener("touchend", function (ev) {
    if (!toque || zoom > 1) { toque = null; return; }
    var dx = ev.changedTouches[0].clientX - toque.x;
    var dy = ev.changedTouches[0].clientY - toque.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) irA(pagina + (dx < 0 ? 1 : -1));
    toque = null;
  });

  // Volver a dibujar si cambia el ancho (girar el móvil, redimensionar)
  var anchoPrevio = 0;
  var temporizador;
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      var w = lienzo.clientWidth;
      if (!pdf || Math.abs(w - anchoPrevio) < 4) return;
      anchoPrevio = w;
      clearTimeout(temporizador);
      temporizador = setTimeout(renderizar, 150);
    }).observe(lienzo);
  }

  function cargarScript(src) {
    return new Promise(function (ok, ko) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = function () { ko(new Error("No se pudo cargar " + src)); };
      document.head.appendChild(s);
    });
  }

  function iniciarVisor() {
    mostrarEstado("cargando");
    // 1) ¿Existe el PDF?
    fetch(urlPdf, { method: "HEAD", cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw { proximamente: true };
      // 2) Cargar PDF.js desde la CDN
      return window.pdfjsLib ? null : cargarScript(PDFJS_URL);
    }).then(function () {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;
      return window.pdfjsLib.getDocument({ url: urlPdf }).promise;
    }).then(function (doc) {
      pdf = doc;
      pagina = 1;
      mostrarEstado("listo");
      anchoPrevio = lienzo.clientWidth;
      renderizar();
    }).catch(function (err) {
      if (err && err.proximamente) { mostrarEstado("proximamente"); return; }
      console.error(err);
      mostrarEstado("error");
    });
  }

  // Retraducir los textos del visor al cambiar de idioma
  I18N.alCambiar(function () {
    if (estadoActual === "listo") actualizarControles();
    else if (estadoActual !== "cargando" || !canvas) mostrarEstado(estadoActual);
  });

  // Cargar solo cuando la sección se acerque a la pantalla
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      if (entradas.some(function (e) { return e.isIntersecting; })) {
        obs.disconnect();
        iniciarVisor();
      }
    }, { rootMargin: "600px 0px" });
    obs.observe(visor);
  } else {
    iniciarVisor();
  }
})();
