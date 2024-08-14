import { createPhotos } from './data.js';
import { createMiniatures } from './create-miniatures.js';
import { initGallery } from './gallery.js';

const photos = createPhotos();

createMiniatures(photos);
initGallery(photos);
