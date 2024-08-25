import { createMiniatures } from './create-miniatures.js';
import { initGallery } from './gallery.js';
import './submit-form.js';
import { closeForm } from './submit-form.js';
import { setUserFormSubmit } from './submit-form.js';
import { fetchData } from './server-api.js';
import { uploadErrorTemplate } from './alerts.js';
import { setFilters } from './img-filters.js';
import './user-upload-image.js';

fetchData()
  .then((photos) => {
    createMiniatures(photos);
    initGallery(photos);
    setFilters(photos);
  })
  .catch(uploadErrorTemplate);
setUserFormSubmit(closeForm);
