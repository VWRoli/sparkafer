"use strict";

// VARIABLES
const container = document.querySelector(".images-container");
const overlayEl = document.querySelector(".overlay");
const modalEl = document.querySelector(".modal");
const nextArrowEl = document.querySelector(".fa-arrow-circle-right");
const prevArrowEl = document.querySelector(".fa-arrow-circle-left");

const startImgNumber = 1;
const endImgNumber = 93;
const imageNumbers = [];
let currentImgNumber = 1;

const clear = () => {
  modalEl.innerHTML = `<i class="fas fa-arrow-circle-left"></i
  ><i class="fas fa-arrow-circle-right"></i>`;
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// SHOW IMAGES
for (let i = startImgNumber; i <= endImgNumber; i++) {
  imageNumbers.push(i);
}

imageNumbers.forEach((imgNumber) => {
  const html = `<div class="image-wrapper">
    <img src="./images/thumbnails/image_${imgNumber}.jpg" data-nr="${imgNumber}" alt="Image ${imgNumber}" />
    </div>`;
  container.insertAdjacentHTML("beforeend", html);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// SHOW MODAL

const toggleModal = () => {
  if (modalEl.classList.contains("visible")) {
    clear();
  } else {
    setImage(currentImgNumber);
  }
  overlayEl.classList.toggle("visible");
  modalEl.classList.toggle("visible");
};

const setImage = () => {
  clear();
  const html = `<img src="./images/img/image_${currentImgNumber}.jpg" alt="Image ${currentImgNumber}" />`;
  modalEl.insertAdjacentHTML("afterbegin", html);
};

//Open modal clicking on images
container.addEventListener("click", (e) => {
  const clicked = e.target.localName;
  currentImgNumber = e.target.dataset.nr;

  if (clicked !== "img") return;

  toggleModal(currentImgNumber);
});

//close modal with ovarlay click
overlayEl.addEventListener("click", toggleModal);

//Close modal window with Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalEl.classList.contains("visible"))
    toggleModal();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
const nextImg = () => {
  currentImgNumber++;
  setImage();
};
const prevImg = () => {
  currentImgNumber--;
  setImage();
};

// NEXT ARROW
modalEl.addEventListener("click", (e) => {
  const clicked = e.target;

  if (!clicked.classList.contains("fas")) return;

  if (clicked.classList.contains("fa-arrow-circle-left")) prevImg();
  if (clicked.classList.contains("fa-arrow-circle-right")) nextImg();
});
// PREV ARROW
prevArrowEl.addEventListener("click", prevImg);
