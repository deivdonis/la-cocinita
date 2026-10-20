# La Cocinita · Web pública del restaurante

Web del restaurante **La Cocinita**, una casa de comidas de cocina tradicional española en Madrid.

- **Web publicada:** https://deivdonis.github.io/la-cocinita/
- **Repositorio:** https://github.com/deivdonis/la-cocinita
- **Versión:** 1.0 (20/10/2026)

Es una web **100 % estática**: HTML, CSS y JavaScript puro. No usa frameworks, servidor propio, base de datos, servicios de pago ni cuentas externas. Se publica gratis con **GitHub Pages**. No es una PWA ni una app instalable.

> **Antes de darla a conocer**, rellena los datos de ejemplo marcados con **[EDITAR]**. La lista completa está en el apartado [Datos que hay que rellenar](#13-datos-que-hay-que-rellenar-editar).

---

## Índice

1. [Qué incluye](#1-qué-incluye)
2. [Estructura de carpetas](#2-estructura-de-carpetas)
3. [Cambiar datos de contacto, horario y enlaces](#3-cambiar-datos-de-contacto-horario-y-enlaces)
4. [Cambiar los textos](#4-cambiar-los-textos)
5. [Actualizar la carta en PDF (también desde el móvil)](#5-actualizar-la-carta-en-pdf-también-desde-el-móvil)
6. [Cambiar las fotos](#6-cambiar-las-fotos)
7. [Cambiar colores y tipografías](#7-cambiar-colores-y-tipografías)
8. [Añadir un idioma nuevo](#8-añadir-un-idioma-nuevo)
9. [Probar la web en local](#9-probar-la-web-en-local)
10. [Cómo funciona GitHub Pages](#10-cómo-funciona-github-pages)
11. [Conectar un dominio propio](#11-conectar-un-dominio-propio)
12. [Cookies, textos legales y privacidad](#12-cookies-textos-legales-y-privacidad)
13. [Datos que hay que rellenar [EDITAR]](#13-datos-que-hay-que-rellenar-editar)
14. [Detalles técnicos para desarrolladores](#14-detalles-técnicos-para-desarrolladores)
15. [Ideas de mejoras futuras](#15-ideas-de-mejoras-futuras)

---

## 1. Qué incluye

**Página principal (`index.html`):**

1. **Inicio:** imagen principal, nombre, frase de presentación y botones "Ver la carta" y "Reservar por teléfono".
2. **Sobre nosotros:** la historia del restaurante y su filosofía, tres valores y la pizarra del **menú del día**.
3. **La carta:** visor del PDF dentro de la propia web, hecho con PDF.js. Permite pasar páginas, ampliar, reducir y ajustar al ancho. En el móvil se pasa de página deslizando el dedo. Tiene también un botón "Descargar carta".
4. **Servicio en mesa:** un resumen con enlace a la página explicativa.
5. **Galería:** fotos que se amplían al pulsarlas, con flechas, teclado y gesto de deslizar.
6. **Horario:** una fila por día de la semana, con el día de hoy resaltado.
7. **Ubicación:** dirección y mapa de Google Maps. El mapa **solo se carga si se aceptan las cookies**; antes se muestra el botón "Ver en Google Maps".
8. **Reservas:** solo por teléfono (botón que llama) y WhatsApp (abre el chat con un mensaje ya escrito). No hay formulario.
9. **Pie:** contacto, redes sociales (Instagram, Facebook, TikTok) y enlaces legales.

**Otras páginas:**

- `servicio.html`: explica paso a paso cómo funciona el servicio en mesa con QR e incluye preguntas frecuentes. **A propósito, no tiene ningún enlace a la aplicación del restaurante**, porque esa app solo funciona dentro del local.
- `aviso-legal.html`, `privacidad.html` y `cookies.html`: plantillas legales para España (LSSI-CE, RGPD y cookies).
- `404.html`: la página que aparece si alguien entra en una dirección que no existe.

**Además:**

- Dos idiomas, castellano (por defecto) e inglés, con selector en la cabecera. La web recuerda el idioma elegido.
- Banner de cookies con Aceptar, Rechazar y Configurar, que recuerda la elección.
- SEO: título y descripción en cada idioma, datos schema.org de tipo `Restaurant`, Open Graph, favicon, `sitemap.xml` y `robots.txt`.
- Accesibilidad: buen contraste, foco visible con el teclado, enlace "Saltar al contenido", textos alternativos en las imágenes y respeto a `prefers-reduced-motion`.
- Diseño mobile-first y responsive. En todos los botones el texto queda centrado en horizontal y en vertical (con `inline-flex`, `align-items`, `justify-content` y `line-height` controlado).

---

## 2. Estructura de carpetas

```
la-cocinita/
├── index.html            Página principal (todas las secciones)
├── servicio.html         "Cómo funciona nuestro servicio en mesa"
├── aviso-legal.html      Aviso legal (LSSI-CE)
├── privacidad.html       Política de privacidad (RGPD)
├── cookies.html          Política de cookies
├── 404.html              Página de "no encontrado"
├── robots.txt            Instrucciones para buscadores
├── sitemap.xml           Mapa del sitio para buscadores
├── .nojekyll             Indica a GitHub Pages que publique los archivos tal cual
├── .gitattributes        Evita que Git estropee el PDF y las imágenes
├── README.md             Este documento
│
├── carta/
│   └── carta.pdf         ★ LA CARTA. Para cambiarla, sube otro archivo con este mismo nombre
│
├── css/
│   └── estilos.css       Todos los estilos. Colores y fuentes al principio (variables)
│
├── i18n/                 Textos de la web, un archivo por idioma
│   ├── es.json           Castellano (idioma por defecto)
│   └── en.json           Inglés
│
├── img/                  Imágenes (todas son de EJEMPLO; sustitúyelas)
│   ├── hero-comedor.jpg        Imagen grande de la portada (1600×1000)
│   ├── nosotros-cocina.jpg     Foto de "Sobre nosotros" (vertical, 1000×1200)
│   ├── galeria-01-cocido.jpg   Galería (1200×900, apaisadas 4:3)
│   ├── galeria-02-croquetas.jpg
│   ├── galeria-03-tortilla.jpg
│   ├── galeria-04-comedor.jpg
│   ├── galeria-05-callos.jpg
│   ├── galeria-06-torrija.jpg
│   ├── og-imagen.jpg           Vista previa al compartir en WhatsApp o redes (1200×630)
│   ├── favicon.svg             Icono de la pestaña del navegador
│   ├── favicon-32.png          Icono de la pestaña (navegadores antiguos)
│   ├── apple-touch-icon.png    Icono al guardar en la pantalla de inicio del iPhone (180×180)
│   ├── azulejo.svg             Dibujo de azulejo (decoración)
│   └── mapa-fondo.svg          Fondo del recuadro del mapa antes de cargarlo
│
└── js/
    ├── config.js         ★ DATOS DEL RESTAURANTE: teléfono, horario, redes, carta...
    ├── i18n.js           Sistema de idiomas (carga los .json y rellena los textos)
    ├── layout.js         Cabecera, pie e iconos, compartidos por todas las páginas
    ├── cookies.js        Banner y panel de cookies
    ├── main.js           Menú móvil, selector de idioma, horario, galería, mapa, schema.org
    └── carta.js          Visor de la carta con PDF.js
```

**Normalmente solo hay que tocar cuatro cosas:** `js/config.js` (datos), `i18n/*.json` (textos), `carta/carta.pdf` (la carta) y las fotos de `img/`.

---

## 3. Cambiar datos de contacto, horario y enlaces

Todo está centralizado en **`js/config.js`**, que tiene comentarios en cada línea. Los valores de ejemplo llevan el comentario `// [EDITAR]`.

| Qué | Dónde, dentro de `config.js` |
|---|---|
| Teléfono que se ve en pantalla | `contacto.telefono` → `"+34 910 000 000"` |
| Teléfono del botón de llamar | `contacto.telefonoEnlace` → `"+34910000000"` (sin espacios) |
| WhatsApp | `contacto.whatsapp` → `"34600000000"` (prefijo del país, sin `+` ni espacios) |
| Email | `contacto.email` |
| Dirección | `contacto.calle`, `contacto.codigoPostal`, `contacto.ciudad` |
| Mapa | `mapa.consulta` (lo que se busca en Google Maps), `mapa.latitud`, `mapa.longitud` |
| Horario | `horario` (ver abajo) |
| Menú del día | `menuDelDia.precio` y `menuDelDia.mostrar` (`false` para ocultar la pizarra) |
| Redes sociales | `redes.instagram`, `redes.facebook`, `redes.tiktok` (con `""` la red se oculta) |
| Versión de la carta | `carta.version` (ver el apartado 5) |
| Fotos de la galería | `galeria` |
| Datos legales | `legal.titular`, `legal.nif`, `legal.domicilio`, `legal.email`, `legal.registro` |

### El horario

Cada día tiene una lista de franjas (`turnos`). Si la lista está vacía (`[]`), ese día aparece como **Cerrado**:

```js
horario: [
  { dia: "mon", turnos: [] },                              // Lunes: cerrado
  { dia: "tue", turnos: ["13:00–16:30", "20:00–23:30"] },  // Martes: comidas y cenas
  { dia: "sun", turnos: ["13:00–17:00"] }                  // Domingo: solo comidas
]
```

Los días se escriben así: `mon` (lunes), `tue` (martes), `wed` (miércoles), `thu` (jueves), `fri` (viernes), `sat` (sábado) y `sun` (domingo). El nombre de cada día se traduce solo. Este mismo horario se usa para los datos que leen los buscadores (schema.org).

### Cómo editar un archivo desde la web de GitHub

1. Entra en https://github.com/deivdonis/la-cocinita e inicia sesión.
2. Abre el archivo, por ejemplo `js` → `config.js`.
3. Pulsa el **lápiz** ✏️ ("Edit this file"), arriba a la derecha.
4. Cambia lo que necesites. **Respeta las comillas `" "` y las comas** del final de cada línea.
5. Pulsa **"Commit changes…"** y, en la ventana que se abre, otra vez **"Commit changes"**.
6. En uno o dos minutos el cambio se verá en la web. Si no lo ves, recarga la página (en el móvil, cierra y abre la pestaña).

---

## 4. Cambiar los textos

Los textos están en **`i18n/es.json`** (castellano) e **`i18n/en.json`** (inglés). Tienen el mismo formato y las mismas claves:

```json
"hero": {
  "kicker": "Casa de comidas · Madrid",
  "lead": "Cocina tradicional española a fuego lento, como la de casa…",
  "ctaMenu": "Ver la carta"
}
```

- Cambia **solo el texto que va entre comillas a la derecha** de los dos puntos, nunca el nombre de la izquierda (`"lead"`).
- Si quieres poner comillas dentro de un texto, escríbelas así: `\"`.
- Cuando cambies un texto en castellano, **cambia también el mismo texto en inglés**.
- Si a un idioma le falta un texto, la web muestra el de castellano.
- Puedes insertar datos de `config.js` dentro de cualquier texto con `{{...}}`, por ejemplo `"Llámanos al {{contacto.telefono}}"`.
- Los textos legales están en `legal.aviso.html`, `legal.privacy.html` y `legal.cookies.html`. Son HTML (`<h2>`, `<p>`, `<ul>`…) escrito en una sola línea.
- El título que aparece en Google y en la pestaña del navegador está en `meta.home.title`, y la descripción en `meta.home.description` (hay uno por página).

> **Truco:** antes de guardar un `.json`, puedes pegar su contenido en https://jsonlint.com para comprobar que no falta ninguna coma ni comilla. Si un `.json` tiene un error, la web mostrará los textos en castellano o se quedará sin textos.

**Los textos de ejemplo que hay que revisar** son la historia de "Sobre nosotros" (`about.p1`, `about.p2`, `about.p3`), el horario del menú del día (`daily.when` y `daily.includes`), el barrio y el transporte (`location.lead`, `location.transport`), la nota del horario (`hours.lead`) y la nota de grupos (`book.note`).

---

## 5. Actualizar la carta en PDF (también desde el móvil)

La carta es **un único PDF bilingüe** que siempre está en la misma ruta: **`carta/carta.pdf`**. Para cambiarla basta con subir otro PDF **con exactamente el mismo nombre**, `carta.pdf`, en minúsculas.

### Paso a paso desde el móvil

1. **Prepara el PDF** y renómbralo a `carta.pdf`.
   - En Android, desde la app *Archivos*: mantén pulsado el archivo → *Cambiar nombre*.
   - En iPhone, desde la app *Archivos*: mantén pulsado → *Renombrar*.
2. Abre el navegador del móvil (Chrome o Safari) y entra en **https://github.com/deivdonis/la-cocinita**. Inicia sesión si te lo pide.
   - *Consejo:* si la app oficial de GitHub te abre la página, mejor usa el navegador. En Chrome, menú ⋮ → **"Sitio de escritorio"**. En Safari, botón **"aA"** → **"Solicitar sitio web de escritorio"**. Así se ven todos los botones.
3. Entra en la carpeta **`carta`**.
4. Pulsa **"Add file"** → **"Upload files"**. En algunos móviles es el botón **"…"** o **"+"**.
5. Pulsa **"choose your files"** y elige tu `carta.pdf`.
6. Abajo, pulsa el botón verde **"Commit changes"**. Como el archivo tiene el mismo nombre, GitHub **sustituye** la carta anterior.
7. **Muy recomendable:** actualiza la versión de la carta para que nadie siga viendo la antigua guardada en su navegador:
   1. Vuelve al inicio del repositorio, entra en `js` → `config.js` y pulsa el lápiz ✏️.
   2. Busca la línea `version: "2026-10-20",` y cambia la fecha por la de hoy, por ejemplo `version: "2026-11-15",`.
   3. Pulsa **"Commit changes"**.
8. Espera uno o dos minutos y abre la web: la carta nueva ya estará en el visor.

### Desde el ordenador

Es lo mismo: entra en https://github.com/deivdonis/la-cocinita/tree/main/carta, pulsa **Add file → Upload files**, arrastra tu `carta.pdf`, pulsa **Commit changes** y cambia `carta.version` en `js/config.js`.

### Recomendaciones para el PDF

- Tamaño A4 vertical y, si puede ser, **menos de 5 MB** para que cargue rápido en el móvil.
- Con texto real, no una foto escaneada: así se lee mejor al ampliar y los buscadores pueden leerla.
- Un solo PDF con los dos idiomas, por ejemplo cada plato en castellano con su traducción debajo, como en la carta de ejemplo.

### ¿Y si no hay PDF?

Si `carta/carta.pdf` no existe (por ejemplo, porque lo has borrado), la web muestra **"Carta disponible próximamente"** y oculta el botón de descarga.

> La carta de ejemplo incluida (entrantes, platos de cuchara, carnes, pescados, postres y bebidas) tiene **platos y precios inventados**. Sustitúyela por la real antes de publicar la web.

---

## 6. Cambiar las fotos

Las fotos de `img/` son **dibujos de ejemplo** con el rótulo "FOTO DE EJEMPLO". Para cambiar una:

1. Prepara tu foto en **JPG**, con las proporciones indicadas en la tabla, y comprímela (por ejemplo con https://squoosh.app) para que pese **menos de 300 KB**.
2. Ponle **exactamente el mismo nombre** que la que sustituye, por ejemplo `galeria-01-cocido.jpg`.
3. En GitHub, entra en la carpeta `img` → **Add file → Upload files**, súbela y pulsa **Commit changes**.

| Archivo | Dónde sale | Tamaño recomendado |
|---|---|---|
| `hero-comedor.jpg` | Fondo de la portada (se oscurece para que se lea el texto) | 1600×1000 o mayor, apaisada |
| `nosotros-cocina.jpg` | Sobre nosotros | 1000×1200, vertical |
| `galeria-01…06-*.jpg` | Galería | 1200×900 (4:3) |
| `og-imagen.jpg` | Vista previa al compartir el enlace | 1200×630 exactos |
| `apple-touch-icon.png`, `favicon-32.png`, `favicon.svg` | Icono de la web | 180×180, 32×32 y SVG |

**Para añadir o quitar fotos de la galería**, edita la lista `galeria` de `js/config.js`:

```js
{ archivo: "img/galeria-07-flan.jpg", alt: "flan" },
```

Después añade el texto alternativo (la descripción de la foto, que usan los lectores de pantalla) en `i18n/es.json` y en `i18n/en.json`, dentro de `gallery.alt`:

```json
"flan": "Flan de huevo casero con nata"
```

Si cambias la foto de "Sobre nosotros" o la de portada, revisa también su descripción en `about.imgAlt` y `hero.imgAlt`.

---

## 7. Cambiar colores y tipografías

Al principio de **`css/estilos.css`** están todas las variables:

```css
:root {
  --verde: #1d4a37;     /* Verde botella: color principal (cabecera, botones) */
  --granate: #7c1d2c;   /* Granate: acentos y botones de llamada */
  --azulejo: #24548a;   /* Azul de los azulejos decorativos */
  --ocre: #d8a440;      /* Dorado viejo: detalles sobre fondos oscuros y foco */
  --papel: #f8f5ee;     /* Fondo general */
  --madera: #3d2a1d;    /* Pie de página */
  ...
}
```

Cambia el código de color (por ejemplo `#1d4a37`) y se aplicará en toda la web. Comprueba que el texto blanco sigue leyéndose bien sobre el nuevo color, por ejemplo con https://webaim.org/resources/contrastchecker/ (mínimo 4,5:1).

Si cambias el verde principal, cambia también `<meta name="theme-color">` en las páginas `.html` y los colores de `img/favicon.svg`.

**Tipografías (Google Fonts):**

- Títulos: **DM Serif Display**. Texto: **Source Sans 3**. Pizarra: **Kalam**.
- Para cambiarlas, elige otras en https://fonts.google.com, sustituye la línea `<link href="https://fonts.googleapis.com/css2?...">` en **todas** las páginas `.html` y cambia `--fuente-titulos`, `--fuente-texto` y `--fuente-tiza` en `estilos.css`.

---

## 8. Añadir un idioma nuevo

El portugués (`pt`), el francés (`fr`) y el italiano (`it`) ya están previstos en `js/config.js` (`idiomas: ["es", "en", "pt", "fr", "it"]`). **Para activarlos basta con crear su archivo:**

1. En GitHub, abre `i18n/en.json` y copia todo su contenido.
2. Vuelve a la carpeta `i18n` → **Add file → Create new file**.
3. Llama al archivo `pt.json` (o `fr.json`, `it.json`) y pega el contenido.
4. **Traduce los textos** de la derecha. No cambies los nombres de la izquierda ni lo que va entre `{{ }}`.
5. Pulsa **Commit changes**.

En uno o dos minutos aparecerá el botón **PT** (o **FR**, **IT**) en el selector de la cabecera. Si falta algún texto en el nuevo idioma, se mostrará en castellano.

**Para otro idioma distinto** (por ejemplo alemán, `de`), crea `i18n/de.json` y añade `"de"` a la lista `idiomas` de `js/config.js`.

**Recomendable** para que Google conozca la nueva versión: añade una línea `<link rel="alternate" hreflang="pt" href="...?lang=pt">` en el `<head>` de `index.html` y `servicio.html`, y otra `xhtml:link` igual en `sitemap.xml`.

---

## 9. Probar la web en local

La web carga los textos con `fetch()`, así que **no funciona abriendo el `.html` con doble clic** (`file://`). Necesita un pequeño servidor local. Cualquiera de estas opciones vale:

- **Visual Studio Code:** instala la extensión *Live Server*, abre la carpeta y pulsa **"Go Live"**.
- **Python 3:** dentro de la carpeta del proyecto, ejecuta:
  ```bash
  python -m http.server 8000
  ```
  y abre http://localhost:8000
- **Node.js:**
  ```bash
  npx serve .
  ```
- **Java 18 o superior:**
  ```bash
  jwebserver -p 8000
  ```

Para probar el aspecto en el móvil desde el ordenador, abre las herramientas de desarrollo del navegador (F12) y activa la vista de dispositivo (Ctrl+Mayús+M).

**Para descargar el código** al ordenador: `git clone https://github.com/deivdonis/la-cocinita.git`, o en GitHub → botón verde **Code → Download ZIP**.

---

## 10. Cómo funciona GitHub Pages

- GitHub Pages publica gratis los archivos de la rama **`main`** (carpeta raíz) del repositorio en **https://deivdonis.github.io/la-cocinita/**.
- **Cada vez que guardas un cambio** (un *commit*), GitHub vuelve a publicar la web automáticamente. Tarda entre unos segundos y un par de minutos. Puedes seguir el proceso en la pestaña **Actions** del repositorio.
- La configuración está en **Settings → Pages** ("Deploy from a branch", rama `main`, carpeta `/ (root)`).
- El archivo `.nojekyll` le dice a GitHub que publique los archivos tal cual, sin procesarlos.
- **Todas las rutas de la web son relativas** (`css/estilos.css`, `img/...`, `carta/carta.pdf`), así que funciona igual dentro de la subcarpeta `/la-cocinita/` que con un dominio propio en la raíz.
- Límites de GitHub Pages: el repositorio debe ser público (en la cuenta gratuita), con menos de 1 GB y unos 100 GB de tráfico al mes. Para un restaurante sobra.
- Si un cambio no se ve, recarga la página forzando la caché (Ctrl+F5 en el ordenador; en el móvil, cierra y abre la pestaña). En la carta, cambia `carta.version`.
- **Caché de estilos y scripts:** GitHub Pages deja que los navegadores guarden los archivos unos 10 minutos. Por eso las páginas cargan `css/estilos.css?v=1.0.1` y `js/...js?v=1.0.1`. Si cambias el CSS o algún JS, sube ese número (por ejemplo a `1.0.2`) en las cinco páginas `.html`, para que todo el mundo reciba la versión nueva al momento. Con "Buscar y reemplazar en todos los archivos" de VS Code se hace de una vez. Los cambios en `i18n/*.json` no lo necesitan, porque se piden siempre sin caché.

---

## 11. Conectar un dominio propio

Por ejemplo, para usar `www.lacocinita.es`:

1. **Compra el dominio** en cualquier registrador (DonDominio, IONOS, Namecheap…).
2. En GitHub: **Settings → Pages → Custom domain**, escribe `www.lacocinita.es` y pulsa **Save**. Esto crea un archivo `CNAME` en el repositorio.
3. En el panel DNS del registrador, crea estos registros:
   - Para `www`: un registro **CNAME** que apunte a `deivdonis.github.io`.
   - Para el dominio sin `www` (`lacocinita.es`): cuatro registros **A** que apunten a:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Espera a que se propaguen los DNS (de minutos a 24 horas) y marca **"Enforce HTTPS"** en Settings → Pages.
5. **Actualiza las URL absolutas.** Son las únicas que no pueden ser relativas, porque buscadores y redes sociales las necesitan completas. Cambia `https://deivdonis.github.io/la-cocinita/` por `https://www.lacocinita.es/` en:
   - `js/config.js` → `urlPublica`
   - `index.html` y `servicio.html` → `<link rel="canonical">`, `<link rel="alternate">`, `og:url` y `og:image`
   - `aviso-legal.html`, `privacidad.html` y `cookies.html` → `<link rel="canonical">`
   - `sitemap.xml` y `robots.txt`

   *Truco:* en el ordenador, con VS Code, usa "Buscar y reemplazar en todos los archivos" (Ctrl+Mayús+H).
6. El resto de la web no necesita cambios, porque todas sus rutas son relativas.

Más información: https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## 12. Cookies, textos legales y privacidad

- La web **no usa cookies de análisis ni de publicidad**. Solo guarda en el navegador (`localStorage`) dos datos técnicos: el idioma (`lc_lang`) y la elección de cookies (`lc_cookies`, durante 12 meses).
- **Google Maps** es la única parte de terceros que puede instalar cookies. Por eso el mapa solo se carga cuando la persona pulsa **Aceptar**, o **Aceptar y cargar el mapa** en el propio recuadro del mapa. Antes solo se muestra el botón **"Ver en Google Maps"**, que abre Google Maps en otra pestaña.
- Desde el pie de página, **"Configurar cookies"** permite cambiar la elección en cualquier momento.
- Las fuentes se cargan desde Google Fonts y PDF.js desde cdnjs. Ninguno de los dos instala cookies, pero reciben la IP del visitante. Si quieres evitarlo del todo, mira las mejoras futuras.
- **Los textos legales son plantillas genéricas.** Rellena los datos del titular en `config.js` → `legal` y **haz que los revise un profesional** (asesoría o gestoría), sobre todo si la web crece (formularios, analítica, tienda online…).

---

## 13. Datos que hay que rellenar [EDITAR]

**En `js/config.js`:**

- [ ] `contacto.telefono` y `contacto.telefonoEnlace`: teléfono real
- [ ] `contacto.whatsapp`: número de WhatsApp (con 34 delante)
- [ ] `contacto.email`
- [ ] `contacto.calle` y `contacto.codigoPostal`: dirección real
- [ ] `mapa.consulta`, `mapa.latitud` y `mapa.longitud`: ubicación exacta. Para sacar las coordenadas, en Google Maps haz clic derecho sobre el local y pulsa los números que aparecen.
- [ ] `horario`: horario real de cada día
- [ ] `menuDelDia.precio`, o `mostrar: false` si no hay menú del día
- [ ] `redes.instagram`, `redes.facebook` y `redes.tiktok`, o `""` para ocultar una red
- [ ] `legal.titular`, `legal.nif`, `legal.domicilio`, `legal.email` y `legal.registro`
- [ ] `carta.version`: cambiarla cada vez que se actualice la carta

**En `i18n/es.json` e `i18n/en.json`:**

- [ ] La historia (`about.p1`, `about.p2`, `about.p3`) y los valores (`about.values`)
- [ ] El menú del día: días y qué incluye (`daily.when`, `daily.includes`)
- [ ] El barrio y el transporte (`location.lead`, `location.transport`)
- [ ] Las notas del horario y de las reservas (`hours.lead`, `book.note`)
- [ ] El plazo de conservación de datos en la política de privacidad (busca `[EDITAR] 30 días` en `legal.privacy.html`)

**Archivos:**

- [ ] `carta/carta.pdf`: la carta real (la incluida es de ejemplo)
- [ ] Todas las fotos de `img/` (ver el apartado 6)
- [ ] Solo si cambias de dominio: las URL absolutas (ver el apartado 11)

---

## 14. Detalles técnicos para desarrolladores

**Orden de carga de los scripts** (todos con `defer`, al final del `<body>`):

`config.js` → `i18n.js` → `layout.js` → `cookies.js` → `main.js` → `carta.js` (este último solo en `index.html`).

- **`layout.js`** sustituye `<div id="cabecera">` y `<div id="pie">` por la cabecera y el pie comunes y expone `window.ICONOS` (iconos SVG en línea). En el HTML, `<span data-icono="telefono"></span>` se convierte en el icono correspondiente.
- **`i18n.js`** expone `window.I18N`, con `t(clave, vars)`, `aplicar(raíz)`, `cambiar(idioma)`, `alCambiar(fn)`, `idioma` y `disponibles`. Los atributos que entiende son:
  - `data-i18n="clave"`: pone el texto del elemento.
  - `data-i18n-html="clave"`: pone HTML; se usa solo en los textos legales, que son contenido propio y de confianza.
  - `data-i18n-attr="alt:clave;aria-label:clave2"`: rellena atributos.
  - El `<body data-pagina="home|service|legal|privacy|cookies">` decide qué `meta.*.title` y `meta.*.description` se aplican.
  - Para elegir el idioma, se mira en este orden: el parámetro `?lang=xx` de la URL, `localStorage` (`lc_lang`), el idioma del navegador y, por último, `idiomaPorDefecto`.
  - Qué idiomas hay se detecta con una petición `HEAD` a cada `i18n/<código>.json` de la lista `idiomas`.
  - Mientras cargan los textos, `<html class="i18n-cargando">` oculta `main` y el pie para evitar parpadeos. Una red de seguridad los muestra a los 2,5 s pase lo que pase.
- **`cookies.js`** expone `window.Consentimiento`, con `tiene("mapas")`, `aceptar("mapas")`, `abrirPanel()` y `decidido()`, y lanza el evento `consentimiento` en `document`. Para añadir otra categoría (por ejemplo analítica), añade un interruptor en el panel y un campo en el objeto guardado.
- **`carta.js`** usa **PDF.js 3.11.174** (compilación UMD) desde cdnjs, que se carga de forma diferida cuando el visor se acerca a la pantalla. Antes comprueba con `HEAD` que el PDF existe; si no existe, muestra "Carta disponible próximamente". Dibuja la página en un `<canvas>` a la resolución real de la pantalla (`devicePixelRatio`). Tiene zoom por pasos (0,5×–3×, donde 1× es ajustado al ancho), deslizar para pasar de página, flechas del teclado y vuelve a dibujar al cambiar de tamaño (`ResizeObserver`). Si la CDN falla, ofrece abrir el PDF directamente.
- **schema.org:** `main.js` genera el JSON-LD `Restaurant` a partir de `config.js` (dirección, coordenadas, horario, redes, carta). Google ejecuta JavaScript y lo lee. Se puede validar en https://search.google.com/test/rich-results
- **Open Graph:** son metaetiquetas fijas en el HTML, porque WhatsApp y Facebook no ejecutan JavaScript. Están en castellano.
- **Galería y lightbox:** usan `<dialog>` nativo (con `showModal`), cierre con Esc, flechas del teclado y gesto de deslizar; al cerrar, el foco vuelve a la miniatura.
- **Sin dependencias ni compilación:** no hay `package.json` ni paso de *build*. Lo que está en el repositorio es exactamente lo que se publica.

---

## 15. Ideas de mejoras futuras

- **Fotos reales** del local y de los platos, en formato WebP con `<picture>` y `srcset` para cargar menos en el móvil.
- **Más idiomas** (portugués, francés, italiano): basta con crear el `.json` (ver el apartado 8).
- **Páginas por idioma estáticas** (`/en/index.html`) para un SEO multilingüe más fuerte, generadas con un pequeño script a partir de los `.json`.
- **Alojar PDF.js y las fuentes en el propio repositorio** para no depender de CDN externas y no enviar la IP de los visitantes a terceros.
- **Menú del día editable** en un archivo aparte (`menu-del-dia.json`), para cambiar los platos de cada día desde el móvil sin tocar la carta.
- **Analítica respetuosa con la privacidad**, sin cookies (por ejemplo GoatCounter o Plausible), integrada en el banner de cookies.
- **Reseñas destacadas** de Google o TripAdvisor (texto estático, sin widgets de terceros).
- **Avisos de cierre o vacaciones**: un banner configurable desde `config.js` ("Cerramos del 1 al 15 de agosto").
- **Sección de eventos o platos de temporada** (cocido los miércoles, torrijas en Semana Santa…).
- **Mapa estático** (imagen) en lugar del iframe de Google, para no necesitar consentimiento.
- **Página de alérgenos** con la tabla de los 14 alérgenos por plato (obligatoria en el local según el Reglamento UE 1169/2011; en la web es un plus).
- **Comprobaciones automáticas** con GitHub Actions: validar el JSON, buscar enlaces rotos y pasar Lighthouse en cada cambio.

---

*Web creada en octubre de 2026. Código propio sin dependencias, salvo PDF.js (licencia Apache 2.0, desde CDN) y Google Fonts (licencia OFL).*
