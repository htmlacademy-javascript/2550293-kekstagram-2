import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const initGallery = (photos) => {

  picturesContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (!pictureElement) {
      return;
    }

    const id = parseInt(pictureElement.dataset.id, 10);
    const photo = photos.find((item) => item.id === id);
    openBigPicture(photo);

  });
};

export { initGallery };

