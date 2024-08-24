import { isEscapeKey } from './util.js';
import { resetValidation } from './validation.js';
import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';
import { pristine } from './validation.js';
import { showSubmissionMessage } from './alerts.js';
import { sendData } from './server-api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const closeButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');

const enableImgUploadButton = () => {
  imgUploadButton.disabled = false;
  imgUploadButton.textContent = SubmitButtonText.IDLE;
};

const disableImgUploadButton = () => {
  imgUploadButton.disabled = true;
  imgUploadButton.textContent = SubmitButtonText.SENDING;
};

const addEventListeners = () => {
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

const removeEventListeners = () => {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeydown);
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  addEventListeners();
};

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
  imgUploadForm.reset();
  resetScale(); // Сброс масштаба
  resetEffect(); // Сброс эффекта
  resetValidation();
  removeEventListeners();
}

function onEscKeydown(evt) {
  const errorContainer = document.querySelector('.error'); // Проверяем наличие окна с ошибкой

  if (isEscapeKey(evt) && !errorContainer && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
    closeForm();
  }
}

function onCloseButtonClick() {
  closeForm();
}

imgUploadForm.addEventListener('change', () => {
  openForm();
});


const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      disableImgUploadButton();
      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          showSubmissionMessage('success');
          onSuccess();
        })
        .catch(() => {
          showSubmissionMessage('error');
        })
        .finally(enableImgUploadButton);
    }
  });
};


export { closeForm, setUserFormSubmit };
