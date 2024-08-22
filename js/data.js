// import {getRandomElement, getRandomInteger} from './util.js';

// // Список констант
// const REVIEWS = [
//   'Всё отлично!',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];

// const NAMES = [
//   'Эрик', 'Дарья', 'Дмитрий', 'Раиса', 'Роберт', 'Софья', 'Шарль', 'Абрам',
//   'Глория', 'Нестор', 'Герман', 'Эмма', 'Стефан', 'Эдуард', 'Диана', 'Гелена',
//   'Евгения', 'Биргит', 'Яэль', 'Чара', 'Глафира', 'Ольга', 'Геннадий', 'Устин', 'Филипп'
// ];

// const DESCRIPTIONS = [
//   'Красивый закат над морем.',
//   'Уютное кафе в центре города.',
//   'Горы в тумане на рассвете.',
//   'Старинный замок на фоне голубого неба.',
//   'Цветущий сад весной.',
//   'Вечерний город с огнями.'
// ];

// const Like = {
//   MIN: 15,
//   MAX: 200
// };

// const Avatar = {
//   MIN: 1,
//   MAX: 6
// };

// const Comment = {
//   MIN: 0,
//   MAX: 30
// };

// const NUMBER_PHOTOS = 25;


// const createRandomMessage = () => {
//   let arr = [];
//   return () => {
//     const randomNumberSentences = getRandomInteger(1, 2);
//     const array = [];
//     arr = [];
//     for (let i = 0; i < randomNumberSentences; i++) {
//       let randomIndex;
//       do {
//         randomIndex = Math.floor(Math.random() * REVIEWS.length);
//       } while (array.includes(randomIndex));

//       array.push(randomIndex);
//       arr.push(REVIEWS[randomIndex]);
//     }

//     const newMessage = arr.join(' ');
//     return newMessage;
//   };
// };

// const message = createRandomMessage();

// const createComment = () => ({
//   id: getRandomInteger(1, 100),
//   avatar: `img/avatar-${getRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`,
//   message: message(),
//   name: getRandomElement(NAMES)
// });

// const createComments = () => {
//   const numComments = getRandomInteger(Comment.MIN, Comment.MAX);
//   return Array.from({ length: numComments }, createComment);
// };

// const createPhoto = (id) => ({
//   id,
//   url: `photos/${id}.jpg`,
//   likes: getRandomInteger(Like.MIN, Like.MAX),
//   description: getRandomElement(DESCRIPTIONS),
//   comments: createComments()
// });

// const createPhotos = () => Array.from({ length: NUMBER_PHOTOS }, (item, index) => createPhoto(index + 1));


// export { createPhotos };
