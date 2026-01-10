/* ============================================
   INTEGRATION BEE PHYSICS - MAIN.JS
   JavaScript principal para index.html
   ============================================ */

// ============================================
// NAVEGACIÓN
// ============================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ocultar/mostrar navbar al hacer scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;

    // Animación de elementos al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar menú móvil si está abierto
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// ============================================
// CARGAR GANADORES
// ============================================

function loadWinners() {
    const container = document.getElementById('winnersContainer');
    container.innerHTML = '';
    
    winnersData.forEach(winner => {
        const card = document.createElement('div');
        card.className = 'winner-card fade-in';
        card.innerHTML = `
            <div class="winner-position">${winner.position}</div>
            <div class="winner-name">${winner.name}</div>
            <div class="winner-details">
                <p><strong>${winner.edition}</strong></p>
                <p>${winner.date}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// BANCO DE PREGUNTAS
// ============================================

function loadQuestionBanks() {
    const container = document.getElementById('questionsContainer');
    const filtersContainer = document.getElementById('questionFilters');
    
    // Generar filtros de años
    const years = [...new Set(questionBanksData.map(q => q.year))];
    years.forEach(year => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = year;
        btn.setAttribute('data-year', year);
        filtersContainer.appendChild(btn);
    });

    // Delegación de eventos para todos los botones (incluido "Todos")
    filtersContainer.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return; // Ignora clics fuera de los botones
        const year = btn.getAttribute('data-year');
        filterQuestions(year);
    });

    // Cargar todas las preguntas al inicio
    displayQuestions(questionBanksData);
}

function displayQuestions(questions) {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    // Crear tarjetas de preguntas
    questions.forEach(question => {
        const card = document.createElement('div');
        card.className = 'question-card fade-in';
        card.onclick = () => openPdfViewer(question.pdfUrl, question.title);
        card.innerHTML = `
            <div class="question-year">${question.year}</div>
            <div class="question-title">${question.title}</div>
            <div class="question-title">${question.type}</div>
            <div class="question-meta">
                <span>📄 ${question.problems} problemas</span>
                <span>📅 ${question.edition}</span>
            </div>
        `;
        container.appendChild(card);
    });

    // Activar la animación con un pequeño retardo
    setTimeout(() => {
        container.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 50);
}

function filterQuestions(year) {
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnYear = btn.getAttribute('data-year');
        btn.classList.toggle('active', btnYear == year);
        if (year === 'all' && btnYear === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Filtrar preguntas
    if (year === 'all') {
        displayQuestions(questionBanksData);
    } else {
        const filtered = questionBanksData.filter(q => String(q.year) === String(year));
        displayQuestions(filtered);
    }
}

// ============================================
// VISOR DE PDF
// ============================================

function openPdfViewer(pdfUrl, title) {
    const viewer = document.getElementById('pdfViewer');
    const frame = document.getElementById('pdfFrame');
    const titleElement = document.getElementById('pdfTitle');
    
    if (pdfUrl === '#') {
        alert('PDF no disponible aún. Por favor, actualiza la URL en el archivo config.js');
        return;
    }
    
    titleElement.textContent = title;
    // Usar Google Drive Viewer para PDFs
    frame.src = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdfViewer() {
    const viewer = document.getElementById('pdfViewer');
    const frame = document.getElementById('pdfFrame');
    
    viewer.classList.remove('active');
    frame.src = '';
    document.body.style.overflow = 'auto';
}

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePdfViewer();
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadWinners();
    loadQuestionBanks();
    
    // Trigger inicial para animaciones
    window.dispatchEvent(new Event('scroll'));
    
    console.log('✅ Integration Bee Physics - Página cargada correctamente');
});