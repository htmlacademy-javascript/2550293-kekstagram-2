import {photos} from './data.js';

const photoData = photos.map(({ url, likes, comments, description }) => ({
  url,
  likes,
  comments: comments.length,
  description
}));

function createMiniatures() {
  //Почему-то commit никак не реагировал на изменения мною файла index.html.
  //Поэтому создал div в js. Было ли так задуманно или нет, не знаю
  //Не знаю, в итоге он обновиться или нет, по пул реквесту пустота. Странно это все, VSCode не видит или не хочет видеть
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

    fragment.appendChild(pictureElement);
  });

  // Добавляем все элементы из фрагмента в div
  div.appendChild(fragment);
}

const createMiniature = createMiniatures();

export {createMiniature};
