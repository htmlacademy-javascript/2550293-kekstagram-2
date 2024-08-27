import { openBigPicture } from './big-picture.js';
import { picturesContainer } from './util.js';

const initGallery = (photos) => {

  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (!picture) {
      return;
    }

    const id = parseInt(picture.dataset.id, 10);
    const photo = photos.find((item) => item.id === id);
    openBigPicture(photo);

  });
};

export { initGallery };

