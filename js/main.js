import { createMiniatures } from './miniatures.js';
import { initGallery } from './gallery.js';
import { closeForm, setUserFormSubmit } from './form.js';
import { fetchData } from './server-api.js';
import { showDataErrorAlert } from './alerts.js';
import { setFilters } from './filters.js';
import './upload-image.js';

fetchData()
  .then((photos) => {
    createMiniatures(photos);
    initGallery(photos);
    setFilters(photos);
  })
  .catch(showDataErrorAlert);
setUserFormSubmit(closeForm);
