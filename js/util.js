// const getRandomInteger = (min, max) => {
//   const lower = Math.ceil(Math.min(min, max));
//   const upper = Math.floor(Math.max(min, max));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';
export { isEscapeKey };
