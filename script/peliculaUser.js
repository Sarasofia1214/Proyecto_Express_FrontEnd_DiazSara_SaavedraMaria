document.addEventListener('DOMContentLoaded', async () => {
  const API_URL = "http://62.169.28.169/movies/all-Pel";

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (!movieId) {
    document.body.innerHTML = "<h2>Error: no se recibió el ID de la película en la URL.</h2>";
    return;
  }

  const container = document.getElementById("peliculaDetalle");

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener películas");

    const peliculas = await res.json();
    const pelicula = peliculas.find(p => p._id === movieId);

    if (!pelicula) {
      container.innerHTML = "<p>Película no encontrada</p>";
      return;
    }

    container.innerHTML = `
      <div class="peliculaDetalle">
        <div class="banner">
          <img class="backdrop" src="${pelicula.backdrop || pelicula.poster || '../storage/img/img4.jpg'}" alt="${pelicula.title}">
        </div>
        <div class="detalleContenido">
          <h2>${pelicula.title}</h2>
          <p class="summary">${pelicula.summary}</p>
          <div class="meta">
            <div><strong>Category</strong><br>${pelicula.genres}</div>
            <div><strong>Year</strong><br>${pelicula.year}</div>
            <div><strong>Popularity</strong><br>${pelicula.popularity}</div>
          </div>
          <div class="acciones">
            <button id="openUpdate">Update</button>
            <button id="deleteBtn" class="delete">Delete</button>
          </div>
        </div>
      </div>
    `;

    const btnUpdate = document.getElementById("openUpdate");
    if (btnUpdate) {
      btnUpdate.addEventListener('click', () => abrirModalUpdate({
        id: pelicula._id,
        title: pelicula.title,
        summary: pelicula.summary,
        genres: pelicula.genres,
        year: pelicula.year,
        popularity: pelicula.popularity,
        poster: pelicula.poster,
        backdrop: pelicula.backdrop
      }));
    }

    // --- DELETE ---
    const btnDelete = document.getElementById("deleteBtn");
    if (btnDelete) {
      btnDelete.addEventListener("click", async () => {
        const confirmacion = confirm("¿Seguro que quieres eliminar esta película?");
        if (!confirmacion) return;

        const token = localStorage.getItem("token");
        if (!token) {
          alert("No se encontró token de sesión. Debes iniciar sesión nuevamente.");
          return;
        }

        try {
          const res = await fetch(`http://62.169.28.169/movies/delete-Pel/${pelicula._id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          if (!res.ok) throw new Error(`Error ${res.status}`);

          alert("Película eliminada ✅");
          window.location.href = "../html/inicioAdmin.html";
        } catch (err) {
          console.error(err);
          alert("Error al eliminar la película ❌");
        }
      });
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error cargando la película</p>";
  }

  // --- MODAL UPDATE ---
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

    updateImg.src = pelicula.poster || pelicula.backdrop;
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

  document.getElementById("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const datosActualizados = {
      title: updateTitulo.value,
      summary: updateSummary.value,
      year: parseInt(updateYear.value),
      popularity: parseFloat(updatePopularity.value),
      poster: updateImg.src,
      backdrop: updateImg.src,
      genres: updateCategory.value
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No se encontró token de sesión. Debes iniciar sesión nuevamente.");
        return;
      }

      const res = await fetch(`http://62.169.28.169/movies/update-Pel/${peliculaEnEdicion}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datosActualizados)
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();
      console.log("Película actualizada:", data);

      modalUpdate.style.display = "none";
      location.reload();
    } catch (err) {
      console.error(err);
      alert("Hubo un error al actualizar la película");
    }
  });

  // --- SOLO ADMINS PUEDEN VER UPDATE/DELETE ---
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    document.getElementById("openUpdate").style.display = "none";
    document.getElementById("deleteBtn").style.display = "none";
  }
});




function renderReviews(reviews) {
  const container = document.getElementById("reviewsContainer");
  container.innerHTML = ""; // limpiar antes de renderizar

  reviews.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("review-card");

    card.innerHTML = `
      <h3 class="review-author">${r.titulo}</h3>
      <p class="review-text">${r.comentario}</p>
    `;

    container.appendChild(card);
  });
}
