import { isEscapeKey } from './util.js';
const LOAD_ERROR_DISPLAY_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const ResultTypes = {
  success: {
    template: successTemplate,
    buttonClass: '.success__button'
  },
  error: {
    template: errorTemplate,
    buttonClass: '.error__button'
  }
};

const closeAlert = (messageContainer, onEscKeydown) => {
  messageContainer.remove();
  document.removeEventListener('keydown', onEscKeydown);
};

const showAlert = (type) => {
  const { template, buttonClass } = ResultTypes[type];
  const messageContainer = template.cloneNode(true);
  const button = messageContainer.querySelector(buttonClass);

  const onEscKeydown = (event) => {
    if (isEscapeKey(event)) {
      closeAlert(messageContainer, onEscKeydown);
    }
  };

  button.addEventListener('click', () => closeAlert(messageContainer, onEscKeydown));

  document.addEventListener('keydown', onEscKeydown);

  messageContainer.addEventListener('click', (event) => {
    if (event.target === messageContainer) {
      closeAlert(messageContainer, onEscKeydown);
    }
  });

  document.body.append(messageContainer);
};

const showDataErrorAlert = () => {
  const errorOnLoadContainer = dataErrorTemplate.cloneNode(true);

  document.body.append(errorOnLoadContainer);
  setTimeout(() => errorOnLoadContainer.remove(), LOAD_ERROR_DISPLAY_TIME);
};

export { showAlert, showDataErrorAlert };
