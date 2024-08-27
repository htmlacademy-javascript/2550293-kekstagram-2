import { picturesContainer } from './util.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const clearMiniatures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picturesContainer.removeChild(picture);
  });
};

const createMiniatures = (photosData) => {
  clearMiniatures();

  const fragment = document.createDocumentFragment();
  photosData.forEach(({ id, url, likes, comments, description }) => {
    const picture = pictureTemplate.cloneNode(true);
    const img = picture.querySelector('.picture__img');
    const like = picture.querySelector('.picture__likes');
    const comment = picture.querySelector('.picture__comments');

    img.src = url;
    img.alt = description;
    like.textContent = likes;
    comment.textContent = comments.length;

    picture.dataset.id = id;

    fragment.appendChild(picture);

  });

  picturesContainer.appendChild(fragment);

};


export {createMiniatures};
