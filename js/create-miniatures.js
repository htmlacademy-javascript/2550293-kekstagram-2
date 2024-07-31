const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createMiniatures = (photos) => {
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

export {createMiniatures};
