/* ============================================
   INTEGRATION BEE PHYSICS - CONFIG.JS
   Configuración y datos del sitio web
   ============================================ */

// ============================================
// CONFIGURACIÓN DE GOOGLE DRIVE
// ============================================

// 🔑 IMPORTANTE: Reemplaza esta URL con la de tu Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxvruidEdleD9mHBZ83GIrWOoC-GNLAFvklf2VAMEDpJf-BaZu924xlXfga4gkHn6sE/exec';

// URL de la carpeta de Google Drive (solo para referencia)
const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1IYcXth0WqpryjJtan4fVl38xGfy1KHfs';

// ============================================
// DATOS DE GANADORES
// ============================================

const winnersData = [
    {
        position: "1° Lugar",
        name: "Joaquín Uscamayta (Ingeniería Química, UMSA)",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    },
    {
        position: "2° Lugar",
        name: "Boris Vargas Villareal (Ingeniería Electrónica, UMSA)",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    },
    {
        position: "3° Lugar",
        name: "Miguel Lopez Monasterios (Física, UMSA)",
        edition: "1º Torneo Integration Bee Physics",
        date: "27 de septiembre, 2025"
    }
    // Agregar más ganadores aquí en el futuro
];

// ============================================
// BANCO DE PREGUNTAS
// ============================================

const questionBanksData = [
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "1° etapa de clasificación",
        edition: "Primera Edición",
        problems: 7,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/1_examen.pdf" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "2° etapa de clasificación",
        edition: "Primera Edición",
        problems: 21,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/2_clasificacion.pdf" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Problemas de Muerte Súbita",
        edition: "Primera Edición",
        problems: 11,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/6_muerte_subita.pdf" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Octavos de final",
        edition: "Primera Edición",
        problems: 12,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/3_octavos.pdf" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Cuartos de final",
        edition: "Primera Edición",
        problems: 12,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/4_cuartos.pdf" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: " Semifinal",
        edition: "Primera Edición",
        problems: 3,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/5_semifinal.pdf" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Final",
        edition: "Primera Edición",
        problems: 6,
        pdfUrl: "https://github.com/dj-t4b/integration-bee-physics/blob/master/assets/pdfs/torneos/integration_bee/7_final.pdf" // Reemplazar con la URL real del PDF
    }
    // Agregar más bancos de preguntas aquí
];

// ============================================
// VIDEOS DE YOUTUBE
// ============================================

const videosData = [
    {
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        title: 'Resumen 1º Torneo Integration Bee'
    }
    // Agregar más videos aquí
    // Para obtener el ID de un video de YouTube:
    // URL: https://www.youtube.com/watch?v=ABC123xyz
    // ID: ABC123xyz
];

// ============================================
// INFORMACIÓN DE CONTACTO Y REDES SOCIALES
// ============================================

const contactInfo = {
    email: 'Todavía no tenemos :"(',
    phone: '+591 78570606',
    address: 'Carrera de Física, UMSA',
    socialMedia: {
        facebook: '#',
        instagram: '#',
        youtube: '#',
        tiktok: '#'
    }
};

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================

// Si estás usando módulos ES6 en el futuro:
// export { GOOGLE_SCRIPT_URL, winnersData, questionBanksData, videosData, contactInfo };