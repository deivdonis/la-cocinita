/* ==========================================================================
   LA COCINITA · CONFIGURACIÓN CENTRAL
   --------------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar los datos del
   restaurante: teléfono, WhatsApp, dirección, horario, redes, carta, etc.
   Todo lo marcado con [EDITAR] son datos de ejemplo que hay que sustituir.

   Los textos (frases, títulos, explicaciones) NO están aquí: están en
   /i18n/es.json, /i18n/en.json... Dentro de esos textos se pueden usar
   estos datos escribiendo {{ruta.del.dato}}, por ejemplo {{contacto.telefono}}.
   ========================================================================== */

window.SITE_CONFIG = {
  nombre: "La Cocinita",

  // Dirección pública de la web. Se usa para Open Graph y schema.org.
  // Si conectas un dominio propio, cámbiala (y también sitemap.xml, robots.txt
  // y las etiquetas og:url / og:image de los .html; ver README).
  urlPublica: "https://deivdonis.github.io/la-cocinita/",

  // Idiomas -----------------------------------------------------------------
  // El selector muestra SOLO los idiomas de esta lista cuyo archivo exista en
  // /i18n/ (por ejemplo /i18n/pt.json). Para añadir portugués, francés o
  // italiano basta con crear su archivo: ya están en la lista.
  idiomaPorDefecto: "es",
  idiomas: ["es", "en", "pt", "fr", "it"],

  // Contacto ----------------------------------------------------------------
  contacto: {
    telefono: "+34 910 000 000",        // [EDITAR] Como se muestra en pantalla
    telefonoEnlace: "+34910000000",     // [EDITAR] El mismo, sin espacios (para el botón de llamar)
    whatsapp: "34600000000",            // [EDITAR] Con prefijo de país, sin "+" ni espacios
    email: "reservas@lacocinita.es",    // [EDITAR]
    calle: "Calle de la Cava Baja, 00", // [EDITAR]
    codigoPostal: "28005",              // [EDITAR]
    ciudad: "Madrid",
    region: "Comunidad de Madrid",
    pais: "ES"
  },

  // Mapa --------------------------------------------------------------------
  // Texto que se busca en Google Maps (vale una dirección o el nombre del
  // local tal y como aparece en Google Maps).
  mapa: {
    consulta: "Calle de la Cava Baja, 28005 Madrid", // [EDITAR]
    latitud: 40.4120,                                 // [EDITAR] Para schema.org
    longitud: -3.7087                                 // [EDITAR]
  },

  // Horario -----------------------------------------------------------------
  // Un bloque por día (lun = lunes ... dom = domingo). "turnos" es una lista de
  // franjas; si está vacía, ese día aparece como "Cerrado".
  horario: [
    { dia: "mon", turnos: [] },                               // [EDITAR] Lunes: cerrado
    { dia: "tue", turnos: ["13:00–16:30", "20:00–23:30"] },   // [EDITAR]
    { dia: "wed", turnos: ["13:00–16:30", "20:00–23:30"] },   // [EDITAR]
    { dia: "thu", turnos: ["13:00–16:30", "20:00–23:30"] },   // [EDITAR]
    { dia: "fri", turnos: ["13:00–16:30", "20:00–00:00"] },   // [EDITAR]
    { dia: "sat", turnos: ["13:00–17:00", "20:00–00:00"] },   // [EDITAR]
    { dia: "sun", turnos: ["13:00–17:00"] }                   // [EDITAR]
  ],

  // Menú del día (pizarra de la sección "Sobre nosotros") ---------------------
  menuDelDia: {
    mostrar: true,       // false para ocultar la pizarra
    precio: "14,50 €"    // [EDITAR]
  },

  // Redes sociales ----------------------------------------------------------
  // Deja una cadena vacía ("") para ocultar una red.
  redes: {
    instagram: "https://www.instagram.com/lacocinita.madrid/", // [EDITAR]
    facebook: "https://www.facebook.com/lacocinita.madrid/",   // [EDITAR]
    tiktok: "https://www.tiktok.com/@lacocinita.madrid"        // [EDITAR]
  },

  // Carta en PDF --------------------------------------------------------------
  // Para actualizar la carta: sube un nuevo carta.pdf a /carta/ (mismo nombre)
  // y cambia "version" por la fecha del día. Así nadie verá la carta antigua
  // guardada en la caché de su navegador.
  carta: {
    ruta: "carta/carta.pdf",
    version: "2026-10-20",                 // [EDITAR] cada vez que cambies la carta
    nombreDescarga: "carta-la-cocinita.pdf"
  },

  // Galería -------------------------------------------------------------------
  // "archivo" es la foto (en /img/) y "alt" la clave del texto alternativo en
  // los archivos de idioma (gallery.alt.xxx). Puedes añadir o quitar fotos.
  galeria: [
    { archivo: "img/galeria-01-cocido.jpg", alt: "cocido" },
    { archivo: "img/galeria-02-croquetas.jpg", alt: "croquetas" },
    { archivo: "img/galeria-03-tortilla.jpg", alt: "tortilla" },
    { archivo: "img/galeria-04-comedor.jpg", alt: "comedor" },
    { archivo: "img/galeria-05-callos.jpg", alt: "callos" },
    { archivo: "img/galeria-06-torrija.jpg", alt: "torrija" }
  ],

  // Datos legales (aparecen en Aviso legal, Privacidad y Cookies) --------------
  legal: {
    titular: "[EDITAR] Nombre y apellidos o razón social",
    nif: "[EDITAR] NIF/CIF",
    domicilio: "[EDITAR] Domicilio fiscal completo",
    email: "[EDITAR] email-de-contacto@dominio.es",
    registro: "[EDITAR] Datos de inscripción en el Registro Mercantil (si es sociedad)",
    actualizado: "20/10/2026"
  }
};
