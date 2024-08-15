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

const HashtagsRules = {
  MAX_LENGTH: 20,
  MAX_AMOUNT: 5
};

const DESCRIPTION_MAX_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__item--invalid'
});

const getHashtagsFromString = (value) =>
  getHashtagsFromString(value);

const validateHashtagMaxLength = (value) =>
  getHashtagsFromString(value).every((hashtag) => hashtag.length <= HashtagsRules.MAX_LENGTH);

const validateHashtagStartWith = (value) =>
  getHashtagsFromString(value).every((hashtag) => /^#/.test(hashtag));

const validateUniqueHashtags = (value) => {
  const hashtags = getHashtagsFromString(value).map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validateHashtagSymbols = (value) => getHashtagsFromString(value).every((hashtag) => {
  const hashtagPart = hashtag.slice(1);
  return /^[a-zа-я0-9]*$/i.test(hashtagPart);
}
);

const validateHashtagMinLength = (value) =>
  getHashtagsFromString(value).every((hashtag) => {
    const hashtagPart = hashtag.slice(1);
    // .trim();
    return hashtagPart.length > 0;
  });

const validateMaxHashtags = (value) => {
  const hashtags = getHashtagsFromString(value);
  return hashtags.length <= HashtagsRules.MAX_AMOUNT;
};


pristine.addValidator(inputHashtags, validateMaxHashtags, `Максимальное количество хештегов не должно превышать ${HashtagsRules.MAX_AMOUNT}`, 1, true);
pristine.addValidator(inputHashtags, validateHashtagMaxLength, `Максимальное количество символов не должно превышать ${HashtagsRules.MAX_LENGTH}`, 2, true);
pristine.addValidator(inputHashtags, validateHashtagStartWith, 'Хештег должен начинаться с символа "#" (решетка)', 3, true);
pristine.addValidator(inputHashtags, validateHashtagMinLength, 'Хештег не может состоять только из символа "#" (решётка)', 4, true);
pristine.addValidator(inputHashtags, validateHashtagSymbols, 'Строка после решётки должна состоять только из букв и чисел', 5, true);
pristine.addValidator(inputHashtags, validateUniqueHashtags, 'Хештеги не могут повторяться', 6, true);
pristine.addValidator(textDescription, validTextDescriptionMaxLength, `Максимальное количество символов не должно превышать ${DESCRIPTION_MAX_LENGTH}`);


function validTextDescriptionMaxLength(value) {
  return value.length <= DESCRIPTION_MAX_LENGTH;
}

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
