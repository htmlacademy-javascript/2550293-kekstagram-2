import { initGallery} from './gallery.js';
import { photos } from './data.js';
document.addEventListener('DOMContentLoaded', () => {
  initGallery(photos);
});
