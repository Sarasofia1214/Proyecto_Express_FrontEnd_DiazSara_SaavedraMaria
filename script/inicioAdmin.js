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
const step = 200; 

nextp.onclick = () => {
  offset -= step;
  if (Math.abs(offset) >= carrusel.scrollWidth - carrusel.clientWidth) {
    offset = 0; 
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


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalGeneral");
  const closeBtn = document.getElementById("closeModal");
  const peliculas = document.querySelectorAll(".pelicula");


  peliculas.forEach(pelicula => {
    pelicula.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });

 
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });


  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});















