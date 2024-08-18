
const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const inputScaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const updateScale = (direction) => {
  let currentValue = parseInt(inputScaleValue.value, 10);

  if (direction === 'smaller' && currentValue > Scale.MIN) {
    currentValue -= Scale.STEP;
  } else if (direction === 'bigger' && currentValue < Scale.MAX) {
    currentValue += Scale.STEP;
  }

  inputScaleValue.value = `${currentValue}%`;
  imgPreview.style.transform = `scale(${currentValue / Scale.MAX})`;
};

const resetScale = () => {
  inputScaleValue.value = '100%';
  imgPreview.style.transform = 'scale(1)';
};

buttonScaleSmaller.addEventListener('click', () => updateScale('smaller'));
buttonScaleBigger.addEventListener('click', () => updateScale('bigger'));

export { resetScale };

