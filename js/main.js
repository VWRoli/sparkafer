"use strict";

const container = document.querySelector(".images-container");
const startImgNumber = 1;
const endImgNumber = 93;
const imageNumbers = [];
for (let i = startImgNumber; i <= endImgNumber; i++) {
  imageNumbers.push(i);
}
console.log(imageNumbers);

imageNumbers.forEach((imgNumber) => {
  const html = `<div class="image-wrapper">
    <img src="./images/thumbnails/image_${imgNumber}.jpg" alt="Image ${imgNumber}" />
    </div>`;
  container.insertAdjacentHTML("beforeend", html);
});
