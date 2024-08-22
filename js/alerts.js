import { isEscapeKey } from './util';


const ResultTypes = {
  success: {
    templateId: '#success',
    containerClass: '.success',
    buttonClass: '.success__button',
  },
  error: {
    templateId: '#error',
    containerClass: '.error',
    buttonClass: '.error__button',
  },
};

const LOAD_ERROR_DISPLAY_TIME = 5000;

const showSubmissionMessage = (type) => {
  const { templateId, containerClass, buttonClass } = ResultTypes[type];

  const messageTemplate = document.querySelector(templateId).content.querySelector(containerClass);
  const messageContainer = messageTemplate.cloneNode(true);
  const button = messageContainer.querySelector(buttonClass);

  const closeMessage = () => {
    messageContainer.remove();
    document.removeEventListener('keydown', onEscKeydownClick);
  };

  function onEscKeydownClick (event) {
    if (isEscapeKey(event)) {
      closeMessage();
    }
  }

  document.body.append(messageContainer);

  button.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onEscKeydownClick);

  messageContainer.addEventListener('click', (event) => {
    if (event.target === messageContainer) {
      closeMessage();
    }
  });
};

const showLoadError = () => {
  const errorOnLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorOnLoadContainer = errorOnLoadTemplate.cloneNode(true);

  document.body.append(errorOnLoadContainer);
  setTimeout(() => {
    errorOnLoadContainer.remove();
  }, LOAD_ERROR_DISPLAY_TIME);
};

export { showSubmissionMessage, showLoadError };
