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
        pdfUrl: "https://drive.google.com/file/d/12kcWv2GtY_Y080Tx4Uj9ZWtPVxhlXjez/view?usp=drive_link" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "2° etapa de clasificación",
        edition: "Primera Edición",
        problems: 21,
        pdfUrl: "https://drive.google.com/file/d/1dtyz3zfoz4kA9ufsp3VJ16-55BHjVDAP/view?usp=drive_link" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Problemas de Muerte Súbita",
        edition: "Primera Edición",
        problems: 11,
        pdfUrl: "https://drive.google.com/file/d/1KmvUx5nQafTUIMz8Lh5tX7nUvLIKIk0e/view?usp=drive_link" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Octavos de final",
        edition: "Primera Edición",
        problems: 12,
        pdfUrl: "https://drive.google.com/file/d/1VFGzz2Me_uf2qFSr8SkjghoTYBDPpuAu/view?usp=drive_link" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Cuartos de final",
        edition: "Primera Edición",
        problems: 12,
        pdfUrl: "https://drive.google.com/file/d/1e3Mr6B7ilcoSdEjIsprus10YE0jf5w9T/view?usp=drive_link" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: " Semifinal",
        edition: "Primera Edición",
        problems: 3,
        pdfUrl: "https://drive.google.com/file/d/1DQkEI7TeL_nU2u38z81mjwXaEM7o0r-i/view?usp=drive_link" // Reemplazar con la URL real del PDF
    },
    {
        year: 2025,
        title: "1º Torneo Integration Bee Physics",
        type: "Final",
        edition: "Primera Edición",
        problems: 6,
        pdfUrl: "https://drive.google.com/file/d/1JtuZhossbmE4J7N0-8kBu776ie3OabR5/view?usp=drive_link" // Reemplazar con la URL real del PDF
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