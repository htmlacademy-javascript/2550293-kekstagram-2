import { isEscapeKey } from './util';
const LOAD_ERROR_DISPLAY_TIME = 5000;

const errorOnLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
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

const showSubmissionMessage = (type) => {
  const { template, buttonClass } = ResultTypes[type];
  const messageContainer = template.cloneNode(true);
  const button = messageContainer.querySelector(buttonClass);

  const closeMessage = () => {
    messageContainer.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown(event) {
    if (isEscapeKey(event)) {
      closeMessage();
    }
  }

  document.body.append(messageContainer);

  button.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onEscKeydown);

  messageContainer.addEventListener('click', (event) => {
    if (event.target === messageContainer) {
      closeMessage();
    }
  });
};

const uploadErrorTemplate = () => {
  const errorOnLoadContainer = errorOnLoadTemplate.cloneNode(true);

  document.body.append(errorOnLoadContainer);
  setTimeout(() => {
    errorOnLoadContainer.remove();
  }, LOAD_ERROR_DISPLAY_TIME);
};

export { showSubmissionMessage, uploadErrorTemplate };
