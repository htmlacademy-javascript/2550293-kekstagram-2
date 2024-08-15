import { isEscapeKey } from './util.js';
/*
(Приписание атрибутов != AJAX-запросу)
+№1
Пропишите тегу <form> 33 СТРОКА правильные значения атрибутов method и enctype и адрес action для отправки формы на сервер.
3.1. После заполнения всех данных, при нажатии на кнопку «Отправить», все данные из формы, включая изображения,
с помощью AJAX-запроса отправляются на сервер https://31.javascript.htmlacademy.pro/kekstagram методом POST
с типом multipart/form-data. На время выполнения запроса к серверу кнопка «Отправить» блокируется.
Если форма заполнена верно, то после отправки покажется страница сервера
(по адресу из атрибута action тега form) с успешно отправленными данными.
Если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками.
В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.


ПОТОМ №2
Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.
В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.
1.2. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла .img-upload__input,
который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля .img-upload__input),
показывается форма редактирования изображения. У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.
После выбора изображения пользователем с помощью стандартного контрола загрузки файла .img-upload__input,
нужно подставить его в форму редактирования вместо тестового изображения в блок предварительного просмотра и в превью эффектов.
Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа

++++№3
После реализуйте закрытие формы.
1.3 Закрытие формы редактирования изображения производится либо нажатием на кнопку .img-upload__cancel,
либо нажатием клавиши Esc. Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open.
Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла .img-upload__input.
В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.
Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию,
а значит окно с формой не отобразится, что будет нарушением техзадания.
Значение других полей формы также нужно сбрасывать.
*/

const closeButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

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
  removeEventListeners();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt) && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
    closeForm();
  }
}

function onCloseButtonClick() {
  closeForm();
}

imgUploadForm.addEventListener('change', () => {
  openForm();
});
