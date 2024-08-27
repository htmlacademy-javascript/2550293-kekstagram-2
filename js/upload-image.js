import { imgPreview } from './util.js';
const PHOTO_TYPES = ['png', 'jpeg', 'jpg', 'ico', 'svg', 'webp'];

const uploadImg = document.querySelector('.img-upload__input');
const effectsPreviews = document.querySelectorAll('.effects__preview');

uploadImg.addEventListener('change', () => {
  const photo = uploadImg.files[0];
  const photoName = photo.name.toLowerCase();
  const isAllowedPhotoType = PHOTO_TYPES.some((type) => photoName.endsWith(type));

  if (isAllowedPhotoType) {
    const imageUrl = URL.createObjectURL(photo);
    imgPreview.src = imageUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  }
});

