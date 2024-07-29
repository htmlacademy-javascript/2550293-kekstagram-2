import {photos} from './data.js';

const photoData = photos.map(({ url, likes, comments, description }) => ({
  url,
  likes,
  comments: comments.length,
  description
}));

function createMiniatures() {
  //В задании не написано, откуда появляется div, поэтому почему бы не создать его самим через js.
  const div = document.createElement('div');
  div.className = 'pictures';
  document.body.insertBefore(div, document.body.firstChild);

  const template = document.querySelector('#picture');
  const templateContent = template.content;
  const fragment = document.createDocumentFragment();

  photoData.forEach(({ url, likes, comments, description }) => {
    const pictureElement = document.importNode(templateContent, true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments;

    fragment.append(pictureElement);
  });

  // Добавляем все элементы из фрагмента в div
  div.append(fragment);
}

const createMiniature = createMiniatures();

export {createMiniature};
