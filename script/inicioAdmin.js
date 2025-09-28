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

  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === slideIndex);
  });
};

const cargarPeliculasCarrusel = async () => {
  try {
    const response = await fetch(API_URL);
    const peliculas = await response.json();
    const topPeliculas = peliculas.slice(0, 30);

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    topPeliculas.forEach((p, i) => {
      const img = document.createElement('img');
      img.src = p.backdrop || p.poster || "../storage/img/default.jpg";
      slidesContainer.appendChild(img);

      const dot = document.createElement('span');
      dot.className = `dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => mostrarSlide(i));
      dotsContainer.appendChild(dot);
    });

    mostrarSlide(0);
  } catch (err) {
    console.error("❌ Error cargando películas en carrusel:", err);
  }
};

setInterval(() => {
  mostrarSlide(slideIndex + 1);
}, 5000);

prevBtn.addEventListener('click', () => mostrarSlide(slideIndex - 1));
nextBtn.addEventListener('click', () => mostrarSlide(slideIndex + 1));

cargarPeliculasCarrusel();




function initCarrusel(containerId, apiUrl, visible = 5) {
  const container = document.getElementById(containerId);
  const carrusel = container.querySelector('.carrusel');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');

  let slideIndex = 0;
  let peliculasData = [];

  function renderPeliculas(peliculas) {
    carrusel.innerHTML = '';
    peliculas.forEach(pelicula => {
      const div = document.createElement('div');
      div.classList.add('pelicula');
      div.dataset.backdrop = pelicula.backdrop;
      div.dataset.title = pelicula.title;
      div.dataset.genres = pelicula.genres;
      div.dataset.summary = pelicula.summary;
      div.dataset.year = pelicula.year;
      div.dataset.popularity = pelicula.popularity;

      div.innerHTML = `
        <img src="${pelicula.poster}" alt="${pelicula.title}">
        <p class="titulo">${pelicula.title}</p>
        <p class="año">${pelicula.year}</p>
      `;
      div.addEventListener('click', () => openModal(pelicula));
      carrusel.appendChild(div);
    });
  }

  function showSlides(index) {
    const total = peliculasData.length;
    if (index < 0) slideIndex = total - 1;
    else if (index >= total) slideIndex = 0;
    else slideIndex = index;

    const offset = -slideIndex * (100 / visible);
    carrusel.style.transform = `translateX(${offset}%)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showSlides(slideIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlides(slideIndex + 1));

  async function fetchPeliculas() {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Error al obtener películas');

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
//
initCarrusel('containerPopulares', 'http://62.169.28.169/movies/pel-pop');
initCarrusel('Action', 'http://62.169.28.169/movies/genre-Pel/Accion');
initCarrusel('Ficcion', 'http://62.169.28.169/movies/genre-Pel/Ciencia%20ficcion');
initCarrusel('Talk', 'http://62.169.28.169/movies/genre-Pel/Talk');




document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("peliculasContainer");
  const modal = document.getElementById("modalGeneral");
  const modalContent = modal.querySelector(".modalContent");
  const closeBtn = document.getElementById("closeModal");

  async function cargarPeliculas() {
    try {
      const res = await fetch("http://62.169.28.169/movies/all-Pel");
      const peliculas = await res.json();

      container.innerHTML = peliculas.map(p => `
        <div class="pelicula"
             data-backdrop="${p.backdrop || '../storage/img/default.jpg'}"
             data-title="${p.title}"
             data-genres="${p.genres}"
             data-summary="${p.summary}"
             data-year="${p.year}"
             data-popularity="${p.popularity}">
          <img src="${p.poster || p.backdrop || '../storage/img/default.jpg'}" alt="${p.title}">
          <p class="titulo">${p.title}</p>
          <p class="año">${p.year}</p>
        </div>
      `).join("");
    } catch (err) {
      console.error("❌ Error cargando películas:", err);
      container.innerHTML = "<p>Error cargando películas</p>";
    }
  }

  cargarPeliculas();

  // 🟢 Función para abrir modal con los datos
  function openModal(pelicula) {
    modalContent.innerHTML = `
      <div class="img"><img src="${pelicula.backdrop}" alt="${pelicula.title}"></div>
      <div>
          <p class="titulo">${pelicula.title}</p>
          <p class="summary">${pelicula.summary}</p>
      </div>
      <div class="details">
          <div class="yearcontainer">
              <p>Year</p>
              <p>${pelicula.year}</p>
          </div>
          <div class="categorycontainer">
              <p>Category</p>
              <p>${pelicula.genres}</p>
          </div>
          <div class="popularitycontainer">
              <p>Popularity</p>
              <p>${pelicula.popularity}</p>
          </div>
      </div>
      <div class="bottonsContainer">
          <div class="bottonUpdate" id="openUpdate">Update</div>
          <div class="bottonDelete">Delete</div>
      </div>
      <div class="reviewsContainer">
          <p>Reviews</p>
          <p>"${pelicula.title}"</p>
      </div>
    `;
    modal.style.display = "block";
  }

  // 🟢 Detectar click en una película del contenedor principal
  document.addEventListener("click", e => {
    const peliculaElem = e.target.closest(".pelicula");
    if (peliculaElem) {
      const pelicula = {
        backdrop: peliculaElem.dataset.backdrop,
        title: peliculaElem.dataset.title,
        genres: peliculaElem.dataset.genres,
        summary: peliculaElem.dataset.summary,
        year: peliculaElem.dataset.year,
        popularity: peliculaElem.dataset.popularity
      };
      openModal(pelicula);
    }
  });

  // 🟢 Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
