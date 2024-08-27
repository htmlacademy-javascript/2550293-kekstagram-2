import { imgPreview } from './util.js';
const baseEffectConfig = {
  range: [0, 1],
  step: 0.1,
  format: (value) => value,
};

const effectsConfig = {
  none: {
    filter: 'none',
    ...baseEffectConfig,
  },
  chrome: {
    filter: 'grayscale',
    ...baseEffectConfig,
  },
  sepia: {
    filter: 'sepia',
    ...baseEffectConfig,
  },
  heat: {
    filter: 'brightness',
    range: [1, 3],
    step: 0.1,
    format: (value) => value,
  },
  marvin: {
    filter: 'invert',
    range: [0, 100],
    step: 1,
    format: (value) => `${value}%`,
  },
  phobos: {
    filter: 'blur',
    range: [0, 3],
    step: 0.1,
    format: (value) => `${value}px`,
  },
};

const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

effectLevelContainer.classList.add('hidden');

const defaultEffect = effectsConfig.none;

const createSlider = (effect) => {
  noUiSlider.create(slider, {
    start: effect.range[1],
    range: {
      min: effect.range[0],
      max: effect.range[1],
    },
    step: effect.step,
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

const updateSlider = (effect) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: effect.range[0],
      max: effect.range[1],
    },
    start: effect.range[1],
    step: effect.step,
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

const applyEffect = (effectName) => {
  const effect = effectsConfig[effectName];
  if (effect) {
    updateSlider(effect);

    const initialValue = slider.noUiSlider.get();
    imgPreview.style.filter = `${effect.filter}(${effect.format(initialValue)})`;
    effectLevelValue.value = initialValue;

    slider.noUiSlider.off('update');
    slider.noUiSlider.on('update', (values, handle) => {
      const updatedValue = Number(values[handle]);
      imgPreview.style.filter = `${effect.filter}(${effect.format(updatedValue)})`;
      effectLevelValue.value = updatedValue;
    });
  }
};

const resetEffect = () => {
  imgPreview.style.filter = '';
  effectLevelValue.value = '';
  effectLevelContainer.classList.add('hidden');
};

effectsContainer.addEventListener('click', (evt) => {
  const target = evt.target;

  if (target.classList.contains('effects__radio')) {
    if (target.id === 'effect-none') {
      resetEffect();
    } else {
      effectLevelContainer.classList.remove('hidden');
      applyEffect(target.value);
    }
  }
});

createSlider(defaultEffect);

export { resetEffect };
