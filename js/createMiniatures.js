import {photos} from './data.js';

const photoData = photos.map(({ url, likes, comments, description }) => ({
  url,
  likes,
  comments: comments.length,
  description
}));

function createMiniatures() {
  const div = document.querySelector('.pictures');
  const template = document.querySelector('#picture');
  const templateContent = template.content;

  photoData.forEach(({ url, likes, comments, description }) => {
    const pictureElement = document.importNode(templateContent, true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments;

    div.append(pictureElement);
  });
}

const createMiniature = createMiniatures();

export {createMiniature};
