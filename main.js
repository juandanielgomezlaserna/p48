const content = document.getElementById('content');

async function navigate(page) {
    const content = document.getElementById('content');
    const url = `pages/${page}.html`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Página no encontrada");
        const html = await response.text();
        content.innerHTML = html;

        // --- LÓGICA DE ESTADO ACTIVO ---
        // 1. Buscamos todos los enlaces del menú
        const links = document.querySelectorAll('nav a, nav button');
        
        links.forEach(link => {
            // 2. Quitamos el color rojo y ponemos blanco a todos
            link.classList.remove('text-red-600');
            link.classList.add('text-white');
            
            // 3. Si el atributo onclick contiene el nombre de la página, lo ponemos rojo
            if (link.getAttribute('onclick')?.includes(`'${page}'`)) {
                link.classList.add('text-red-600');
                link.classList.remove('text-white');
            }
        });

        window.scrollTo(0, 0);
    } catch (error) {
        content.innerHTML = "<h2 class='text-center py-20'>Error 404</h2>";
    }
}

// Cargar "inicio" por defecto al abrir la web
window.onload = () => navigate('home');

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
}

menuBtn.addEventListener('click', toggleMenu);