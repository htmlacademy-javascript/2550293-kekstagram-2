import { isEscapeKey } from './util.js';
import { resetValidation } from './validation.js';
import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';
import { pristine } from './validation.js';
import { showAlert } from './alerts.js';
import { sendData } from './server-api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const closeButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');

const setButtonState = (isDisabled) => {
  imgUploadButton.disabled = isDisabled;
  imgUploadButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  toggleEventListeners('add');
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  imgUploadForm.reset();
  resetScale();
  resetEffect();
  resetValidation();
  toggleEventListeners('remove');
};

const onEscKeydown = (evt) => {
  const errorContainer = document.querySelector('.error');
  if (isEscapeKey(evt) && !errorContainer && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
    closeForm();
  }
};

const onCloseButtonClick = () => closeForm();

function toggleEventListeners (action) {
  closeButton[`${action}EventListener`]('click', onCloseButtonClick);
  document[`${action}EventListener`]('keydown', onEscKeydown);
}

imgUploadForm.addEventListener('change', openForm);

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      setButtonState(true);
      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          showAlert('success');
          onSuccess();
        })
        .catch(() => {
          showAlert('error');
        })
        .finally(() => setButtonState(false));
    }
  });
};

export { closeForm, setUserFormSubmit };
