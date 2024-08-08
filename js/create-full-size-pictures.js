import './create-miniatures.js';
import { Comment } from './data.js';

// Для первого уровня массива
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPicture = document.querySelector('.big-picture');
const likesCount = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.social__comment-shown-count');
const totalComments = document.querySelector('.social__comment-total-count');
// Для второго уровня массива
const imgList = document.querySelector('.social__comments');
const imgInformationList = imgList.querySelectorAll('.social__picture');
const textComment = imgList.querySelectorAll('.social__text');
const photoDescription = document.querySelector('.social__caption');
//Вернемся позже
const counterComments = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
//Global
const body = document.querySelector('body');


const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  counterComments.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCounter.textContent = photo.comments.length;
  totalComments.textContent = Comment.MAX;
  photoDescription.textContent = photo.description;

  photo.comments.forEach(({ avatar, name, message }, index) => {
    if (imgInformationList[index]) {
      imgInformationList[index].src = avatar;
      imgInformationList[index].alt = name;
      textComment[index].textContent = message;
    }
  });

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeButtonClick);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeButtonClick);
}


function onEscKeydown(e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeBigPicture();
  }
}

function closeButtonClick (evt) {
  if (evt.target.matches('.big-picture__cancel')) {
    closeBigPicture();
  }
}

export { openBigPicture };
