/*
+++2.1. Масштаб:

При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%,
  после нажатия на «+», значение должно стать равным 75%.
  Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
При изменении значения поля .scale__control--value изображению внутри .img-upload__preview
  должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб.
  Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

+++

2.2. Наложение эффекта на изображение:

По умолчанию должен быть выбран эффект «Оригинал».
На изображение может накладываться только один эффект.
Интенсивность эффекта регулируется перемещением ползунка в слайдере.
  Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
  Уровень эффекта записывается в поле .effect-level__value в виде числа.
  При изменении уровня интенсивности эффекта (предоставляется API слайдера),
  CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
    Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
    Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
    Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
    Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
    Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
    Для эффекта «Оригинал» CSS-стили filter удаляются.
    При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
    При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
      слайдер, CSS-стиль изображения и значение поля должны обновляться.

Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния,
  т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера,
  но и при переключении фильтров.
*/

const effectsConfig = {
  'effect-chrome': { filter: 'grayscale', range: [0, 1], step: 0.1, format: (value) => value },
  'effect-sepia': { filter: 'sepia', range: [0, 1], step: 0.1, format: (value) => value },
  'effect-heat': { filter: 'brightness', range: [1, 3], step: 0.1, format: (value) => value },
  'effect-marvin': { filter: 'invert', range: [0, 100], step: 1, format: (value) => `${value}%` },
  'effect-phobos': { filter: 'blur', range: [0, 3], step: 0.1, format: (value) => `${value}px` },
};

const slider = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

effectLevelContainer.classList.add('hidden');

noUiSlider.create(slider, {
  start: 1,
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  format: {
    to: (value) => value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

const applyEffect = (effectId) => {
  const effect = effectsConfig[effectId];
  if (effect) {
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

    const initialValue = slider.noUiSlider.get();
    imgPreview.style.filter = `${effect.filter}(${effect.format(initialValue)})`;
    effectLevelValue.value = initialValue;

    // Применение эффекта в реальном времени
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
};


effectsContainer.addEventListener('click', (evt) => {
  const target = evt.target;

  if (target.classList.contains('effects__radio')) {
    if (target.id === 'effect-none') {
      effectLevelContainer.classList.add('hidden');
      resetEffect();
    } else {
      effectLevelContainer.classList.remove('hidden');
      applyEffect(target.id);
    }
  }
});

export { resetEffect };