/*

№4
Напишите код для валидации формы добавления изображения, используя библиотеку Pristine
(скрипт находится в директории /vendor/pristine). Список полей для валидации:
2.3. хэштеги:

  ++хэштег начинается с символа # (решётка);
  ++строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.),
    ++символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  ++хеш-тег не может состоять только из одной решётки;
  ++максимальная длина одного хэштега 20 символов, включая решётку;
  ++хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  ++хэштеги разделяются пробелами;
  ++один и тот же хэштег не может быть использован дважды;
  ++нельзя указать больше пяти хэштегов;
  ++хэштеги необязательны;
  ++если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

2.4. Комментарий:

  ++комментарий не обязателен;
  ++длина комментария не может составлять больше 140 символов;
  ++если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

++№5
Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать,
если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.
*/
const inputHeshtags = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');
const textDescription = document.querySelector('.text__description');

const pristinHeshtags = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__item--invalid'
});

function validHashtagMaxLength(value) {
  return value.split(' ').filter(Boolean).every((hashtag) => hashtag.length <= 20);
}

function validHashtagStartWith(value) {
  return value.split(' ').filter(Boolean).every((hashtag) => /^#/.test(hashtag));
}

function validHashtagSymbols(value) {
  if (!validHashtagMaxLength(value) || !validUniqueHashtags(value)) {
    return true;
  }

  return value.split(' ').filter(Boolean).every((hashtag) => {
    if (!validHashtagStartWith(hashtag)) {
      return true; // Игнорируем, если хештег не начинается с #
    } else if (hashtag.length === 1 && hashtag === '#') {
      return true; // Разрешаем ввод только символа #
    } else {
      const hashtagPart = hashtag.slice(1);
      return /^[a-zа-я0-9]*$/i.test(hashtagPart);
    }
  });
}

function validHashtagMinLength(value) {
  return value.split(' ').filter(Boolean).every((hashtag) => {
    if (!hashtag.startsWith('#')) {
      return true; // Игнорируем, если хештег не начинается с #
    }
    const hashtagPart = hashtag.slice(1).trim();
    return hashtagPart.length > 0;
  });
}

function validMaxHashtags(value) {
  const hashtags = value.split(' ').filter(Boolean);
  return hashtags.length <= 5;
}

function validUniqueHashtags(value) {
  const hashtags = value.split(' ').filter(Boolean).map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
}


pristinHeshtags.addValidator(inputHeshtags, validHashtagMaxLength, 'Максимальное колличество символов не должно превышать 20');
pristinHeshtags.addValidator(inputHeshtags, validHashtagStartWith, 'Хештег должен начинаться с символа "#" ');
pristinHeshtags.addValidator(inputHeshtags, validHashtagSymbols, 'Хештег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. ');
pristinHeshtags.addValidator(inputHeshtags, validHashtagMinLength, 'Минимальное колличество символов должно быть больше, чем  1');
pristinHeshtags.addValidator(inputHeshtags, validMaxHashtags, 'Максимальное колличество хештегов не должно превышать 5');
pristinHeshtags.addValidator(inputHeshtags, validUniqueHashtags, 'Хештеги не могут повторяться');

const pristinTextDescription = new Pristine(textDescription, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__item--invalid'
});

function validTextDescriptionMaxLength(value) {
  return value.length <= 140;
}

pristinTextDescription.addValidator(textDescription, validTextDescriptionMaxLength, 'Максимальное колличество символов не должно превышать 140');

imgUploadForm.addEventListener('submit', (evt) => {
  const isValidHeshtags = pristinHeshtags.validate();
  const isValidTextDescription = pristinTextDescription.validate();

  if (!isValidHeshtags || !isValidTextDescription) {
    evt.preventDefault();
  }
});
