const REVIEWS = [
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Эрик', 'Дарья', 'Дмитрий', 'Раиса', 'Роберт', 'Софья', 'Шарль', 'Абрам',
  'Глория', 'Нестор', 'Герман', 'Эмма', 'Стефан', 'Эдуард', 'Диана', 'Гелена',
  'Евгения', 'Биргит', 'Яэль', 'Чара', 'Глафира', 'Ольга', 'Геннадий', 'Устин', 'Филипп'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdGenerator = () => {
  const randomNumberFrom1To25 = Array.from({ length: 25 }, (v, k) => k + 1);

  const getRandomId = () => {
    const randomIndex = getRandomInteger(0, randomNumberFrom1To25.length - 1);
    const id = randomNumberFrom1To25[randomIndex];
    randomNumberFrom1To25.splice(randomIndex, 1);
    return id;
  };

  const getRandomIdAndUrl = () => {
    const id = getRandomId();
    return { id, url: `photos/${id}.jpg` };
  };

  return { getRandomIdAndUrl };
};

const randomIdGenerator = createRandomIdGenerator();

const createRandomMessage = () => {
  let arr = [];
  return () => {
    const randomNumberSentences = getRandomInteger(1, 2);
    const array = [];
    arr = [];
    for (let i = 0; i < randomNumberSentences; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * REVIEWS.length);
      } while (array.includes(randomIndex));

      array.push(randomIndex);
      arr.push(REVIEWS[randomIndex]);
    }

    const newMessage = arr.join(' ');
    return newMessage;
  };
};

const message = createRandomMessage();

const createComments = () => {
  const numComments = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < numComments; i++) {
    comments.push({
      id: getRandomInteger(1, 100),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message(),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    });
  }
  return comments;
};


const MIN_NUMBERS_LIKES = 15;
const MAX_NUMBERS_LIKES = 200;

const createPhoto = () => {
  const { id, url } = randomIdGenerator.getRandomIdAndUrl();
  return {
    id,
    url,
    likes: getRandomInteger(MIN_NUMBERS_LIKES, MAX_NUMBERS_LIKES),
    comments: createComments()
  };
};

const NUMBER_PHOTOS = 25;

const photos = Array.from({ length: NUMBER_PHOTOS }, createPhoto);
// eslint-disable-next-line no-console
console.log(JSON.stringify(photos, null, 2));
