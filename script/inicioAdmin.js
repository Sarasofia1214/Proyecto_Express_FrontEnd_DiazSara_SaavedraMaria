const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dot");
let index = 0;

const showSlide = (i) => {
  index = (i + dots.length) % dots.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
};

// 🔹 Eventos compactos
document.querySelector(".next").onclick = () => showSlide(index + 1);
document.querySelector(".prev").onclick = () => showSlide(index - 1);
dots.forEach((dot, i) => dot.onclick = () => showSlide(i));

// 🔹 Auto-play
setInterval(() => showSlide(index + 1), 5000);




const carrusel = document.querySelector(".carrusel");
const prevp = document.querySelector(".prevPopular");
const nextp = document.querySelector(".nextPopular");

let offset = 0;
const step = 200; // ancho por tarjeta (px)

nextp.onclick = () => {
  offset -= step;
  if (Math.abs(offset) >= carrusel.scrollWidth - carrusel.clientWidth) {
    offset = 0; // vuelve al inicio
  }
  carrusel.style.transform = `translateX(${offset}px)`;
};

prevp.onclick = () => {
  offset += step;
  if (offset > 0) {
    offset = -(carrusel.scrollWidth - carrusel.clientWidth);
  }
  carrusel.style.transform = `translateX(${offset}px)`;
};











const modal = document.getElementById("movieModal");
const closeBtn = document.querySelector(".close");

function openModal(movie) {
  document.getElementById("modalPoster").src = movie.poster;
  document.getElementById("modalTitle").textContent = movie.titulo;
  document.getElementById("modalDescription").textContent = movie.descripcion || "Sin descripción.";
  document.getElementById("modalYear").textContent = movie.anio;
  document.getElementById("modalCategory").textContent = movie.categoria || "Unknown";
  document.getElementById("modalPopularity").textContent = movie.popularidad || "N/A";

  // Reseñas
  const reviewsContainer = document.getElementById("modalReviews");
  reviewsContainer.innerHTML = "";
  if (movie.reviews && movie.reviews.length > 0) {
    movie.reviews.forEach(r => {
      const review = document.createElement("div");
      review.classList.add("review-card");
      review.innerHTML = `
        <strong>${r.user}</strong>
        <p>${r.comentario}</p>
        <span>${r.score}</span>
      `;
      reviewsContainer.appendChild(review);
    });
  } else {
    reviewsContainer.innerHTML = "<p>No reviews available.</p>";
  }

  modal.style.display = "flex";
}

// Cerrar modal
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Ejemplo: cuando pintes tus películas, añades evento click
document.querySelectorAll(".movie-card").forEach((card, i) => {
  card.addEventListener("click", () => {
    const movie = {
      titulo: "A MINECRAFT MOVIE",
      descripcion: "In Minecraft, players explore a procedurally generated world...",
      anio: 2024,
      categoria: "Action",
      popularidad: 95,
      poster: "./img/minecraft.jpg",
      reviews: [
        { user: "Maudie", comentario: "Increíble!", score: "5.0 - 5.0" },
        { user: "Davion", comentario: "Muy buena pero algo larga.", score: "4.8 - 5.0" }
      ]
    };
    openModal(movie);
  });
});
