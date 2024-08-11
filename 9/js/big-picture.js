//2
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
const totalCountElement = document.querySelector('.social__comment-total-count');
const shownCountElement = document.querySelector('.social__comment-shown-count');
const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
const loadMoreButton = document.querySelector('.comments-loader');
const DEFAULT_COMMENTS_COUNT = 5;
const commentsContainer = document.querySelector('.social__comments');

const updateCommentCount = (shownCount, totalCount) => {
  shownCountElement.textContent = shownCount;
  totalCountElement.textContent = totalCount;
};

const renderComment = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  let commentsCount = 0;

  function checkCommentsCount () {
    if (commentsCount === comments.length) {
      loadMoreButton.classList.add('hidden');
      loadMoreButton.removeEventListener('click', onLoadMoreClick);
    } else {
      loadMoreButton.classList.remove('hidden');
      loadMoreButton.addEventListener('click', onLoadMoreClick);
    }
  }

  function addComments () {
    const startIndex = commentsCount;
    commentsCount = Math.min(comments.length, commentsCount + DEFAULT_COMMENTS_COUNT);

    const newComments = comments.slice(startIndex, commentsCount);
    const commentsFragment = document.createDocumentFragment();

    updateCommentCount(commentsCount, comments.length);

    newComments.forEach((comment) => {
      const commentElement = renderComment(comment);
      commentsFragment.appendChild(commentElement);
    });

    commentsContainer.appendChild(commentsFragment);
    checkCommentsCount();
  }

  function onLoadMoreClick () {
    addComments();
  }

  commentsContainer.innerHTML = '';
  addComments();
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  photoDescription.textContent = photo.description;

  renderComments(photo.comments);
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', onButtonClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

function onButtonClick () {
  closeBigPicture();
}

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

export { openBigPicture };
