import { createMiniatures } from './create-miniatures.js';
import { initGallery } from './gallery.js';
import './submit-form.js';
import { closeForm } from './submit-form.js';
import { setUserFormSubmit } from './submit-form.js';
import { fetchData } from './server-api.js';
import { uploadErrorTemplate } from './alerts.js';
import { setFilters } from './img-filters.js';
import { imgFilters } from './img-filters.js';
import './user-upload-image.js';

fetchData()
  .then((photos) => {
    createMiniatures(photos);
    initGallery(photos);
    setFilters(photos);
    imgFilters.classList.remove('img-filters--inactive');
  })
  .catch(uploadErrorTemplate);
setUserFormSubmit(closeForm);

// setUserFormSubmit(() => {
//   closeForm(); // Закрытие формы после успешного аплоада
//   fetchData() // Повторно загружаем данные с сервера и обновляем миниатюры
//     .then((photos) => {
//       console.log(photos);
//       createMiniatures(photos);
//       initGallery(photos);
//     })
//     .catch(uploadErrorTemplate);
// });
