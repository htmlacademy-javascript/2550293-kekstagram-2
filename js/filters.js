import { createMiniatures } from './miniatures.js';
import { debounce } from './util.js';

const PhotoAmountRules = {
  min: 0,
  max: 10,
};

const TIME_OUT_INDEX = 500;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersButtons = imgFilters.querySelector('.img-filters__form');

const debouncedRender = debounce((photos) => {
  createMiniatures(photos);
}, TIME_OUT_INDEX);

const getRandomPhotos = (photos) => [...photos]
  .sort(() => Math.random() - Math.random())
  .slice(PhotoAmountRules.min, PhotoAmountRules.max);

const sortByComments = (photos) => [...photos]
  .sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const getFilteredPhotos = (photos, filterName) => {
  switch (filterName) {
    case 'filter-random':
      return getRandomPhotos(photos);
    case 'filter-discussed':
      return sortByComments(photos);
    default:
      return [...photos];
  }
};

const setFilters = (photos) => {
  const currentPhotos = photos;
  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersButtons.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      const activeFilterButton = imgFiltersButtons.querySelector('.img-filters__button--active');
      if (activeFilterButton) {
        activeFilterButton.classList.remove('img-filters__button--active');
      }
      evt.target.classList.add('img-filters__button--active');
      debouncedRender(getFilteredPhotos(photos, evt.target.id));
    }
  });

  createMiniatures(currentPhotos);
};

export { setFilters, imgFilters };
