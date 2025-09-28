const URL_PEL = 'http://62.169.28.169/movies/all-pel'
const URL_MPOP = 'http://62.169.28.169/movies/pel-pop'
const URL_SEARCH = 'http://62.169.28.169/movies/search/'

const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dot");
let index = 0;

function slidesMain(){
  fetch(URL_PEL)
  .then(Response => Response.json())
  .then(data=>{
    slides.innerHTML = `
    <img src="${data[0].backdrop}" alt="">
    <img src="${data[1].backdrop}" alt="">
    <img src="${data[2].backdrop}" alt="">
    `
  })
  .catch(error => console.error('Error fetching slides:', error));
}

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

async function popMore(){
  fetch(URL_MPOP)
  .then(Response=>Response.json())
  .then(data=>{
    let pp = ``
    for ( let i = 0; i < 20; i++ ){
      pp += `
      <div data-movie-id="${data[i]._id}" class="pelicula">
      <img src="${data[i].poster}" alt="">
      <p class="titulo">${data[i].title}</p>
      <p class="año">${data[i].year}</p>
      </div>
      `
    }
    carrusel.innerHTML = pp
    const peliculas = document.querySelectorAll(".pelicula");
    peliculas.forEach(pelicula => {
      pelicula.addEventListener("click", () => {
        const id = pelicula.dataset.movieId;
        modalReviews.style.display = "none"; 
        modalGeneral.style.display = "block";
        fetch(`${URL_SEARCH}${id}`)
        .then(Response=>Response.json())
        .then(data=>{
          console.log(data)
          const datas = data[0]
          const main = document.querySelector(".infomain")
          main.innerHTML = `
          <p class="titulo">${datas.title}</p>
          <p class="summary">
            ${datas.summary}
          </p>
          `;
          const detail = document.querySelector(".details")
          detail.innerHTML = `
          <div class="yearcontainer">
            <p>Category</p>
            <p>${datas.genres}</p>
          </div>
          <div class="categorycontainer">
            <p>Year</p>
            <p>${datas.year}</p>
          </div>
          <div class="popularitycontainer">
            <p>Popularity</p>
            <p>${datas.popularity}</p>
          </div>
          `;
          const imgEl = document.querySelector('#modalGeneral .img img').src = datas.backdrop;
        })
      });
    });
  })
}

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

  const modalReviews = document.getElementById("modalReviews");
  const closeBtnReviews = modalReviews.querySelector(".sendReviewBtn");
  const plusIcon = document.querySelector("#modalGeneral .plusicon");


  

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

  slidesMain();
  popMore();
});


