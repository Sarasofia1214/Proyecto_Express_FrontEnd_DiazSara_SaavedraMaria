
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

  let scrollAmount = 0;

  async function cargarPeliculas() {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Error al cargar películas");
      const data = await res.json();

      carrusel.innerHTML = "";
      data.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("pelicula");

        card.innerHTML = `
          <img src="${p.poster || p.backdrop || "../storage/img/img5.jpg"}" alt="${p.titulo}">
          <div class="info">
            <h3>${p.title || "Sin título"}</h3>
            <p>${p.year || ""}</p>
          </div>
        `;

        carrusel.appendChild(card);
      });
    } catch (error) {
      console.error(error);
    }
  }


  cargarPeliculas();
}


const categorias = [
  { id: "Populares", titulo: "Most popular", url: "http://62.169.28.169/movies/pel-pop" },
  { id: "Accion", titulo: "Accion", url: "http://62.169.28.169/movies/genre-Pel/Accion" },
  { id: "ActionAdventure", titulo: "Action & Adventure", url: "http://62.169.28.169/movies/genre-Pel/Action%20%26%20adventure" },
  { id: "Animacion", titulo: "Animacion", url: "http://62.169.28.169/movies/genre-Pel/Animacion" },
  { id: "Aventura", titulo: "Aventura", url: "http://62.169.28.169/movies/genre-Pel/Aventura" },
  { id: "Belica", titulo: "Belica", url: "http://62.169.28.169/movies/genre-Pel/Belica" },
  { id: "CienciaFiccion", titulo: "Ciencia Ficcion", url: "http://62.169.28.169/movies/genre-Pel/Ciencia%20ficcion" },
  { id: "Comedia", titulo: "Comedia", url: "http://62.169.28.169/movies/genre-Pel/Comedia" },
  { id: "Crimen", titulo: "Crimen", url: "http://62.169.28.169/movies/genre-Pel/Crimen" },
  { id: "Documental", titulo: "Documental", url: "http://62.169.28.169/movies/genre-Pel/Documental" },
  { id: "Drama", titulo: "Drama", url: "http://62.169.28.169/movies/genre-Pel/Drama" },
  { id: "Familia", titulo: "Familia", url: "http://62.169.28.169/movies/genre-Pel/Familia" },
  { id: "Fantasia", titulo: "Fantasia", url: "http://62.169.28.169/movies/genre-Pel/Fantasia" },
  { id: "Historia", titulo: "Historia", url: "http://62.169.28.169/movies/genre-Pel/Historia" },
  { id: "Kids", titulo: "Kids", url: "http://62.169.28.169/movies/genre-Pel/Kids" },
  { id: "Misterio", titulo: "Misterio", url: "http://62.169.28.169/movies/genre-Pel/Misterio" },
  { id: "Musica", titulo: "Musica", url: "http://62.169.28.169/movies/genre-Pel/Musica" },
  { id: "News", titulo: "News", url: "http://62.169.28.169/movies/genre-Pel/News" },
  { id: "PeliculaTv", titulo: "Pelicula de TV", url: "http://62.169.28.169/movies/genre-Pel/Pelicula%20de%20tv" },
  { id: "Reality", titulo: "Reality", url: "http://62.169.28.169/movies/genre-Pel/Reality" },
  { id: "Romance", titulo: "Romance", url: "http://62.169.28.169/movies/genre-Pel/Romance" },
  { id: "SciFiFantasy", titulo: "Sci-Fi & Fantasy", url: "http://62.169.28.169/movies/genre-Pel/Sci-fi%20%26%20fantasy" },
  { id: "Soap", titulo: "Soap", url: "http://62.169.28.169/movies/genre-Pel/Soap" },
  { id: "Suspense", titulo: "Suspense", url: "http://62.169.28.169/movies/genre-Pel/Suspense" },
  { id: "Talk", titulo: "Talk", url: "http://62.169.28.169/movies/genre-Pel/Talk" },
  { id: "Terror", titulo: "Terror", url: "http://62.169.28.169/movies/genre-Pel/Terror" },
  { id: "WarPolitics", titulo: "War & Politics", url: "http://62.169.28.169/movies/genre-Pel/War%20%26%20politics" },
  { id: "Western", titulo: "Western", url: "http://62.169.28.169/movies/genre-Pel/Western" }
];


const containerCarruseles = document.getElementById("containerCarruseles");

categorias.forEach(cat => {
  const section = document.createElement("section");
  section.classList.add("categoria");

  section.innerHTML = `
    <h2>${cat.titulo}</h2>
    <div class="carruselContainer" id="${cat.id}">
      <div class="carrusel"></div>
      
    </div>
  `;

  containerCarruseles.appendChild(section);


  initCarrusel(cat.id, cat.url);
});


function initCarrusel(containerId, apiUrl) {
  const container = document.getElementById(containerId);
  const carrusel = container.querySelector('.carrusel');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');

  async function cargarPeliculas() {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      carrusel.innerHTML = "";
      data.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("pelicula");

        card.innerHTML = `
          <img src="${p.poster || p.backdrop || '../storage/img/img5.jpg'}" alt="${p.title || p.name}">
          <div class="info">
            <h3>${p.title || p.name || "Sin título"}</h3>
          </div>
        `;

        const theId = p._id || p.id;
        card.addEventListener("click", () => {
          if (!theId) {
            console.warn("ID no encontrado para película:", p);
            return;
          }
         window.location.href = `peliculaAdmin.html?id=${theId}`;

        });

        carrusel.appendChild(card);
      });
    } catch (error) {
      console.error("Error al cargar películas", error);
    }
  }


  cargarPeliculas();
}

data.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("pelicula");
  card.innerHTML = `
    <img src="${p.poster || p.backdrop || '../storage/img/img5.jpg'}" alt="${p.title || p.name}">
    <div class="info"><h3>${p.title || p.name || 'Sin título'}</h3></div>
  `;
  const theId = p._id;
  card.addEventListener('click', () => {
    if (!theId) {
      console.warn('movie id missing for', p);
      return;
    }
window.location.href = `peliculaAdmin.html?id=${theId}`;

  });
  carrusel.appendChild(card);
});


async function crearResena(movieId, comentario, calificacion) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://62.169.28.169/resenas/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        id_pelicula: movieId,
        comentario,
        calificacion
      })
    });

    if (!res.ok) throw new Error("Error al crear reseña");

    alert("Reseña creada con éxito");
    cargarResenas(); // recargar reseñas en pantalla
  } catch (err) {
    console.error(err);
    alert("No se pudo crear la reseña");
  }
}


async function editarResena(id, comentario, calificacion) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://62.169.28.169/resenas/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ comentario, calificacion })
    });

    if (!res.ok) throw new Error("Error al editar reseña");

    alert("Reseña actualizada con éxito");
    cargarResenas();
  } catch (err) {
    console.error(err);
    alert("No se pudo editar la reseña");
  }
}


const userId = localStorage.getItem("id_usuario");

data.forEach(r => {
  const review = document.createElement("div");
  review.classList.add("review-item");

  const canVote = r.id_usuario !== userId;

  review.innerHTML = `
    <div class="review-card">
      <div class="review-user">
        <div class="review-avatar">${r.comentario.charAt(0).toUpperCase()}</div>
        <div>
          <p><strong>${r.nombre_usuario || r.id_usuario}</strong></p>
          <p>${r.comentario}</p>
        </div>
      </div>
      <div class="review-actions">
        <span><b>${r.calificacion} / 5</b></span>
        ${canVote ? `
          <button class="btn-like" data-id="${r._id}">👍</button>
          <button class="btn-dislike" data-id="${r._id}">👎</button>
        ` : ""}
        ${r.id_usuario === userId ? `
          <button class="btn-edit" data-id="${r._id}">✏️</button>
        ` : ""}
      </div>
    </div>
  `;
  reviewsContainer.appendChild(review);
});




