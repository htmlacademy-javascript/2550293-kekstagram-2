import {photos} from './main.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createMiniatures = () => {
  const fragment = document.createDocumentFragment();
  const picturesContainer = document.querySelector('.pictures');

  photos.forEach(({ url, likes, comments, description }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const createMiniature = createMiniatures();
export {createMiniature};
