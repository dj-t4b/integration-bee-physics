/* ============================================
   INTEGRATION BEE PHYSICS - GALLERY.JS
   JavaScript para galeria.html
   ============================================ */

// ============================================
// VARIABLES GLOBALES
// ============================================

let currentGalleryType = 'photos';
let driveImages = [];
let photosData = [];

// ============================================
// CARGAR IMÁGENES DESDE GOOGLE DRIVE
// ============================================

async function loadDriveImages() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const imageCount = document.getElementById('imageCount');
    const container = document.getElementById('galleryContainer');
    
    loadingIndicator.classList.add('active');
    
    try {
        console.log('🔄 Cargando imágenes desde Google Drive...');
        
        const response = await fetch(GOOGLE_SCRIPT_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            driveImages = data.images;
            photosData = driveImages.map(img => ({
                url: img.url,
                thumbnail: img.thumbnail,
                caption: img.name.replace(/\.(jpg|jpeg|png|gif|webp)$/i, ''),
                date: img.date
            }));
            
            console.log(`✅ ${data.total} imágenes cargadas desde Google Drive`);
            imageCount.textContent = `${data.total} imágenes`;
            
            // Mostrar fotos si estamos en la pestaña de fotos
            if (currentGalleryType === 'photos') {
                displayGalleryItems(photosData, 'photos');
            }
        } else {
            throw new Error('La respuesta del servidor no indica éxito');
        }
    } catch (error) {
        console.error('❌ Error al cargar imágenes:', error);
        imageCount.textContent = 'Error al cargar';
        
        // Mostrar mensaje de error al usuario
        container.innerHTML = `
            <div class="empty-state">
                <h3>⚠️ No se pudieron cargar las imágenes</h3>
                <p>Error: ${error.message}</p>
                <p>Por favor, verifica que:</p>
                <ul style="text-align: left; display: inline-block; margin-top: 1rem;">
                    <li>La URL del Google Apps Script esté correcta en config.js</li>
                    <li>El script esté publicado como "Aplicación web"</li>
                    <li>Los permisos estén configurados correctamente</li>
                    <li>La carpeta de Drive sea accesible</li>
                </ul>
            </div>
        `;
    } finally {
        loadingIndicator.classList.remove('active');
    }
}

// ============================================
// MOSTRAR ELEMENTOS DE LA GALERÍA
// ============================================

function displayGalleryItems(items, type) {
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>📭 No hay contenido disponible</h3>
                <p>${type === 'photos' ? 'Aún no hay fotos en la galería.' : 'Aún no hay videos disponibles.'}</p>
            </div>
        `;
        return;
    }

    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        
        if (type === 'photos') {
            galleryItem.innerHTML = `
                <img src="${item.thumbnail || item.url}" 
                     alt="${item.caption}" 
                     loading="lazy"
                     onerror="this.src='${item.url}'">
                <div class="caption">${item.caption}</div>
            `;
            galleryItem.onclick = () => {
                openLightbox(item.url, item.caption);
            };
        } else if (type === 'videos') {
            galleryItem.className += ' video-thumb';
            galleryItem.innerHTML = `
                <img src="${item.thumbnail}" 
                     alt="${item.title}" 
                     loading="lazy">
            `;
            galleryItem.onclick = () => {
                window.open(`https://www.youtube.com/watch?v=${item.youtubeId}`, '_blank');
            };
        }
        
        container.appendChild(galleryItem);
    });

    // Activar animación de aparición con retardo escalonado
    setTimeout(() => {
        container.querySelectorAll('.fade-in').forEach((el, i) => {
            el.style.transitionDelay = `${i * 50}ms`;
            el.classList.add('visible');
        });
    }, 50);
}

// ============================================
// FILTRAR GALERÍA (FOTOS/VIDEOS)
// ============================================

function filterGallery(type) {
    currentGalleryType = type;
    
    // Actualizar pestañas activas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Actualizar contador
    const imageCount = document.getElementById('imageCount');
    
    if (type === 'photos') {
        imageCount.textContent = `${photosData.length} imágenes`;
        displayGalleryItems(photosData, 'photos');
    } else if (type === 'videos') {
        imageCount.textContent = `${videosData.length} videos`;
        displayGalleryItems(videosData, 'videos');
    }
}

// ============================================
// LIGHTBOX PARA IMÁGENES
// ============================================

function openLightbox(imageUrl, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImage.src = imageUrl;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar lightbox con ESC o clic fuera de la imagen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// ============================================
// NAVEGACIÓN (OCULTAR/MOSTRAR AL SCROLL)
// ============================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Galería - Inicializando...');
    
    // Cargar imágenes desde Google Drive
    loadDriveImages();
    
    // Mostrar videos por defecto mientras se cargan las fotos
    displayGalleryItems(videosData, 'videos');
    
    console.log('✅ Galería - Cargada correctamente');
});