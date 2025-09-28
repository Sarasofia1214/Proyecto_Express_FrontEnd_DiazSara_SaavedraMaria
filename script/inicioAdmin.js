//Carrusel imagenes variadas
const API_URL = "http://62.169.28.169/movies/all-Pel";

const carrusel = document.getElementById('carruselFotos');
const slidesContainer = carrusel.querySelector('.slides');
const dotsContainer = carrusel.querySelector('.dots');
const prevBtn = carrusel.querySelector('.prev');
const nextBtn = carrusel.querySelector('.next');

let slideIndex = 0;

const mostrarSlide = index => {
  const slides = slidesContainer.querySelectorAll('img');
  const dots = dotsContainer.querySelectorAll('.dot');
  slideIndex = (index + slides.length) % slides.length; 
  

for (let i = 0; i < slides.length; i++) {
  if (i === slideIndex) {
    slides[i].style.display = "block";  
  } else {
    slides[i].style.display = "none";  
  }
}

for (let i = 0; i < dots.length; i++) {
  if (i === slideIndex) {
    dots[i].classList.add("active");   
  } else {
    dots[i].classList.remove("active"); 
  }
}

};

const cargarPeliculas = async () => {
  try {
    const response = await fetch(API_URL);
    const peliculas = await response.json();

    const topPeliculas = peliculas.slice(0, 30);

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    topPeliculas.forEach((p, i) => {
      const img = document.createElement('img');
      img.src = p.backdrop;
      slidesContainer.appendChild(img);

      const dot = document.createElement('span');
      dot.className = `dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => mostrarSlide(i));
      dotsContainer.appendChild(dot);
    });

    mostrarSlide(0); 
  } catch (err) {
    console.error("Error cargando películas:", err);
  }
};

setInterval(() => {
  mostrarSlide(slideIndex + 1);
}, 5000); 

prevBtn.addEventListener('click', () => mostrarSlide(slideIndex - 1));
nextBtn.addEventListener('click', () => mostrarSlide(slideIndex + 1));

cargarPeliculas();

// Carrusel Categorias 

function initCarrusel(containerId, apiUrl, visible = 5) {
  const container = document.getElementById(containerId);
  const carrusel = container.querySelector('.carrusel');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');

  let slideIndex = 0;
  let peliculasData = [];

  // Renderizar películas
  function renderPeliculas(peliculas) {
    carrusel.innerHTML = '';
    peliculas.forEach(pelicula => {
      const div = document.createElement('div');
      div.classList.add('pelicula');
      div.innerHTML = `
        <img src="${pelicula.poster}" alt="${pelicula.title}">
        <p class="titulo">${pelicula.title}</p>
        <p class="año">${pelicula.year}</p>
      `;
      div.addEventListener('click', () => openModal(pelicula));
      carrusel.appendChild(div);
    });
  }

  // Mover carrusel
  function showSlides(index) {
    const total = peliculasData.length;
    if(index < 0) slideIndex = total - 1;
    else if(index >= total) slideIndex = 0;
    else slideIndex = index;

    const offset = -slideIndex * (100 / visible);
    carrusel.style.transform = `translateX(${offset}%)`;
  }
  if(prevBtn) prevBtn.addEventListener('click', () => showSlides(slideIndex - 1));
  if(nextBtn) nextBtn.addEventListener('click', () => showSlides(slideIndex + 1));

  // Fetch API con límite de 30 películas
  async function fetchPeliculas() {
    try {
      const res = await fetch(apiUrl);
      if(!res.ok) throw new Error('Error al obtener películas');

      const data = await res.json();
      peliculasData = data.slice(0, 30);

      renderPeliculas(peliculasData);
      showSlides(0);
    } catch (error) {
      console.error(error);
    }
  }
  fetchPeliculas();
}

initCarrusel('containerPopulares', 'http://62.169.28.169/movies/pel-pop');
initCarrusel('Action', 'http://62.169.28.169/movies/genre-Pel/Accion');
initCarrusel('Ficcion', 'http://62.169.28.169/movies/genre-Pel/Ciencia%20ficcion');
initCarrusel('Talk', 'http://62.169.28.169/movies/genre-Pel/Talk')



//Modal general
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalGeneral");
  const closeBtn = document.getElementById("closeModal");


//Modal update
  const modalUpdate = document.getElementById("modalUpdate");
  const closeBtnUpdate = modalUpdate.querySelector("#closeModal"); // corregido selector
  const btnUpdate = document.querySelector("#openUpdate");

  // Función para abrir modal principal con info de la película
  function openModal(pelicula) {
    if (modalUpdate) modalUpdate.style.display = "none";
    modal.style.display = "block";

    modal.querySelector(".modal-title").textContent = pelicula.title;
    modal.querySelector(".modal-poster").src = pelicula.poster;
    modal.querySelector(".modal-year").textContent = pelicula.year;
    modal.querySelector(".modal-summary").textContent = pelicula.summary;
  }

  // Delegación de click para películas dinámicas
  document.addEventListener("click", e => {
    const peliculaElem = e.target.closest(".pelicula");
    if (peliculaElem) {
      const pelicula = {
        title: peliculaElem.dataset.title,
        poster: peliculaElem.dataset.poster,
        year: peliculaElem.dataset.year,
        summary: peliculaElem.dataset.summary
      };
      openModal(pelicula);
    }
  });

  // Cerrar modales
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
  });

  if (btnUpdate) {
    btnUpdate.addEventListener("click", e => {
      e.stopPropagation();
      modal.style.display = "none";
      modalUpdate.style.display = "block";
    });
  }

  closeBtnUpdate.addEventListener("click", () => {
    modalUpdate.style.display = "none";
  });
});

