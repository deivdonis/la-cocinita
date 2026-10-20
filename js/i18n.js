/* ==========================================================================
   LA COCINITA · IDIOMAS
   --------------------------------------------------------------------------
   Carga /i18n/<idioma>.json y rellena los elementos de la página:
     data-i18n="clave"            -> texto del elemento
     data-i18n-html="clave"       -> HTML del elemento (textos legales)
     data-i18n-attr="alt:clave;aria-label:clave2" -> atributos
   Dentro de los textos, {{ruta}} se sustituye por el dato de js/config.js
   (por ejemplo {{contacto.telefono}}) o por variables (n, total...).

   El idioma elegido se guarda en localStorage ("lc_lang"). También se puede
   forzar con ?lang=en en la URL (útil para compartir enlaces y para SEO).
   ========================================================================== */

(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  var CLAVE = "lc_lang";
  var diccionario = {};
  var respaldo = {};          // castellano, por si falta una clave en otro idioma
  var actual = C.idiomaPorDefecto;
  var disponibles = [C.idiomaPorDefecto];
  var oyentes = [];

  function leer(obj, ruta) {
    return ruta.split(".").reduce(function (o, k) { return o != null ? o[k] : undefined; }, obj);
  }

  function rellenar(texto, vars) {
    return String(texto).replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (m, ruta) {
      var v = vars && vars[ruta] !== undefined ? vars[ruta] : leer(C, ruta);
      return v == null ? m : v;
    });
  }

  function t(clave, vars) {
    var v = leer(diccionario, clave);
    if (v == null) v = leer(respaldo, clave);
    if (v == null) return "";
    return rellenar(v, vars);
  }

  function guardar(idioma) {
    try { localStorage.setItem(CLAVE, idioma); } catch (e) { /* almacenamiento bloqueado */ }
  }

  function idiomaInicial() {
    var url = new URLSearchParams(location.search).get("lang");
    if (url && C.idiomas.indexOf(url) !== -1) return url;
    try {
      var guardado = localStorage.getItem(CLAVE);
      if (guardado) return guardado;
    } catch (e) { /* nada */ }
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    return C.idiomas.indexOf(nav) !== -1 ? nav : C.idiomaPorDefecto;
  }

  function cargarArchivo(idioma) {
    return fetch("i18n/" + idioma + ".json", { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("No existe i18n/" + idioma + ".json");
      return r.json();
    });
  }

  // Comprueba qué archivos de idioma existen (petición HEAD, muy ligera).
  function detectarDisponibles() {
    return Promise.all(C.idiomas.map(function (idioma) {
      if (idioma === C.idiomaPorDefecto) return idioma;
      return fetch("i18n/" + idioma + ".json", { method: "HEAD", cache: "no-cache" })
        .then(function (r) { return r.ok ? idioma : null; })
        .catch(function () { return null; });
    })).then(function (lista) {
      disponibles = lista.filter(Boolean);
      return disponibles;
    });
  }

  function aplicar(raiz) {
    raiz = raiz || document;
    raiz.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    raiz.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-html"));
      if (v) el.innerHTML = v;
    });
    raiz.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (par) {
        var partes = par.split(":");
        if (partes.length === 2) {
          var v = t(partes[1].trim());
          if (v) el.setAttribute(partes[0].trim(), v);
        }
      });
    });

    // Título y metadescripción de la página (body data-pagina="home", "service"...)
    var pagina = document.body.getAttribute("data-pagina");
    if (pagina && raiz === document) {
      var titulo = t("meta." + pagina + ".title");
      var desc = t("meta." + pagina + ".description");
      if (titulo) document.title = titulo;
      var meta = document.querySelector('meta[name="description"]');
      if (meta && desc) meta.setAttribute("content", desc);
      var ogt = document.querySelector('meta[property="og:title"]');
      if (ogt && titulo) ogt.setAttribute("content", titulo);
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd && desc) ogd.setAttribute("content", desc);
    }
  }

  function cambiar(idioma) {
    if (disponibles.indexOf(idioma) === -1) idioma = C.idiomaPorDefecto;
    var carga = idioma === C.idiomaPorDefecto ? Promise.resolve(respaldo) : cargarArchivo(idioma);
    return carga.then(function (dic) {
      diccionario = dic;
      actual = idioma;
      document.documentElement.lang = idioma;
      guardar(idioma);
      aplicar(document);
      oyentes.forEach(function (fn) { try { fn(idioma); } catch (e) { console.error(e); } });
      document.documentElement.classList.remove("i18n-cargando");
    }).catch(function (err) {
      console.warn(err);
      if (idioma !== C.idiomaPorDefecto) return cambiar(C.idiomaPorDefecto);
      document.documentElement.classList.remove("i18n-cargando");
    });
  }

  function iniciar() {
    // Red de seguridad: si algo falla, no dejar la página oculta.
    setTimeout(function () { document.documentElement.classList.remove("i18n-cargando"); }, 2500);
    return Promise.all([cargarArchivo(C.idiomaPorDefecto), detectarDisponibles()])
      .then(function (res) {
        respaldo = res[0];
        return cambiar(idiomaInicial());
      })
      .catch(function (err) {
        console.error("Error cargando los textos:", err);
        document.documentElement.classList.remove("i18n-cargando");
      });
  }

  window.I18N = {
    t: t,
    aplicar: aplicar,
    cambiar: cambiar,
    iniciar: iniciar,
    alCambiar: function (fn) { oyentes.push(fn); },
    get idioma() { return actual; },
    get disponibles() { return disponibles.slice(); }
  };
})();
