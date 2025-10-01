const formNueva = document.getElementById("formNuevaPelicula");
const categorySelect = document.getElementById("categorySelect");

const categorias = [
  "Accion", "Animacion", "Aventura", "Belica", "Ciencia Ficcion",
  "Comedia", "Crimen", "Documental", "Drama", "Familia", "Fantasia",
  "Historia", "Kids", "Misterio", "Musica", "News", "Pelicula de TV",
  "Reality", "Romance", "Sci-Fi & Fantasy", "Soap", "Suspense",
  "Talk", "Terror", "War & Politics", "Western"
];

// Poblar select
categorias.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});


const titleInput = document.getElementById("titleInput");
const summaryInput = document.getElementById("summaryInput");
const yearInput = document.getElementById("yearInput");
const popularityInput = document.getElementById("popularityInput");
const posterInput = document.getElementById("posterInput");
const backdropInput = document.getElementById("backdropInput");
const genresInput = document.getElementById("categorySelect");

formNueva.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPelicula = {
    title: titleInput.value.trim(),
    year: parseInt(yearInput.value, 10) || null,
    popularity: parseFloat(popularityInput.value) || null,
    poster: posterInput.value.trim(),
    backdrop: backdropInput.value.trim(),
    genres: genresInput.value.trim()
  };

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión");
      return;
    }

    const res = await fetch("http://62.169.28.169/movies/new-Pel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newPelicula) 
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al crear película: ${errorText}`);
    }

    alert("✅ Película creada con éxito");
    window.location.href = "inicioAdmin.html";
  } catch (err) {
    console.error(err);
    alert("🚨 No se pudo crear la película: " + err.message);
  }
});
