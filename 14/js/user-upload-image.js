/*
Доработайте форму загрузки изображения так, чтобы в неё можно было загружать фотографию.

Выбранная пользователем фотография должна загружаться в поле загрузки файлов в форме загрузки и показываться в окне.
Изменение размеров и применение фильтра должны применяться для загруженной фотографии.


*/

const PHOTO_TYPES = [ 'png', 'jpeg', 'jpg', 'ico', 'svg', 'gif'];

const uploadImg = document.querySelector('.img-upload__input'); //submit Есть
const userImg = document.querySelector('.img-upload__preview img');

uploadImg.addEventListener('change', () => {
  const photo = uploadImg.files[0];
  const photoName = photo.name.toLowerCase();
  const isAllowedPhotoType = PHOTO_TYPES.some((type) => photoName.endsWith(type));

  if(isAllowedPhotoType) {
    userImg.src = URL.createObjectURL(photo);
  }
});

