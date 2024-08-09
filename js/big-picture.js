import './create-miniatures.js';
import { isEscapeKey } from './util.js';

const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPicture = document.querySelector('.big-picture');
const likesCount = document.querySelector('.likes-count');

const closeButton = bigPicture.querySelector('.big-picture__cancel');
const photoDescription = document.querySelector('.social__caption');

//Global
const body = document.querySelector('body');
//Вернемся позже
const counterComments = document.querySelector('.social__comment-count');
const totalCountElement = document.querySelector('.social__comment-total-count');
const shownCountElement = document.querySelector('.social__comment-shown-count');

const updateCommentCount = (shownCount, totalCount) => {
  shownCountElement.textContent = shownCount;
  totalCountElement.textContent = totalCount;
};
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
  const initialComments = comments.slice(0, 5);
  const remainingComments = comments.slice(5);

  updateCommentCount(initialComments.length, comments.length);

  initialComments.forEach((comment) => {
    const commentElement = renderComment(comment);
    commentsFragment.appendChild(commentElement);
  });

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = ''; // Очистка старых комментариев
  commentsContainer.appendChild(commentsFragment);
  const loadMoreButton = document.querySelector('.comments-loader');

  if (remainingComments.length > 0) {
    loadMoreButton.style.display = '';
    let currentIndex = 5;
    loadMoreButton.addEventListener('click', () => {
      const remainingCount = comments.length - currentIndex;

      if (remainingCount > 0) {
        // Определяем, сколько комментариев нужно отобразить
        const commentsToShow = Math.min(remainingCount, 5);

        const nextComments = comments.slice(currentIndex, currentIndex + commentsToShow);
        nextComments.forEach((comment) => {
          const commentElement = renderComment(comment);
          commentsFragment.appendChild(commentElement);
        });
        commentsContainer.appendChild(commentsFragment);
        const totalShownComments = currentIndex + commentsToShow;
        updateCommentCount(totalShownComments, comments.length);
        currentIndex += commentsToShow;


        if (currentIndex >= comments.length) {
          loadMoreButton.style.display = 'none';
        }
      }
    });
  } else {
    loadMoreButton.style.display = 'none';
  }

};


const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  counterComments.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  photoDescription.textContent = photo.description;

  renderComments(photo.comments);
  document.addEventListener('keydown', onEscClick);
  closeButton.addEventListener('click', onButtonClick);

};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('click', onButtonClick);
};

function onButtonClick () {
  if (closeButton) {
    closeBigPicture();
  }
}

function onEscClick (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

export { openBigPicture };

