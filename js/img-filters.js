/*
+++№1
++++После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него скрывающий класс.
++++№2
Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:

По умолчанию — фотографии в изначальном порядке с сервера.
Случайные — 10 случайных, не повторяющихся фотографий.
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.

  5. Фильтрация изображений от других пользователей
  5.1. Доступные фильтры:

  «По умолчанию» — фотографии в изначальном порядке с сервера;
  «Случайные» — 10 случайных, не повторяющихся фотографий;
  «Обсуждаемые» — фотографии, отсортированные в порядке убывания количества комментариев.
  5.2. Блок, с помощью которого производится фильтрация фотографий,
    скрыт изначально и показывается только после получения от сервера данных об изображениях других пользователей.

  5.3. При переключении фильтров, отрисовка изображений, подходящих под новый фильтр,
    должна производиться не чаще, чем один раз 500 мс (устранение дребезга).

++++№3
При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.

++++№4
Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов,
подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.

*/

import { createMiniatures } from './create-miniatures';
import { debounce } from './util';

const PhotoAmountRules = {
  min: 0,
  max: 10,
};

const TIME_OUT_INDEX = 400;

const imgFilters = document.querySelector('.img-filters');
const defaultFilter = imgFilters.querySelector('#filter-default');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');
const imgFiltersButtons = imgFilters.querySelector('.img-filters__form');


const addActiveButtons = (...activeButtons) => {
  for(const buttons of imgFiltersButtons) {
    buttons.classList.remove('img-filters__button--active');
  }

  for(const button of activeButtons) {
    button.classList.add('img-filters__button--active');
  }
};

const renderPhotos = (photosToRender) => {
  createMiniatures(photosToRender);
};

const debouncedRender = debounce((filterFunction) => {
  renderPhotos(filterFunction());
}, TIME_OUT_INDEX);

const setFilters = (photos) => {
  const currentPhotos = photos;

  defaultFilter.addEventListener('click', () => {
    addActiveButtons(defaultFilter);
    debouncedRender(() => currentPhotos);
  });

  randomFilter.addEventListener('click', () => {
    addActiveButtons(randomFilter);
    debouncedRender(() => {
      const randomPhotos = [...photos]
        .sort(() => Math.random() - Math.random())
        .slice(PhotoAmountRules.min, PhotoAmountRules.max);
      return randomPhotos;
    });
  });

  discussedFilter.addEventListener('click', () => {
    addActiveButtons(discussedFilter);
    debouncedRender(() => {
      const discussedPhotos = [...photos]
        .sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
      return discussedPhotos;
    });
  });

  renderPhotos(currentPhotos);
};

export { setFilters, imgFilters };
