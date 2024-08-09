import './create-miniatures.js';
import { isEscapeKey } from './util.js';


const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPicture = document.querySelector('.big-picture');
const likesCount = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.social__comment-shown-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const photoDescription = document.querySelector('.social__caption');
const commentLoader = document.querySelector('.comments-loader');
//Global
const body = document.querySelector('body');
//Вернемся позже
// const totalComments = document.querySelector('.social__comment-total-count');
// const counterComments = document.querySelector('.social__comment-count');

const renderComment = ({ avatar, name, message }) => {
  const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = renderComment(comment);
    commentsFragment.appendChild(commentElement);
  });

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = ''; // Очистка старых комментариев
  commentsContainer.appendChild(commentsFragment);
};


const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  // counterComments.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCounter.textContent = photo.comments.length;
  // totalComments.textContent = Comment.MAX;
  photoDescription.textContent = photo.description;

  renderComments(photo.comments);
  document.addEventListener('keydown', onEscClick);
  closeButton.addEventListener('click', onButtonClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscClick);
  document.removeEventListener('click', onButtonClick);
};

function onButtonClick () {
  if (closeButton) {
    closeBigPicture();
  }
}

function onEscClick () {
  if (isEscapeKey) {
    closeBigPicture();
  }
}

export { openBigPicture };
