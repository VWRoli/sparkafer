'use strict';

// VARIABLES
const container = document.querySelector('.images-container');
const overlayEl = document.querySelector('.overlay');
const modalEl = document.querySelector('.modal');
const nextArrowEl = document.querySelector('.fa-arrow-circle-right');
const prevArrowEl = document.querySelector('.fa-arrow-circle-left');

const startImgNumber = 1;
const endImgNumber = 106;
const imageNumbers = [];

//State variables
let isFullScreen = false;
let currentImgNumber = 1;

const clear = () => {
  modalEl.innerHTML = `<i class="far fa-times-circle"></i>
  <div class="left"><i class="fas fa-arrow-circle-left"></i></div>
  <div class="right"><i class="fas fa-arrow-circle-right"></i></div>
  `;
};
/////////////////////////////////////////////////
// SHOW IMAGES
for (let i = startImgNumber; i <= endImgNumber; i++) {
  imageNumbers.push(i);
}

imageNumbers.forEach((imgNumber) => {
  const html = `<div class="image-wrapper">
    <img src="https://cdn.statically.io/img/sparkafer.netlify.app/w=400/images/image_${imgNumber}.jpg"
     data-nr="${imgNumber}" alt="Image ${imgNumber}" />
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
});

/////////////////////////////////////////////////
// SHOW MODAL
const toggleModal = () => {
  if (modalEl.classList.contains('visible')) {
    clear();
  } else {
    setImage(currentImgNumber);
  }
  overlayEl.classList.toggle('visible');
  modalEl.classList.toggle('visible');
};

const setImage = () => {
  clear();
  const html = `<img src="https://cdn.statically.io/img/sparkafer.netlify.app/w=950/images/image_${currentImgNumber}.jpg" alt="Image ${currentImgNumber}" />`;
  modalEl.insertAdjacentHTML('afterbegin', html);
};

//Open modal clicking on images
container.addEventListener('click', (e) => {
  const clicked = e.target.localName;
  currentImgNumber = e.target.dataset.nr;

  if (clicked !== 'img') return;

  toggleModal(currentImgNumber);
});

//close modal with ovarlay click
overlayEl.addEventListener('click', toggleModal);

//close modal with close button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-times-circle')) toggleModal();
});

//Close modal window with Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalEl.classList.contains('visible'))
    toggleModal();
});
/////////////////////////////////////////////////
const nextImg = () => {
  if (currentImgNumber < endImgNumber) {
    currentImgNumber++;
    setImage();
  }
};
const prevImg = () => {
  if (currentImgNumber > startImgNumber) {
    currentImgNumber--;
    setImage();
  }
};

/////////////////////////////////////////////////
// HANDLE TOUCH EVENTS
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(e) {
  return (
    e.touches || // browser API
    e.originalEvent.touches
  ); // jQuery
}
function handleTouchStart(e) {
  const firstTouch = getTouches(e)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(e) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = e.touches[0].clientX;
  let yUp = e.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) + Math.abs(yDiff) > 150) {
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* right swipe */
        nextImg();
      } else {
        /* left swipe */
        prevImg();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}

/////////////////////////////////////////////////
//HANDLE NEXT AND PREV SLIDE
modalEl.addEventListener('click', (e) => {
  const clicked = e.target;

  if (!clicked.classList.contains('fas')) return;

  // NEXT ARROW
  if (clicked.classList.contains('fa-arrow-circle-left')) prevImg();
  // PREV ARROW
  if (clicked.classList.contains('fa-arrow-circle-right')) nextImg();
});

/////////////////////////////////////////////////
//HANDLE FULLSCREEN
modalEl.addEventListener('dblclick', function () {
  if (!isFullScreen) {
    isFullScreen = !isFullScreen;
    if (this.requestFullscreen) {
      this.requestFullscreen();
    } else if (this.mozRequestFullScreen) {
      this.mozRequestFullScreen();
    } else if (this.webkitRequestFullscreen) {
      this.webkitRequestFullscreen();
    } else if (this.msRequestFullscreen) {
      this.msRequestFullscreen();
    }
  } else {
    isFullScreen = !isFullScreen;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});
