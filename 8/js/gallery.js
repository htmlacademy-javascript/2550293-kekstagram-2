import { createMiniatures } from './create-miniatures.js';
import { openBigPicture } from './create-full-size-pictures.js';

const picturesContainer = document.querySelector('.pictures');

const initGallery = (photos) => {
  createMiniatures(photos);

  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    const pictureElement = evt.target.closest('.picture');

    const id = parseInt(pictureElement.dataset.id, 10);
    const photo = photos.find((item) => item.id === id);
    openBigPicture(photo);


  });
};

export { initGallery };

