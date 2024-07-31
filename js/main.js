import { createPhotos} from './data.js';
import { createMiniatures } from './create-miniatures.js';
const photos = createPhotos();
createMiniatures(photos);
