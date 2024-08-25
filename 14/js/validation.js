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
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const getHashtagsFromString = (value) =>
  value.split(' ').filter(Boolean);

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
  getHashtagsFromString(value).every((hashtag) =>
    !hashtag.startsWith('#') || hashtag.slice(1).length > 0
  );

const validateMaxHashtags = (value) => {
  const hashtags = getHashtagsFromString(value);
  return hashtags.length <= HashtagsRules.MAX_AMOUNT;
};
pristine.addValidator(inputHashtags, validateHashtagMinLength, 'Хештег не может состоять только из символа "#" (решётка)', 1, true);
pristine.addValidator(inputHashtags, validateHashtagStartWith, 'Хештег должен начинаться с символа "#" (решетка)', 2, true);
pristine.addValidator(inputHashtags, validateHashtagMaxLength, `Максимальное количество символов не должно превышать ${HashtagsRules.MAX_LENGTH}`, 3, true);
pristine.addValidator(inputHashtags, validateMaxHashtags, `Максимальное количество хештегов не должно превышать ${HashtagsRules.MAX_AMOUNT}`, 4, true);
pristine.addValidator(inputHashtags, validateHashtagSymbols, 'Строка после решётки должна состоять только из букв и чисел', 5, true);
pristine.addValidator(inputHashtags, validateUniqueHashtags, 'Хештеги не могут повторяться', 6, true);
pristine.addValidator(textDescription, validTextDescriptionMaxLength, `Максимальное количество символов не должно превышать ${DESCRIPTION_MAX_LENGTH}`);


function validTextDescriptionMaxLength(value) {
  return value.length <= DESCRIPTION_MAX_LENGTH;
}

const resetValidation = () => {
  pristine.reset();
};


export { resetValidation, pristine};
