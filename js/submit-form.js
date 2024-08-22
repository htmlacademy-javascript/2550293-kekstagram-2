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


/*

    +++№2
Отправка данных:
  Сейчас наша форма работает просто: при нажатии на кнопку «Опубликовать»
    происходит перенаправление на адрес, указанный в атрибуте action.
    Это не совсем удобно, и если оставить всё как есть, пользователю придётся самостоятельно возвращаться назад.
    Стоит ли говорить, что это далеко не оптимальное решение. Поэтому данные из формы мы будем передавать с помощью AJAX.

  ++++1)Добавьте обработчик отправки формы, если ещё этого не сделали,
    который бы отменял действие формы по умолчанию и отправлял данные формы посредством fetch на сервер:
      ++++3. Отправка данных на сервер
        ++++3.1. После заполнения всех данных, при нажатии на кнопку «Отправить», все данные из формы,
          включая изображения, с помощью AJAX-запроса отправляются на сервер https://31.javascript.htmlacademy.pro/kekstagram
          методом POST с типом multipart/form-data. На время выполнения запроса к серверу кнопка «Отправить» блокируется.

        ++++3.2. Страница реагирует на неправильно введённые значения в форму.
          Если данные, введённые в форму, не соответствуют ограничениям,
          указанным в пунктах 2.3 и 2.4, форму невозможно отправить на сервер.
          При попытке отправить форму с неправильными данными отправки не происходит,
          а пользователю показываются ошибки для неверно заполненных полей
          (для проверки данных используется сторонняя библиотека Pristine).
          Ошибки выводятся внутри блока .img-upload__field-wrapper соответствующего поля.
          Также, если поле заполнено неверно, блоку, в котором выводится текст ошибки,
          добавляется класс .img-upload__field-wrapper--error.
          Пример:
            <div class="pristine-error img-upload__field-wrapper--error" style="">Неправильный хэштег</div>
          Для разных ошибок показываются разные сообщения. Следует разделять случаи, когда:

          1)введён невалидный хэштег;
          2)превышено количество хэштегов;
          3)хэштеги повторяются;
          4)Длина комментария больше 140 символов.
          5)Количество одновременно показываемых сообщений для одного поля разработчик определяет самостоятельно.

  2)Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю:
    ++++3.3. При успешной отправке формы форма редактирования изображения закрывается, все данные,
      введённые в форму, и контрол фильтра приходят в исходное состояние:
      масштаб возвращается к 100%;
      эффект сбрасывается на «Оригинал»;
      поля для ввода хэштегов и комментария очищаются;
      поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.


    ++++3.4. Если отправка данных прошла успешно, показывается соответствующее сообщение.
      Разметку сообщения, которая находится в блоке #success внутри шаблона template,
      нужно разместить перед закрывающим тегом </body>. Сообщение должно удаляться со страницы
      после нажатия на кнопку .success__button, по нажатию на клавишу Esc и по клику на произвольную область экрана
      за пределами блока с сообщением.

  3)Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение:
    +++++3.5. Если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение.
      Разметку сообщения, которая находится в блоке #error внутри шаблона template,
      нужно разместить перед закрывающим тегом </body>. Сообщение должно удаляться со страницы
      после нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана
      за пределами блока с сообщением. В таком случае вся введённая пользователем информация сохраняется,
      чтобы у него была возможность отправить форму повторно.

        +++4)Доработайте обработчик закрытия формы, чтобы кроме закрытия формы он сбрасывал введённые
    пользователем данные и возвращал форму в исходное состояние. Аналогичным образом обработайте нажатие на кнопку сброса.
    3.6. Нажатие на кнопку .img-upload__cancel приводит к закрытию формы
    и возвращению всех данных и контрола фильтра к исходному состоянию
    (описано в пункте 3.3). Поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.

*/
