import './miniatures.js';
import { isEscapeKey } from './util.js';

const DEFAULT_COMMENTS_COUNT = 5;

const elements = {
  bigPictureImg: document.querySelector('.big-picture__img img'),
  bigPicture: document.querySelector('.big-picture'),
  likesCount: document.querySelector('.likes-count'),
  closeButton: document.querySelector('.big-picture__cancel'),
  photoDescription: document.querySelector('.social__caption'),
  totalCount: document.querySelector('.social__comment-total-count'),
  shownCount: document.querySelector('.social__comment-shown-count'),
  commentTemplate: document.querySelector('#comment-template').content.querySelector('.social__comment'),
  loadMoreButton: document.querySelector('.comments-loader'),
  commentsContainer: document.querySelector('.social__comments'),
};

let shownCommentsCount = 0;
let currentComments = [];

const updateCommentCount = () => {
  elements.shownCount.textContent = shownCommentsCount;
  elements.totalCount.textContent = currentComments.length;
};

const createComment = ({ avatar, name, message }) => {
  const comment = elements.commentTemplate.cloneNode(true);

  const commentPicture = comment.querySelector('.social__picture');
  const commentText = comment.querySelector('.social__text');

  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentText.textContent = message;

  return comment;
};

const updateLoadMoreButtonVisibility = () => {
  const shouldShowLoadMore = shownCommentsCount < currentComments.length;
  elements.loadMoreButton.classList.toggle('hidden', !shouldShowLoadMore);
};


const renderComments = () => {
  const startIndex = shownCommentsCount;
  shownCommentsCount = Math.min(currentComments.length, shownCommentsCount + DEFAULT_COMMENTS_COUNT);

  const newComments = currentComments.slice(startIndex, shownCommentsCount);
  const commentsFragment = document.createDocumentFragment();

  updateCommentCount();

  newComments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });

  elements.commentsContainer.appendChild(commentsFragment);

  updateLoadMoreButtonVisibility();
};

const onLoadMoreButtonClick = () => {
  renderComments();
};

const openBigPicture = ({ url, likes, description, comments }) => {
  elements.bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  elements.bigPictureImg.src = url;
  elements.likesCount.textContent = likes;
  elements.photoDescription.textContent = description;

  shownCommentsCount = 0;
  currentComments = comments;
  elements.commentsContainer.innerHTML = '';

  renderComments();

  elements.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  document.addEventListener('keydown', onEscKeydown, { once: true });
  elements.closeButton.addEventListener('click', onCloseButtonClick, { once: true });
};

const closePigPicture = () => {
  elements.bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  elements.loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  elements.closeButton.removeEventListener('click', onCloseButtonClick); // Удаляем обработчик onCloseButtonClick
};

function onCloseButtonClick() {
  closePigPicture();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePigPicture();
  }
}

export { openBigPicture };
