const formNueva = document.getElementById("formNuevaPelicula");
const categorySelect = document.getElementById("categorySelect");

const categorias = [
  "Accion", "Animacion", "Aventura", "Belica", "Ciencia Ficcion",
  "Comedia", "Crimen", "Documental", "Drama", "Familia", "Fantasia",
  "Historia", "Kids", "Misterio", "Musica", "News", "Pelicula de TV",
  "Reality", "Romance", "Sci-Fi & Fantasy", "Soap", "Suspense",
  "Talk", "Terror", "War & Politics", "Western"
];

categorias.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});
formNueva.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = Object.fromEntries(new FormData(formNueva));

const newPelicula = {
  title: titleInput.value.trim(),
  summary: summaryInput.value.trim(),
  year: parseInt(yearInput.value, 10) || null,
  popularity: parseFloat(popularityInput.value) || null,
  poster: posterInput.value.trim(),
  backdrop: backdropInput.value.trim(),
  genres: genresInput.value.trim()
}


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
      body: JSON.stringify(nuevaPelicula)
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
