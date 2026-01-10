# ?? Documentación - Integration Bee Physics UMSA

## ?? Índice
1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Configuración de Google Drive API](#configuración-de-google-drive-api)
4. [Configuración de Contenido](#configuración-de-contenido)
5. [Personalización de Diseño](#personalización-de-diseño)
6. [Publicación en GitHub Pages](#publicación-en-github-pages)
7. [Mantenimiento y Actualización](#mantenimiento-y-actualización)
8. [Solución de Problemas](#solución-de-problemas)
9. [Recursos Adicionales](#recursos-adicionales)

---

## ?? Introducción

Este sitio web fue diseñado para el grupo **Integration Bee Physics** de la UMSA. Es una página moderna, responsiva y fácil de actualizar que incluye:

- ? Sección de últimos ganadores
- ? Banco de preguntas con visor de PDFs
- ? **Galería automática con Google Drive**
- ? Videos de YouTube integrados
- ? Sección "Sobre Nosotros"
- ? Diseño responsivo (móvil, tablet, desktop)
- ? Animaciones sutiles y temática de abejas
- ? Tipografías intercambiables

### ?? Versión 2.0 - Arquitectura Modular

Esta versión utiliza una **estructura modular** con archivos separados:
- ?? **HTML separado** - Páginas limpias y fáciles de leer
- ?? **CSS compartido** - Un solo archivo de estilos
- ?? **JavaScript modular** - Código organizado por funcionalidad
- ?? **Configuración centralizada** - Datos en un solo lugar

---

## ?? Estructura del Proyecto

```
integration-bee-physics/
¦
+-- index.html                # Página principal
+-- galeria.html              # Página de galería (Google Drive)
¦
+-- css/
¦   +-- styles.css            # Estilos compartidos (ambas páginas)
¦
+-- js/
¦   +-- config.js             # ?? Configuración y datos (EDITAR AQUÍ)
¦   +-- main.js               # Lógica de index.html
¦   +-- gallery.js            # Lógica de galería (Google Drive)
¦
+-- assets/
¦   +-- images/
¦   ¦   +-- logo.png
¦   ¦   +-- miembros.jpg
¦   ¦   +-- equations-background.png  # ?? IMPORTANTE: Fondo matemático
¦   +-- pdfs/
¦       +-- torneos/          # Bancos de preguntas en PDF
¦
+-- README.md                 # Instrucciones rápidas
+-- MANUAL.md                 # Esta documentación completa
```

### ?? Descripción de Archivos Principales

| Archivo | Propósito | Cuándo Editar |
|---------|-----------|---------------|
| **index.html** | Estructura de la página principal | Raramente (solo cambios estructurales) |
| **galeria.html** | Estructura de la página de galería | Raramente |
| **css/styles.css** | Todos los estilos visuales | Para cambiar colores, fuentes, diseño |
| **js/config.js** | ? Datos editables (ganadores, preguntas, videos) | **Frecuentemente** (después de cada torneo) |
| **js/main.js** | Funcionalidad de index.html | Raramente (solo mejoras técnicas) |
| **js/gallery.js** | Conexión con Google Drive | Raramente (solo configuración inicial) |

---

## ?? Configuración de Google Drive API

La galería carga imágenes automáticamente desde Google Drive usando Google Apps Script.

### ?? Paso 1: Crear el Google Apps Script

1. Ve a: **https://script.google.com**
2. Clic en **"Nuevo proyecto"**
3. Nombra el proyecto: **"Integration Bee Gallery API"**
4. Borra todo el código predeterminado
5. Pega este código:

```javascript
function doGet(e) {
  const folderId = '1IYcXth0WqpryjJtan4fVl38xGfy1KHfs'; // ID de tu carpeta de Drive
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  
  const images = [];
  
  while (files.hasNext()) {
    const file = files.next();
    const mimeType = file.getMimeType();
    
    // Solo imágenes
    if (mimeType.indexOf('image') !== -1) {
      images.push({
        name: file.getName(),
        url: `https://drive.google.com/uc?export=view&id=${file.getId()}`,
        thumbnail: `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w400`,
        date: file.getDateCreated().toISOString()
      });
    }
  }
  
  // Ordenar por fecha (más recientes primero)
  images.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const output = ContentService.createTextOutput(JSON.stringify({
    success: true,
    images: images,
    total: images.length
  }));
  
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

6. Clic en **?? Guardar** (ícono de diskette)

### ?? Paso 2: Publicar el Script

1. Clic en **"Implementar"** ? **"Nueva implementación"**
2. En "Seleccionar tipo", clic en el ?? y elige: **"Aplicación web"**
3. Configuración:
   - **Descripción:** "API para galería Integration Bee"
   - **Ejecutar como:** Tu cuenta
   - **Quién tiene acceso:** **Cualquier persona** ?? (Importante)
4. Clic en **"Implementar"**
5. Aparecerá una ventana de permisos:
   - Clic en **"Autorizar acceso"**
   - Selecciona tu cuenta de Google
   - Clic en **"Avanzado"** ? **"Ir a [nombre del proyecto] (no seguro)"**
   - Clic en **"Permitir"**
6. **?? COPIA LA URL** que aparece (algo como):
   ```
   https://script.google.com/macros/s/AKfycbz...ABC123.../exec
   ```

### ?? Paso 3: Configurar Permisos de la Carpeta de Drive

1. Abre tu carpeta de Drive:
   ```
   https://drive.google.com/drive/folders/1IYcXth0WqpryjJtan4fVl38xGfy1KHfs
   ```
2. Clic derecho ? **"Compartir"**
3. En **"Acceso general"**:
   - Cambia de "Restringido" a **"Cualquier persona con el enlace"**
   - Rol: **Lector**
4. Clic en **"Copiar enlace"** (opcional, para respaldo)
5. Clic en **"Listo"**

### ?? Paso 4: Actualizar config.js

1. Abre el archivo `js/config.js` en tu editor de texto
2. Busca esta línea (aproximadamente línea 10):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'TU_URL_DEL_GOOGLE_APPS_SCRIPT_AQUI';
   ```
3. Reemplázala con tu URL real:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz...ABC123.../exec';
   ```
4. Guarda el archivo

### ? Paso 5: Probar

1. Abre `galeria.html` en un navegador
2. Deberías ver:
   - Indicador de "Cargando imágenes..."
   - Luego tus fotos aparecen automáticamente
   - Contador de imágenes actualizado

**Si no funciona**, ve a [Solución de Problemas](#solución-de-problemas).

### ?? Agregar Nuevas Fotos

**¡Súper fácil!** Solo:
1. Sube las fotos a tu carpeta de Google Drive
2. ¡Listo! Aparecerán automáticamente en la web

**No necesitas:**
- ? Editar código
- ? Actualizar listas manualmente
- ? Subir imágenes a GitHub

---

## ?? Configuración de Contenido

**TODO el contenido editable está en un solo archivo:**

?? **`js/config.js`** ? Edita aquí

### ?? Actualizar Ganadores

Abre `js/config.js` y busca el array `winnersData` (línea ~30):

```javascript
const winnersData = [
    {
        position: "1er Lugar",
        name: "Joaquín Uscamayta (Ingeniería Química, UMSA)",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    },
    {
        position: "2do Lugar",
        name: "Boris Vargas Villareal (Ingeniería Electrica, UMSA)",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    },
    {
        position: "3er Lugar",
        name: "Miguel Lopez Monasterios (Física, UMSA)",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    }
    // Agregar más ganadores aquí
];
```

**Para agregar un nuevo ganador:**

```javascript
{
    position: "1er Lugar",
    name: "Nuevo Ganador (Carrera, UMSA)",
    edition: "2º Torneo Integration Bee Physics",
    date: "15 de marzo, 2026"
},
```

### ?? Actualizar Banco de Preguntas

En `js/config.js`, busca `questionBanksData` (línea ~50):

```javascript
const questionBanksData = [
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Problemas de 5 minutos",
        edition: "Primera Edición",
        problems: 50,
        pdfUrl: "#"  // Cambiar por URL real
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Problemas de 3 minutos",
        edition: "Primera Edición",
        problems: 30,
        pdfUrl: "#"
    }
];
```

**Para agregar un nuevo banco:**

1. Sube el PDF a GitHub en `assets/pdfs/torneos/`
2. Agrega una nueva entrada:

```javascript
{
    year: 2026,
    title: "2º Torneo Integration Bee Physics",
    type: "Problemas de 5 minutos",
    edition: "Segunda Edición",
    problems: 60,
    pdfUrl: "assets/pdfs/torneos/2026-problemas-5min.pdf"
}
```

**Opciones para la URL del PDF:**

**Opción 1 - Archivo en GitHub:**
```javascript
pdfUrl: "assets/pdfs/torneos/mi-archivo.pdf"
```

**Opción 2 - Google Drive:**
1. Sube el PDF a Drive
2. Clic derecho ? Compartir ? Cualquier persona con el enlace
3. Copia el ID del enlace:
   ```
   https://drive.google.com/file/d/1ABC123xyz/view
                                  ? Este es el ID
   ```
4. Usa esta URL:
   ```javascript
   pdfUrl: "https://drive.google.com/uc?export=view&id=1ABC123xyz"
   ```

### ?? Actualizar Videos de YouTube

En `js/config.js`, busca `videosData` (línea ~90):

```javascript
const videosData = [
    {
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        title: 'Resumen 1º Torneo Integration Bee'
    }
];
```

**Para agregar un video:**

1. Sube el video a YouTube
2. Copia el ID de la URL:
   ```
   https://www.youtube.com/watch?v=ABC123xyz
                                   ? Este es el ID
   ```
3. Agrega al array:

```javascript
{
    youtubeId: 'ABC123xyz',
    thumbnail: 'https://img.youtube.com/vi/ABC123xyz/maxresdefault.jpg',
    title: 'Resumen 2º Torneo Integration Bee'
}
```

**El thumbnail se genera automáticamente** con:
```
https://img.youtube.com/vi/[ID_DEL_VIDEO]/maxresdefault.jpg
```

### ?? Actualizar Información de Contacto

En `js/config.js`, busca `contactInfo` (línea ~110):

```javascript
const contactInfo = {
    email: 'integrationbee@fiumsa.edu.bo',
    phone: '+591 76543210',
    address: 'Carrera de Física, UMSA',
    socialMedia: {
        facebook: '#',
        instagram: '#',
        youtube: '#',
        tiktok: '#'
    }
};
```

Reemplaza los `'#'` con las URLs reales de tus redes sociales.

---

## ?? Personalización de Diseño

**Archivo a editar:** `css/styles.css`

### ?? Cambiar Colores

Busca la sección `:root` (línea ~10):

```css
:root {
    /* Colores principales */
    --color-primary: #FFB627;      /* Amarillo/dorado - Color principal */
    --color-secondary: #5DADE2;    /* Azul - Acentos y botones */
    --color-accent: #F39C12;       /* Naranja - Hover effects */
    --color-dark: #7D4E1A;         /* Marrón - Textos oscuros */
    --color-light: #FFF8E7;        /* Crema - Fondos suaves */
    --color-white: #FFFFFF;        /* Blanco puro */
    --color-text: #333333;         /* Gris oscuro - Texto */
    --color-bg: #FFFBF0;           /* Crema - Fondo general */
}
```

**Ejemplo - Cambiar a tonos verdes:**

```css
:root {
    --color-primary: #10B981;      /* Verde esmeralda */
    --color-secondary: #3B82F6;    /* Azul */
    --color-accent: #059669;       /* Verde oscuro */
    --color-dark: #065F46;         /* Verde muy oscuro */
    --color-light: #D1FAE5;        /* Verde muy claro */
    --color-bg: #ECFDF5;           /* Fondo verde suave */
}
```

### ?? Cambiar Tipografías

En `css/styles.css`, línea ~5:

```css
:root {
    --font-primary: 'Poppins', 'Segoe UI', sans-serif;
    --font-secondary: 'Montserrat', 'Arial', sans-serif;
    --font-display: 'Fredoka One', 'Arial Black', sans-serif;
}
```

**Tipografías disponibles (ya importadas):**
- `Poppins` - Moderna y limpia
- `Montserrat` - Versátil y profesional
- `Fredoka One` - Juguetona para títulos

**Para usar otra fuente:**

1. Ve a [Google Fonts](https://fonts.google.com/)
2. Selecciona tu fuente favorita
3. Clic en "Select this style"
4. Copia el `@import` y pégalo en la línea 18 de `styles.css`
5. Actualiza las variables en `:root`

**Ejemplo - Cambiar a Roboto:**

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600;700&display=swap');

:root {
    --font-primary: 'Roboto', sans-serif;
}
```

### ??? Personalizar el Fondo de Ecuaciones

**?? IMPORTANTE:** El sitio utiliza una imagen de fondo con ecuaciones matemáticas.

**Ubicación:** `assets/images/equations-background.png`

**Requisitos:**
- Formato: PNG con fondo transparente
- Peso: 200-400 KB (optimizada)
- Resolución: 1280x900 px o similar
- Contenido: Ecuaciones matemáticas distribuidas uniformemente

**Ajustar opacidad y tamaño:**

En `css/styles.css`, busca `.equations-bg` (línea ~60):

```css
.equations-bg {
    background-image: url('assets/images/equations-background.png');
    background-size: 1200px auto;  /* Tamaño del patrón */
    opacity: 0.05;                 /* Intensidad (0.02-0.1) */
    filter: brightness(1.15);      /* Brillo (0.8-1.5) */
}
```

**Ajustes recomendados:**
- **Más visible:** `opacity: 0.08`
- **Más sutil:** `opacity: 0.03`
- **Patrón más grande:** `background-size: 1500px auto`
- **Patrón más pequeño:** `background-size: 900px auto`

**Si no tienes la imagen:**
El sitio funcionará sin problemas, simplemente no mostrará el fondo de ecuaciones.

### ?? Ajustar Elementos Decorativos

**Hexágonos (panal):**
```css
.honeycomb-bg {
    opacity: 0.05;  /* Cambiar para más/menos visible */
}
```

**Símbolos matemáticos flotantes:**
```css
.math-symbol {
    opacity: 0.08;  /* Cambiar para más/menos visible */
}
```

### ?? Cambiar el Logo

**Opción 1 - Tienes un logo en PNG/SVG:**

1. Guarda tu logo en `assets/images/logo.png`
2. El sitio lo cargará automáticamente

**Opción 2 - Cambiar manualmente:**

En `index.html` y `galeria.html`, busca:
```html
<img src="assets/images/logo.png" alt="Logo Integration Bee">
```

Reemplaza con tu URL:
```html
<img src="assets/images/mi-nuevo-logo.svg" alt="Logo Integration Bee">
```

---

## ?? Publicación en GitHub Pages

### ?? Requisitos Previos

- Cuenta en [GitHub](https://github.com)
- Git instalado (opcional, se puede hacer desde la web)

### Paso 1: Crear Repositorio

1. Ve a https://github.com y crea una cuenta (si no tienes)
2. Clic en el botón **"+"** (arriba derecha) ? **"New repository"**
3. Configuración:
   - **Repository name:** `integration-bee-umsa`
   - **Description:** "Sitio web oficial del Integration Bee Physics UMSA"
   - **Public** (marcado)
   - ? **Add a README file** (opcional)
4. Clic en **"Create repository"**

### Paso 2: Subir Archivos

**Opción A - Desde la Web (Más Fácil):**

1. En tu repositorio, clic en **"Add file"** ? **"Upload files"**
2. Arrastra TODOS tus archivos y carpetas:
   ```
   - index.html
   - galeria.html
   - css/ (carpeta completa)
   - js/ (carpeta completa)
   - assets/ (carpeta completa)
   - README.md
   - MANUAL.md
   ```
3. En "Commit changes":
   - Mensaje: `Versión inicial del sitio web`
4. Clic en **"Commit changes"**

**Opción B - Usando Git (Terminal):**

```bash
# En la carpeta de tu proyecto:
git init
git add .
git commit -m "Versión inicial del sitio web"

# Conecta con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/integration-bee-umsa.git

# Sube los archivos
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **"Settings"** (?? Configuración)
2. En el menú lateral, busca **"Pages"**
3. En **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clic en **"Save"**
5. ? **Espera 1-3 minutos**

### Paso 4: Verificar

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/integration-bee-umsa/
```

**Ejemplo:**
Si tu usuario es `fisica-umsa`, la URL será:
```
https://fisica-umsa.github.io/integration-bee-umsa/
```

### ?? Dominio Personalizado (Opcional)

Si compran un dominio (ej: `integrationbee.com`):

1. En GitHub Pages, agrega tu dominio en **"Custom domain"**
2. En tu proveedor de dominio, configura estos DNS (A Records):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Espera 24-48 horas para que se propague

---

## ?? Mantenimiento y Actualización

### ?? Después de Cada Torneo

**Checklist de actualización:**

- [ ] Editar `js/config.js` con nuevos ganadores
- [ ] Subir PDFs nuevos a `assets/pdfs/torneos/`
- [ ] Actualizar `questionBanksData` con nuevos bancos
- [ ] Subir fotos nuevas a Google Drive (galería automática)
- [ ] Agregar videos a YouTube y actualizar `videosData`
- [ ] Probar localmente
- [ ] Subir cambios a GitHub

### ?? Flujo de Actualización con Git

```bash
# 1. Edita js/config.js
# 2. Sube nuevos PDFs a assets/pdfs/torneos/
# 3. Luego:

git add .
git commit -m "Actualización post-torneo 2026"
git push origin main

# Espera 1-2 minutos y revisa tu sitio web
```

### ?? Actualizar Galería

**¡Súper fácil!**

1. Abre tu carpeta de Google Drive
2. Sube las fotos nuevas
3. ¡Listo! Aparecen automáticamente en la web

**No necesitas editar código ni subir a GitHub.**

### ?? Agregar Nuevo Video

1. Sube el video a YouTube
2. Copia el ID del video
3. Edita `js/config.js`:
   ```javascript
   videosData: [
       // Videos existentes...
       {
           youtubeId: 'NUEVO_ID',
           thumbnail: 'https://img.youtube.com/vi/NUEVO_ID/maxresdefault.jpg',
           title: 'Nuevo Video'
       }
   ]
   ```
4. Sube a GitHub

### ?? Actualizar Solo una Página

**Si solo modificas `index.html` o `galeria.html`:**

```bash
git add index.html
git commit -m "Actualizar texto en página principal"
git push origin main
```

**Si solo modificas estilos:**

```bash
git add css/styles.css
git commit -m "Cambiar colores a tonos verdes"
git push origin main
```

---

## ?? Solución de Problemas

### ? Las imágenes de Google Drive no cargan

**Síntomas:**
- La galería muestra "Cargando..." eternamente
- Aparece "Error al cargar imágenes"
- Contador dice "0 imágenes"

**Verificar:**

1. **URL del script correcta:**
   - Abre `js/config.js`
   - Verifica que `GOOGLE_SCRIPT_URL` tenga la URL completa del Apps Script
   - Debe terminar en `/exec`

2. **Script publicado correctamente:**
   - Ve a script.google.com
   - Abre tu proyecto
   - Clic en "Implementar" ? "Administrar implementaciones"
   - Verifica que diga "Cualquier persona" en acceso

3. **Carpeta de Drive pública:**
   - Abre la carpeta en Drive
   - Clic derecho ? Compartir
   - Debe estar en "Cualquier persona con el enlace"

4. **Hay imágenes en la carpeta:**
   - Verifica que haya archivos JPG, PNG o GIF
   - Los archivos deben ser imágenes válidas

**Probar manualmente:**
1. Copia la URL de `GOOGLE_SCRIPT_URL`
2. Pégala en tu navegador
3. Deberías ver un JSON con tus imágenes:
   ```json
   {
     "success": true,
     "images": [...],
     "total": 35
   }
   ```

Si ves esto, el script funciona. Si no:
- Revisa permisos del script
- Revisa que el ID de la carpeta sea correcto

### ? El PDF no se visualiza

**Problema:** Al hacer clic en un banco de preguntas, el visor está en blanco.

**Soluciones:**

1. **Verifica la ruta del PDF:**
   ```javascript
   // En config.js
   pdfUrl: "assets/pdfs/torneos/mi-archivo.pdf"  // ? Correcto
   pdfUrl: "assets/pdfs/mi-archivo.pdf"          // ? Falta /torneos/
   ```

2. **Archivo subido a GitHub:**
   - Ve a tu repositorio en GitHub
   - Navega a `assets/pdfs/torneos/`
   - Verifica que el PDF esté ahí

3. **Usa Google Drive como alternativa:**
   ```javascript
   pdfUrl: "https://drive.google.com/uc?export=view&id=TU_ID_AQUI"
   ```

4. **PDF no protegido:**
   - El PDF no debe tener contraseña
   - Debe permitir visualización

### ? Las imágenes locales no cargan

**Problema:** Las fotos en `assets/images/` no se ven.

**Causas comunes:**

1. **Rutas incorrectas:**
   ```html
   <!-- ? Incorrecto -->
   <img src="/assets/images/logo.png">
   
   <!-- ? Correcto -->
   <img src="assets/images/logo.png">
   ```

2. **Nombres con mayúsculas:**
   - GitHub Pages es case-sensitive
   - `logo.PNG` ? `logo.png`
   - Usa siempre minúsculas

3. **Archivo no subido:**
   - Verifica en GitHub que el archivo exista
   - Asegúrate de haberlo incluido en el commit

### ? Los cambios no se reflejan en la página

**Problema:** Actualicé el código pero la web sigue igual.

**Soluciones:**

1. **Esperar propagación:**
   - GitHub Pages tarda 1-5 minutos en actualizar
   - Sé paciente

2. **Limpiar caché:**
   - Presiona `Ctrl + Shift + R` (Windows/Linux)
   - Presiona `Cmd + Shift + R` (Mac)
   - O abre en modo incógnito

3. **Verificar que se subió:**
   ```bash
   git status  # Ver qué archivos han cambiado
   git add .   # Agregar todos
   git push    # Subir a GitHub
   ```

4. **Revisar errores:**
   - Presiona `F12` en el navegador
   - Ve a la pestaña "Console"
   - Busca mensajes de error en rojo

### ? Error "404 - Page not found"

**Problema:** La URL de GitHub Pages da error 404.

**Soluciones:**

1. **Nombre del archivo:**
   - Debe llamarse exactamente `index.html`
   - No `Index.html` ni `INDEX.html`

2. **Ubicación del archivo:**
   - Debe estar en la raíz del repositorio
   - No dentro de una subcarpeta

3. **GitHub Pages activado:**
   - Ve a Settings ? Pages
   - Verifica que esté configurado en "main" y "/ (root)"

4. **Esperar activación:**
   - Primera vez puede tardar 10 minutos
   - Refresca la página de Settings ? Pages
   - Debe aparecer un banner verde: "Your site is published at..."

### ? El diseño se ve mal en móvil

**Problema:** La página no se adapta a pantallas pequeñas.

**Verificar:**

1. **Meta viewport presente:**
   - En `index.html` y `galeria.html`
   - Debe estar en `<head>`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **CSS cargándose:**
   - Abre `F12` ? Pestaña "Network"
   - Busca `styles.css`
   - Debe aparecer con status 200 (verde)

3. **Prueba en diferentes dispositivos:**
   - Usa las herramientas de desarrollador (`F12`)
   - Clic en el ícono de móvil
   - Prueba diferentes tamaños

### ? Los colores no cambian

**Problema:** Edité las variables CSS pero no se ven cambios.

**Causas:**

1. **Caché del navegador:**
   - Limpia caché: `Ctrl + Shift + R`

2. **Editaste el archivo equivocado:**
   - Asegúrate de editar `css/styles.css`
   - No `index.html` (ese ya no tiene estilos embebidos)

3. **Sintaxis incorrecta:**
   ```css
   /* ? Incorrecto */
   --color-primary #FFB627;
   
   /* ? Correcto */
   --color-primary: #FFB627;
   ```

4. **No guardaste el archivo:**
   - Verifica que hayas guardado `styles.css`
   - Súbelo a GitHub

---

## ?? Recursos Adicionales

### ?? Para Aprender Más

**Tecnologías del sitio:**
- [MDN Web Docs](https://developer.mozilla.org/es/) - HTML, CSS, JavaScript
- [JavaScript.info](https://javascript.info/) - Tutorial completo de JS
- [CSS-Tricks](https://css-tricks.com/) - Trucos y guías de CSS

**GitHub y Git:**
- [GitHub Docs](https://docs.github.com/es) - Documentación oficial
- [Git - Guía Sencilla](https://rogerdudler.github.io/git-guide/index.es.html)
- [GitHub Pages Docs](https://docs.github.com/es/pages)

**Google Apps Script:**
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Drive API Reference](https://developers.google.com/drive/api/v3/reference)

### ?? Herramientas Útiles

**Editores de código:**
- [Visual Studio Code](https://code.visualstudio.com/) - Editor gratuito (recomendado)
- [Sublime Text](https://www.sublimetext.com/) - Ligero y rápido
- [Atom](https://atom.io/) - Hackeable

**Optimización:**
- [TinyPNG](https://tinypng.com/) - Comprimir imágenes
- [Compressor.io](https://compressor.io/) - Optimizar imágenes
- [PageSpeed Insights](https://pagespeed.web.dev/) - Analizar rendimiento

**Diseño:**
- [Coolors](https://coolors.co/) - Generador de paletas de colores
- [Google Fonts](https://fonts.google.com/) - Fuentes gratuitas
- [Font Awesome](https://fontawesome.com/) - Íconos (si quieres agregar)

**Testing:**
- [BrowserStack](https://www.browserstack.com/) - Probar en diferentes dispositivos
- Chrome DevTools (`F12`) - Herramientas de desarrollador

### ?? Tutoriales Recomendados

**Para principiantes:**
1. [Codecademy - Learn HTML](https://www.codecademy.com/learn/learn-html)
2. [freeCodeCamp - Responsive Web Design](https://www.freecodecamp.org/)
3. [W3Schools](https://www.w3schools.com/) - Referencia rápida

**Para nivel intermedio:**
1. [JavaScript30](https://javascript30.com/) - 30 proyectos en 30 días
2. [CSS Grid Garden](https://cssgridgarden.com/) - Aprender Grid jugando
3. [Flexbox Froggy](https://flexboxfroggy.com/) - Aprender Flexbox jugando

---

## ? Checklist de Publicación

Antes de publicar cambios importantes, verifica:

### Contenido
- [ ] Ganadores actualizados en `js/config.js`
- [ ] Bancos de preguntas con URLs correctas
- [ ] PDFs subidos y accesibles
- [ ] Google Drive configurado correctamente
- [ ] Videos de YouTube con IDs correctos
- [ ] Información de contacto actualizada

### Archivos
- [ ] Todas las imágenes están en `assets/images/`
- [ ] Todos los PDFs están en `assets/pdfs/torneos/`
- [ ] Logo actualizado (si cambió)
- [ ] Imagen de fondo `equations-background.png` presente

### Código
- [ ] Sin errores en la consola del navegador (`F12`)
- [ ] Todos los enlaces funcionan
- [ ] PDFs se visualizan correctamente
- [ ] Galería carga fotos de Google Drive
- [ ] Videos de YouTube se reproducen

### Responsive
- [ ] Se ve bien en móvil (< 768px)
- [ ] Se ve bien en tablet (768px - 1024px)
- [ ] Se ve bien en desktop (> 1024px)
- [ ] Navegación funciona en móvil

### Git/GitHub
- [ ] Cambios guardados localmente
- [ ] `git add .` ejecutado
- [ ] `git commit -m "mensaje descriptivo"`
- [ ] `git push origin main`
- [ ] Esperado 2-3 minutos
- [ ] Revisado en la URL pública

---

## ?? Soporte

### Orden de Solución de Problemas

1. ? **Revisa este manual** - La mayoría de problemas están documentados
2. ? **Revisa la consola** - Presiona `F12` ? Pestaña "Console"
3. ? **Busca en Google** - Copia el mensaje de error exacto
4. ? **Revisa la documentación oficial:**
   - [GitHub Pages](https://docs.github.com/es/pages)
   - [Google Apps Script](https://developers.google.com/apps-script)
5. ? **Pregunta en foros:**
   - [Stack Overflow](https://stackoverflow.com/)
   - [GitHub Community](https://github.community/)

### Contacto del Proyecto

Si este manual no resuelve tu problema:
- ?? Email: [Tu email de contacto técnico]
- ?? Grupo interno: [Link a WhatsApp/Telegram del equipo]

---

## ?? Historial de Versiones

### Versión 2.0 (Enero 2026)
- ? **Arquitectura modular** - Archivos separados (HTML, CSS, JS)
- ? **Galería automática** - Integración con Google Drive API
- ? **Página de galería** - `galeria.html` independiente
- ? **Configuración centralizada** - Todo editable en `config.js`
- ? **CSS compartido** - Un solo archivo de estilos
- ? **JavaScript modular** - Separado por funcionalidad
- ? **Documentación actualizada** - Manual completo

### Versión 1.01 (Enero 2026)
- Actualización de ganadores gestión 2025
- Actualización de bancos de preguntas 2025
- Actualización de galería de fotos 2025

### Versión 1.0 (Noviembre 2025)
- Diseño inicial completado
- Sistema de ganadores
- Banco de preguntas con visor de PDF
- Galería básica de fotos y videos
- Diseño responsivo
- Animaciones y elementos interactivos

---

## ?? Consejos Finales

### Para Mantenimiento a Largo Plazo

1. **Documenta cambios importantes:**
   ```bash
   git commit -m "Agregar torneo 2026 con 60 problemas nuevos"
   # Mejor que:
   git commit -m "actualización"
   ```

2. **Haz copias de seguridad:**
   - El repositorio de GitHub ya es un backup
   - Descarga una copia local cada semestre

3. **Usa branches para cambios grandes:**
   ```bash
   git checkout -b rediseno-2027
   # Haz cambios...
   git push origin rediseno-2027
   # Prueba online antes de fusionar con main
   ```

4. **Mantén el manual actualizado:**
   - Si agregas funcionalidades nuevas, documéntalas aquí
   - Incluye capturas de pantalla si es útil

5. **Comparte conocimiento:**
   - Enseña a otros del equipo a actualizar el sitio
   - No dejes que una sola persona sepa todo

---

## ?? ¡Felicidades!

Has completado la documentación del sitio web Integration Bee Physics UMSA.

**Recuerda:**
- ?? Todo el contenido se edita en `js/config.js`
- ?? Los estilos se cambian en `css/styles.css`
- ?? La galería se actualiza subiendo fotos a Google Drive
- ?? Los cambios se publican con `git push`

---

*Última actualización: Enero 2026 - Versión 2.0*
*Mantenido por: Integration Bee Physics UMSA*