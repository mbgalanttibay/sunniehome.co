`use strict`;

const navMenuBtn = document.querySelector(`.nav__menu`);
const dropDownMenu = document.querySelector(`.nav__ul`);
const checkBox = document.querySelector(`#nav__checkbox`);
const closeModalBtn = document.querySelector(`.close__modal`);
const catalogImg = document.querySelectorAll(`.catalog__img`);
const modal = document.querySelector(`.modal-container`);
const modalOverlay = document.querySelector(`.modal-overlay`);

//Nav bar
let active = false;
navMenuBtn.addEventListener(`click`, (e) => {
  if (active === false) {
    dropDownMenu.style.left = `0%`;
    active = true;
  } else {
    dropDownMenu.style.left = `-100%`;
    active = false;
  }
});

//Catalogs

catalogImg.forEach((img) =>
  img.addEventListener(`click`, (e) => {
    const clicked = e.target.dataset.num;

    const modalImg = document.querySelector(`.modal-img`);
    // console.log(modal, modalImg, clicked);
    modalImg.setAttribute(`src`, `prod/prod${clicked}.jpg`);
    modal.classList.remove(`hidden`);
  })
);

document.addEventListener(`keydown`, (e) => {
  //   console.log(e);
  if (e.key === `Escape` && !modal.classList.contains(`hidden`))
    modal.classList.add(`hidden`);
});

modalOverlay.addEventListener(`click`, (e) => {
  if (!e.target.classList.contains(`modal-img`)) modal.classList.add(`hidden`);
});

closeModalBtn.addEventListener(`click`, () => {
  !modal.classList.contains(`hidden`) && modal.classList.add(`hidden`);
});

//Review setion
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".review__slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
