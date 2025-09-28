const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dot");
let index = 0;

const showSlide = (i) => {
  index = (i + dots.length) % dots.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
};

document.querySelector(".next").onclick = () => showSlide(index + 1);
document.querySelector(".prev").onclick = () => showSlide(index - 1);
dots.forEach((dot, i) => dot.onclick = () => showSlide(i));

setInterval(() => showSlide(index + 1), 5000);


// Va pasando las img de las peliculas
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


// Logica que muestra el modal
document.addEventListener("DOMContentLoaded", () => {
  const modalGeneral = document.getElementById("modalGeneral");
  const closeBtnGeneral = document.getElementById("closeModal");
  const peliculas = document.querySelectorAll(".pelicula");

  const modalReviews = document.getElementById("modalReviews");
  const closeBtnReviews = modalReviews.querySelector(".sendReviewBtn");
  const plusIcon = document.querySelector("#modalGeneral .plusicon");


  peliculas.forEach(pelicula => {
    pelicula.addEventListener("click", () => {
      modalReviews.style.display = "none"; 
      modalGeneral.style.display = "block";
    });
  });

  closeBtnGeneral.addEventListener("click", () => {
    modalGeneral.style.display = "none";
    modalReviews.style.display = "none"; 
  });

  // abrir modal reviews desde el +
  if (plusIcon) {
    plusIcon.addEventListener("click", (e) => {
      e.stopPropagation(); 
      modalGeneral.style.display = "none";   
      modalReviews.style.display = "block";  
    });
  }

  closeBtnReviews.addEventListener("click", () => {
    modalReviews.style.display = "none";
  });
});
