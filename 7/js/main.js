import { createPhoto, NUMBER_PHOTOS} from './data.js';
import { createMiniatures } from './createMiniatures.js';


const createPhotos = () => Array.from({ length: NUMBER_PHOTOS }, (item, index) => createPhoto(index + 1));

const photos = createPhotos();
export {photos};
/* eslint-disable no-console */
console.log(photos);
createMiniatures();
