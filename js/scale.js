import { imgPreview } from './util.js';
const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const inputScaleValue = document.querySelector('.scale__control--value');

const setScale = (value) => {
  inputScaleValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / Scale.MAX})`;
};

const updateScale = (direction) => {
  let currentValue = parseInt(inputScaleValue.value, 10);

  if (direction === 'smaller' && currentValue > Scale.MIN) {
    currentValue -= Scale.STEP;
  } else if (direction === 'bigger' && currentValue < Scale.MAX) {
    currentValue += Scale.STEP;
  }

  setScale(currentValue);
};


const resetScale = () => {
  setScale(Scale.DEFAULT);
};

buttonScaleSmaller.addEventListener('click', () => updateScale('smaller'));
buttonScaleBigger.addEventListener('click', () => updateScale('bigger'));

export { resetScale };

