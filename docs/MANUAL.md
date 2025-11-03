# 📚 Documentación - Integration Bee Physics UMSA

## 🎯 Índice
1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Configuración de Contenido](#configuración-de-contenido)
4. [Personalización de Diseño](#personalización-de-diseño)
5. [Publicación en GitHub Pages](#publicación-en-github-pages)
6. [Mantenimiento y Actualización](#mantenimiento-y-actualización)
7. [Solución de Problemas](#solución-de-problemas)

---

## 🌟 Introducción

Este sitio web fue diseñado para el grupo **Integration Bee Physics** de la UMSA. Es una página moderna, responsiva y fácil de actualizar que incluye:

- ✅ Sección de últimos ganadores
- ✅ Banco de preguntas con visor de PDFs
- ✅ Galería de fotos y videos
- ✅ Sección "Sobre Nosotros"
- ✅ Diseño responsivo (móvil, tablet, desktop)
- ✅ Animaciones sutiles y temática de abejas
- ✅ Tipografías intercambiables

---

## 📁 Estructura del Proyecto

```
integration-bee-umsa/
│
├── index.html              # Archivo principal (HTML + CSS + JS todo en uno)
├── assets/                 # Carpeta para recursos
│   ├── images/            # Imágenes del proyecto
│   │   ├── logo.png       # Logo del Integration Bee
│   │   ├── equations-background.png  # ⚠️ IMPORTANTE: Fondo de ecuaciones
│   │   └── galeria/       # Fotos de competencias
│   ├── pdfs/              # Bancos de preguntas en PDF
│   │   └── torneos/
│   └── videos/            # Videos (si no usas YouTube)
│
├── README.md              # Información general del proyecto
└── docs/                  # Esta documentación
    └── MANUAL.md
```

**⚠️ IMPORTANTE - Imagen de Fondo de Ecuaciones:**

El sitio web utiliza una imagen PNG con ecuaciones matemáticas como fondo decorativo. Esta imagen **DEBE** estar ubicada en:

```
assets/images/equations-background.png
```

**Requisitos de la imagen:**
- **Formato:** PNG con fondo transparente
- **Peso recomendado:** 200-400 KB (optimizada)
- **Resolución recomendada:** 1280x900 o 1024x720 px
- **Contenido:** Ecuaciones, gráficos y símbolos matemáticos distribuidos uniformemente

**Cómo optimizar la imagen (si es necesario):**
1. Ve a https://tinypng.com/
2. Sube tu imagen PNG
3. Descarga la versión optimizada
4. Guárdala como `equations-background.png`

Si no tienes esta imagen, el sitio funcionará normalmente pero sin el fondo de ecuaciones del certificado.

**Nota:** El sitio está diseñado como un archivo HTML único (`index.html`) para facilitar la publicación en GitHub Pages.

---

## ⚙️ Configuración de Contenido

Todo el contenido editable se encuentra dentro del objeto JavaScript `websiteData` en el archivo `index.html`. Busca esta sección (aproximadamente línea 700):

```javascript
const websiteData = {
    winners: [...],
    questionBanks: [...],
    gallery: {...}
};
```

### 🏆 Agregar Ganadores

```javascript
winners: [
    {
        position: "1er Lugar",           // Texto del puesto
        name: "Nombre del Ganador",      // Nombre completo
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"   // Fecha de la competencia
    },
    {
        position: "2do Lugar",
        name: "Otro Ganador",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    }
    // Agregar más ganadores...
]
```

### 📝 Agregar Bancos de Preguntas

**Paso 1:** Sube tu PDF a GitHub en la carpeta `assets/pdfs/`

**Paso 2:** Agrega la información al array `questionBanks`:

```javascript
questionBanks: [
    {
        year: 2025,                    // Año de la competencia
        title: "1º Torneo Integration Bee Physics",
        edition: "Primera Edición",
        problems: 20,                  // Número de problemas
        pdfUrl: "assets/pdfs/torneo-2025.pdf"  // Ruta al PDF
    },
    {
        year: 2026,
        title: "2º Torneo Integration Bee Physics",
        edition: "Segunda Edición",
        problems: 25,
        pdfUrl: "assets/pdfs/torneo-2026.pdf"
    }
]
```

**Nota sobre PDFs:** 
- Para que el visor funcione correctamente con PDFs locales, necesitas alojar el PDF en un lugar público.
- **Opción 1:** Súbelo a GitHub en tu repositorio (`assets/pdfs/archivo.pdf`)
- **Opción 2:** Usa Google Drive (compartir → obtener enlace) y modifica la URL así:
  ```
  https://drive.google.com/file/d/ID_DEL_ARCHIVO/view
  ```
  Cambia a:
  ```
  https://drive.google.com/uc?export=view&id=ID_DEL_ARCHIVO
  ```

### 📸 Agregar Fotos a la Galería

```javascript
gallery: {
    photos: [
        {
            url: "assets/images/competencia-2025.jpg",
            caption: "Competencia 2025"
        },
        {
            url: "assets/images/ganadores.jpg",
            caption: "Ceremonia de premiación"
        }
        // Agregar más fotos...
    ]
}
```

### 🎥 Agregar Videos (YouTube)

**Paso 1:** Sube tu video a YouTube

**Paso 2:** Obtén el ID del video (la parte después de `watch?v=`)
- Ejemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ID: `dQw4w9WgXcQ`

**Paso 3:** Agrégalo al código:

```javascript
gallery: {
    videos: [
        {
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            title: "Resumen 1º Torneo"
        }
    ]
}
```

**Nota:** El thumbnail se genera automáticamente con `https://img.youtube.com/vi/ID_DEL_VIDEO/maxresdefault.jpg`

---

## 🎨 Personalización de Diseño

### Cambiar Colores

Busca la sección `:root` en el CSS (aproximadamente línea 20):

```css
:root {
    /* Colores principales */
    --color-primary: #FFB627;      /* Amarillo/dorado principal */
    --color-secondary: #5DADE2;    /* Azul */
    --color-accent: #F39C12;       /* Naranja */
    --color-dark: #7D4E1A;         /* Marrón oscuro */
    --color-light: #FFF8E7;        /* Crema claro */
    --color-white: #FFFFFF;        /* Blanco */
    --color-text: #333333;         /* Texto oscuro */
    --color-bg: #FFFBF0;           /* Fondo general */
}
```

### Personalizar el Fondo de Ecuaciones

El sitio web utiliza un **sistema de 3 capas** para el fondo:

#### **Capa 1: Imagen de Ecuaciones (del certificado)**
Busca `.equations-bg` en el CSS (aproximadamente línea 50):

```css
.equations-bg {
    background-image: url('assets/images/equations-background.png');
    background-size: 1200px auto;  /* Tamaño del patrón */
    opacity: 0.035;                /* Intensidad (0.01-0.1) */
    filter: brightness(1.15);      /* Brillo (0.8-1.5) */
}
```

**Ajustes recomendados:**
- **Más visible:** `opacity: 0.05`
- **Más sutil:** `opacity: 0.02`
- **Patrón más grande:** `background-size: 1500px auto`
- **Patrón más pequeño:** `background-size: 900px auto`
- **Más claro:** `brightness(1.3)`
- **Más oscuro:** `brightness(0.9)`

#### **Capa 2: Hexágonos (panales)**
```css
.honeycomb-bg {
    opacity: 0.02;  /* Muy sutil, complementa la capa 1 */
}
```

#### **Capa 3: Símbolos Flotantes**
```css
.math-symbol {
    opacity: 0.08;  /* Símbolos como ∫ dx ∂ ∇ */
}
```

**Para cambiar la imagen de fondo:**
1. Optimiza tu nueva imagen con TinyPNG
2. Guárdala como `assets/images/equations-background.png`
3. Ajusta `opacity` y `background-size` según necesites

### Cambiar Tipografías

Las tipografías se configuran fácilmente en la misma sección `:root`:

```css
:root {
    --font-primary: 'Poppins', 'Segoe UI', sans-serif;      /* Texto general */
    --font-secondary: 'Montserrat', 'Arial', sans-serif;    /* Texto secundario */
    --font-display: 'Fredoka One', 'Arial Black', sans-serif; /* Títulos grandes */
}
```

**Tipografías disponibles en Google Fonts:**
- Poppins (moderna, limpia)
- Montserrat (versátil)
- Fredoka One (juguetona, para títulos)
- Roboto (neutral, profesional)
- Open Sans (legible)
- Lato (elegante)

**Para cambiar a otra fuente:**

1. Ve a [Google Fonts](https://fonts.google.com/)
2. Selecciona la fuente que te guste
3. Copia el enlace de importación
4. Modifica la línea de `@import` en el CSS (línea 18)
5. Cambia el nombre en las variables de `:root`

**Ejemplo - Cambiar a Roboto:**

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600;700&display=swap');

:root {
    --font-primary: 'Roboto', sans-serif;
}
```

### Cambiar el Logo

El logo actual es un placeholder SVG. Para usar tu logo real:

**Opción 1 - Imagen local:**
```html
<!-- Busca esta línea (aprox. línea 550) -->
<img src="data:image/svg+xml..." alt="Logo">

<!-- Reemplázala con: -->
<img src="assets/images/logo.png" alt="Logo Integration Bee">
```

**Opción 2 - URL externa:**
```html
<img src="https://tu-servidor.com/logo.png" alt="Logo Integration Bee">
```

Haz lo mismo en las otras 2 apariciones del logo (navegación y hero).

---

## 🚀 Publicación en GitHub Pages

### Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Click en el botón **"New"** (nuevo repositorio)
3. Nombra tu repositorio: `integration-bee-umsa`
4. Marca como **Public** (público)
5. Click en **"Create repository"**

### Paso 2: Subir Archivos

**Opción A - Desde la web (más fácil):**

1. En tu repositorio, click en **"Add file"** → **"Upload files"**
2. Arrastra tu archivo `index.html` y la carpeta `assets/`
3. Escribe un mensaje: "Versión inicial del sitio web"
4. Click en **"Commit changes"**

**Opción B - Usando Git (terminal):**

```bash
# Inicializa el repositorio local
git init

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "Versión inicial del sitio web"

# Conecta con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/integration-bee-umsa.git

# Sube los archivos
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **Settings** (Configuración)
2. En el menú lateral, busca **Pages**
3. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click en **Save**
5. ¡Espera 1-2 minutos!

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/integration-bee-umsa/
```

### Paso 4: Dominio Personalizado (Opcional)

Si más adelante compran un dominio:

1. En la configuración de GitHub Pages, agrega tu dominio personalizado
2. Configura los DNS de tu proveedor de dominio apuntando a:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

---

## 🔧 Mantenimiento y Actualización

### Actualizar Ganadores (después de cada torneo)

1. Abre `index.html` en un editor de texto
2. Busca `const websiteData = {`
3. Agrega el nuevo ganador al array `winners`
4. Guarda el archivo
5. Sube los cambios a GitHub

**Usando Git:**
```bash
git add index.html
git commit -m "Actualizar ganadores torneo 2026"
git push origin main
```

### Agregar Nuevo Banco de Preguntas

1. Sube el PDF a `assets/pdfs/`
2. Edita `index.html` y agrega entrada en `questionBanks`
3. Sube ambos archivos a GitHub

### Actualizar Galería

1. Sube las nuevas imágenes a `assets/images/`
2. Agrega las referencias en el array `gallery.photos`
3. Para videos, solo necesitas el ID de YouTube

---

## 🐛 Solución de Problemas

### El PDF no se visualiza

**Problema:** Al hacer clic en un banco de preguntas, el visor no muestra el PDF.

**Soluciones:**
1. Verifica que la ruta del PDF sea correcta
2. Asegúrate de que el PDF esté público en GitHub
3. Prueba usando Google Drive como alternativa
4. Verifica que el PDF no esté protegido con contraseña

### Las imágenes no cargan

**Problema:** Las fotos de la galería no se muestran.

**Soluciones:**
1. Verifica que las rutas sean correctas (respeta mayúsculas/minúsculas)
2. Asegúrate de que las imágenes estén en la carpeta `assets/images/`
3. Comprueba que los archivos se hayan subido correctamente a GitHub
4. Intenta usar rutas absolutas: `https://tu-usuario.github.io/repo/assets/images/foto.jpg`

### El diseño se ve mal en móvil

**Problema:** La página no se adapta bien a pantallas pequeñas.

**Solución:**
- El diseño es responsivo por defecto
- Prueba limpiando la caché del navegador
- Verifica que no hayas modificado los media queries del CSS

### Los cambios no se reflejan en la página publicada

**Problema:** Actualicé el código pero no veo los cambios en la web.

**Soluciones:**
1. GitHub Pages puede tardar 1-5 minutos en actualizar
2. Limpia la caché del navegador (Ctrl + Shift + R)
3. Verifica que los cambios se hayan subido correctamente a GitHub
4. Prueba en modo incógnito

### Error "404 - Page not found"

**Problema:** Al acceder a la URL de GitHub Pages, aparece error 404.

**Soluciones:**
1. Verifica que el archivo se llame exactamente `index.html` (minúsculas)
2. Asegúrate de que esté en la raíz del repositorio (no en una subcarpeta)
3. Revisa que GitHub Pages esté activado en la configuración
4. Espera unos minutos, a veces tarda en activarse

---

## 📞 Contacto y Soporte

Si tienes problemas o necesitas ayuda para mantener el sitio:

1. **Revisa esta documentación** primero
2. **Busca en Google** el mensaje de error específico
3. **Consulta la documentación de GitHub Pages:** https://docs.github.com/es/pages
4. **Pide ayuda** a alguien con conocimientos de HTML/CSS/JavaScript

---

## ✅ Checklist de Publicación

Antes de publicar cambios, verifica:

- [ ] Los datos están actualizados en `websiteData`
- [ ] Todos los PDFs están subidos y las rutas son correctas
- [ ] Las imágenes están optimizadas (no muy pesadas)
- [ ] Has probado el sitio localmente (abriendo index.html en un navegador)
- [ ] Los enlaces externos funcionan (redes sociales, videos de YouTube)
- [ ] El sitio se ve bien en móvil y desktop
- [ ] Has hecho commit y push de todos los cambios

---

## 🎓 Recursos Adicionales

### Para aprender más sobre las tecnologías usadas:

- **HTML/CSS:** [MDN Web Docs](https://developer.mozilla.org/es/)
- **JavaScript:** [JavaScript.info](https://javascript.info/)
- **GitHub Pages:** [Documentación oficial](https://docs.github.com/es/pages)
- **Git:** [Git - La Guía Sencilla](https://rogerdudler.github.io/git-guide/index.es.html)

### Herramientas útiles:

- **Editor de código:** [Visual Studio Code](https://code.visualstudio.com/) (gratuito)
- **Optimizar imágenes:** [TinyPNG](https://tinypng.com/)
- **Probar responsividad:** Usa las herramientas de desarrollador del navegador (F12)
- **Colores:** [Coolors](https://coolors.co/) para generar paletas

---

## 🔄 Separación de Archivos (Futuro)

### ¿Por qué actualmente está todo en un archivo?

El sitio web está diseñado como un **archivo HTML único** (`index.html`) por las siguientes razones:

✅ **Simplicidad:** Un solo archivo para actualizar y mantener
✅ **Sin problemas de rutas:** Todo está embebido, no hay conflictos
✅ **GitHub Pages friendly:** Sube un archivo y funciona inmediatamente
✅ **Fácil de transferir:** Si dejas el proyecto, entregas un solo archivo
✅ **Sin problemas de caché:** El navegador siempre recarga todo
✅ **Portabilidad:** Puedes abrirlo localmente sin servidor

### Cuándo Considerar Separar en Múltiples Archivos

Deberías separar el código en archivos individuales (HTML, CSS, JS) cuando:

#### 1. **El archivo crece demasiado**
- Si `index.html` supera las **3000-4000 líneas**
- Se vuelve difícil encontrar secciones específicas
- El editor de código se vuelve lento

#### 2. **Múltiples páginas**
```
Si necesitas:
- index.html (inicio)
- competiciones.html (historial de competiciones)
- resultados.html (resultados detallados)
- inscripcion.html (formulario de inscripción)

→ Tiene sentido compartir un mismo styles.css entre todas
```

#### 3. **Trabajo en equipo simultáneo**
```
Diseñador → edita styles.css
Programador → edita script.js
Editor de contenido → edita index.html

Sin separación: todos editan el mismo archivo (conflictos)
Con separación: cada uno edita su archivo (sin conflictos)
```

#### 4. **Optimización de carga**
```
Si el sitio se vuelve lento:
- Minificar CSS y JS por separado
- Usar caché del navegador eficientemente
- Cargar recursos de forma diferida (lazy loading)
```

---

## 🚧 Problemas Potenciales al Separar

### Problema 1: Rutas Relativas
**Qué pasa:**
```html
<!-- index.html -->
<link rel="stylesheet" href="css/styles.css">
<script src="js/script.js"></script>
```

Si la estructura de carpetas cambia, las rutas se rompen.

**Solución:**
- Usa rutas consistentes desde la raíz
- Prueba siempre en un servidor local antes de publicar
- Documenta claramente la estructura de carpetas

### Problema 2: Caché del Navegador
**Qué pasa:**
```
Usuario visita el sitio → Navegador guarda styles.css
Actualizas styles.css → Usuario no ve cambios (usa versión antigua)
```

**Solución:** Versionar los archivos
```html
<link rel="stylesheet" href="css/styles.css?v=1.2">
<script src="js/script.js?v=1.2"></script>
<!-- Cambia el número de versión con cada actualización -->
```

### Problema 3: Errores CORS
**Qué pasa:**
Si abres `index.html` directamente (protocolo `file://`), JavaScript puede fallar al cargar archivos externos.

**Solución:**
- Siempre prueba con un servidor local
- Usa extensiones como "Live Server" en VS Code
- O ejecuta: `python -m http.server 8000` en la carpeta del proyecto

### Problema 4: Olvidar Subir Archivos
**Qué pasa:**
```bash
git add index.html
git commit -m "Actualización"
git push
# ❌ Olvidaste styles.css → página se ve mal
```

**Solución:**
- Usa `git add .` para agregar todo
- Haz checklist antes de cada commit
- Revisa siempre con `git status`

### Problema 5: Orden de Carga
**Qué pasa:**
JavaScript se ejecuta antes de que el HTML esté listo.

**Solución:**
```html
<!-- Usa defer para que espere al HTML -->
<script src="js/script.js" defer></script>

<!-- O coloca los scripts al final del body -->
<body>
    <!-- HTML aquí -->
    <script src="js/script.js"></script>
</body>
```

---

## 📐 Guía de Separación (Cuando Sea Necesario)

### Estructura Recomendada:

```
integration-bee-umsa/
│
├── index.html              # Solo estructura HTML
├── css/
│   └── styles.css         # Todo el CSS
├── js/
│   ├── config.js          # Datos (websiteData)
│   └── main.js            # Funciones y lógica
└── assets/
    ├── images/
    │   ├── logo.png
    │   └── galeria/
    └── pdfs/
        └── torneos/
```

### Paso a Paso para Separar:

#### **1. Extraer el CSS**

**Crear:** `css/styles.css`

Copia todo el contenido entre `<style>` y `</style>` de `index.html` y pégalo en el nuevo archivo.

**En index.html:**
```html
<head>
    <!-- Elimina todo el <style>...</style> -->
    <!-- Agrega esta línea: -->
    <link rel="stylesheet" href="css/styles.css">
</head>
```

#### **2. Extraer los Datos**

**Crear:** `js/config.js`

```javascript
// Copia el objeto websiteData de index.html
const websiteData = {
    winners: [...],
    questionBanks: [...],
    gallery: {...}
};
```

#### **3. Extraer el JavaScript**

**Crear:** `js/main.js`

Copia todas las funciones de JavaScript de `index.html` (todo lo que está dentro de `<script>...</script>`).

**En index.html:**
```html
<body>
    <!-- Tu HTML aquí -->
    
    <!-- Al final del body: -->
    <script src="js/config.js"></script>
    <script src="js/main.js"></script>
</body>
```

#### **4. Probar Localmente**

**NO abras index.html directamente.** Usa un servidor local:

**Opción A - Python:**
```bash
# En la carpeta del proyecto:
python -m http.server 8000
# Abre: http://localhost:8000
```

**Opción B - Node.js:**
```bash
npx http-server
```

**Opción C - VS Code:**
- Instala extensión "Live Server"
- Click derecho en index.html → "Open with Live Server"

#### **5. Verificar Todo Funciona**

Checklist:
- [ ] La página carga correctamente
- [ ] Los estilos se aplican (colores, fuentes)
- [ ] Los botones funcionan
- [ ] El visor de PDF abre
- [ ] La galería cambia entre fotos/videos
- [ ] No hay errores en la consola (F12)

#### **6. Actualizar Git**

```bash
git add .
git commit -m "Refactorizar: separar HTML, CSS y JS"
git push origin main
```

#### **7. Verificar en GitHub Pages**

- Espera 2-5 minutos
- Visita tu URL de GitHub Pages
- Verifica que todo funcione online
- Prueba en móvil

---

## 📊 Comparación: Archivo Único vs Separado

| Aspecto | Archivo Único | Archivos Separados |
|---------|---------------|-------------------|
| **Facilidad de edición** | ⭐⭐⭐⭐⭐ Todo en un lugar | ⭐⭐⭐ Buscar entre archivos |
| **Trabajo en equipo** | ⭐⭐ Conflictos si editan juntos | ⭐⭐⭐⭐⭐ Sin conflictos |
| **Velocidad de carga** | ⭐⭐⭐⭐ Una sola petición | ⭐⭐⭐ Múltiples peticiones |
| **Organización** | ⭐⭐⭐ Bien hasta 3000 líneas | ⭐⭐⭐⭐⭐ Muy organizado |
| **Reutilización** | ⭐ Difícil compartir estilos | ⭐⭐⭐⭐⭐ Fácil reutilizar |
| **Mantenimiento** | ⭐⭐⭐⭐ Simple para una persona | ⭐⭐⭐⭐ Requiere coordinación |
| **Problemas técnicos** | ⭐⭐⭐⭐⭐ Casi ninguno | ⭐⭐⭐ CORS, caché, rutas |

---

## 🎯 Recomendación Final

### **Mantén el archivo único mientras:**
- El proyecto sea mantenido por 1-2 personas
- El archivo sea menor a 3000 líneas
- Solo tengas una página (index.html)
- Las actualizaciones sean esporádicas (después de cada torneo)

### **Considera separar cuando:**
- El equipo crezca a 3+ personas editando simultáneamente
- El archivo supere las 4000 líneas
- Agreguen múltiples páginas HTML
- Necesiten optimizaciones de rendimiento avanzadas
- El sitio requiera actualización de contenido muy frecuente

---

## 📝 Historial de Cambios

### Versión 1.0 (Noviembre 2025)
- ✅ Diseño inicial completado
- ✅ Sistema de ganadores implementado
- ✅ Banco de preguntas con visor de PDF
- ✅ Galería de fotos y videos
- ✅ Diseño responsivo
- ✅ Animaciones y elementos interactivos
- ✅ Documentación de separación de archivos

---

**¡Éxito con tu proyecto Integration Bee Physics! 🐝✨**

*Última actualización: Noviembre 2025*