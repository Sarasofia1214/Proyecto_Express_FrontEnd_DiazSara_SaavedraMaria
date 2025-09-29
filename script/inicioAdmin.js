
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

setInterval(() => mostrarSlide(slideIndex + 1), 5000);
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
      div.dataset.id = pelicula.id;
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
initCarrusel('containerPopulares', 'http://62.169.28.169/movies/pel-pop');
initCarrusel('Action', 'http://62.169.28.169/movies/genre-Pel/Accion');
initCarrusel('Ficcion', 'http://62.169.28.169/movies/genre-Pel/Ciencia%20ficcion');
initCarrusel('Talk', 'http://62.169.28.169/movies/genre-Pel/Talk');



const containerPeliculas = document.getElementById("peliculasContainer");
const modalGeneral = document.getElementById("modalGeneral");
const modalContent = modalGeneral.querySelector(".modalContent");
const closeModal = document.getElementById("closeModal");

async function cargarPeliculas() {
  try {
    const res = await fetch(API_URL);
    const peliculas = await res.json();
    containerPeliculas.innerHTML = peliculas.map(p => `
      <div class="pelicula"
           data-id="${p.id}"
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
    containerPeliculas.innerHTML = "<p>Error cargando películas</p>";
  }
}
cargarPeliculas();

function openModal(pelicula) {
  modalContent.innerHTML = `
    <div class="img"><img src="${pelicula.backdrop}" alt="${pelicula.title}"></div>
    <div>
        <p class="titulo">${pelicula.title}</p>
        <p class="summary">${pelicula.summary}</p>
    </div>
    <div class="details">
        <div class="yearcontainer"><p>Year</p><p>${pelicula.year}</p></div>
        <div class="categorycontainer"><p>Category</p><p>${pelicula.genres}</p></div>
        <div class="popularitycontainer"><p>Popularity</p><p>${pelicula.popularity}</p></div>
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
  modalGeneral.style.display = "block";
}

document.addEventListener("click", e => {
  const peliculaElem = e.target.closest(".pelicula");
  if (peliculaElem) {
    const pelicula = {
      id: peliculaElem.dataset.id,
      backdrop: peliculaElem.dataset.backdrop,
      title: peliculaElem.dataset.title,
      genres: peliculaElem.dataset.genres,
      summary: peliculaElem.dataset.summary,
      year: peliculaElem.dataset.year,
      popularity: peliculaElem.dataset.popularity,
      poster: peliculaElem.querySelector("img").src
    };
    openModal(pelicula);
  }
});

closeModal.addEventListener("click", () => {
  modalGeneral.style.display = "none";
});


// ==========================
// 🔹 Modal Update
// ==========================
const modalUpdate = document.getElementById("modalUpdate");
const closeUpdateModal = document.getElementById("closeUpdateModal");

const updateImg = document.getElementById("updateImg");
const updateTitulo = document.getElementById("updateTitulo");
const updateSummary = document.getElementById("updateSummary");
const updateCategory = document.getElementById("updateCategory");
const updateYear = document.getElementById("updateYear");
const updatePopularity = document.getElementById("updatePopularity");

let peliculaEnEdicion = null;

function abrirModalUpdate(pelicula) {
  peliculaEnEdicion = pelicula.id;

  updateImg.src = pelicula.poster;
  updateTitulo.value = pelicula.title;
  updateSummary.value = pelicula.summary;
  updateCategory.value = pelicula.genres;
  updateYear.value = pelicula.year;
  updatePopularity.value = pelicula.popularity;

  modalUpdate.style.display = "flex";
}

closeUpdateModal.addEventListener("click", () => {
  modalUpdate.style.display = "none";
});

// Abrir modal update desde el botón Update
document.addEventListener("click", e => {
  if (e.target && e.target.id === "openUpdate") {
    modalGeneral.style.display = "none";

    const pelicula = {
      id: peliculaEnEdicion,
      title: document.querySelector("#modalGeneral .titulo").textContent,
      summary: document.querySelector("#modalGeneral .summary").textContent,
      genres: document.querySelector("#modalGeneral .categorycontainer p:nth-child(2)").textContent,
      year: document.querySelector("#modalGeneral .yearcontainer p:nth-child(2)").textContent,
      popularity: document.querySelector("#modalGeneral .popularitycontainer p:nth-child(2)").textContent,
      poster: document.querySelector("#modalGeneral img").src
    };

    abrirModalUpdate(pelicula);
  }
});

// Submit Update (PUT)
document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const datosActualizados = {
  title: updateTitulo.value,
  summary: updateSummary.value,
  year: parseInt(updateYear.value),   // número
  popularity: parseFloat(updatePopularity.value), // número
  poster: updateImg.value,    // URL del poster
  backdrop: updateImg.value,  // puedes usar otra URL si la tienes
  genres: updateCategory.value
};

try {
  const res = await fetch(`http://62.169.28.169/movies/update-Pel/${peliculaEnEdicion}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosActualizados)
  });

  if (!res.ok) throw new Error(`❌ Error ${res.status}`);

  const data = await res.json();
  console.log("✅ Película actualizada:", data);

  modalUpdate.style.display = "none";
  location.reload();
} catch (err) {
  console.error(err);
  alert("Hubo un error al actualizar la película");
}

});
