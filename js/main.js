// eslint-disable-next-line no-unused-vars
import { createPhoto} from './data.js';
import { createMiniatures } from './create-miniatures.js';
/*global createPhotos*/
const photos = createPhotos();
createMiniatures(photos);
