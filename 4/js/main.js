const REVIEW = ['Всё отлично!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!' ];
const NAME = [
  'Эрик',
  'Дарья',
  'Дмитрий',
  'Раиса',
  'Роберт',
  'Софья',
  'Шарль',
  'Абрам',
  'Глория',
  'Нестор',
  'Герман',
  'Эмма',
  'Стефан',
  'Эдуард',
  'Диана',
  'Гелена',
  'Евгения',
  'Биргит',
  'Яэль',
  'Чара',
  'Глафира',
  'Ольга',
  'Геннадий',
  'Устин',
  'Филипп'];
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const usedIndexes = [];
function getRandomNumberFrom1To25() {
  let randomIndex;
  do {
    randomIndex = getRandomInteger(1, 25);
  } while (usedIndexes.includes(randomIndex));
  usedIndexes.push(randomIndex);
  return randomIndex;
}

function getRandomUrl() {
  const index = getRandomNumberFrom1To25();
  const url = `photos/${index}.jpg`;
  return url;
}

function getRandomId() {
  const id = getRandomNumberFrom1To25();
  return id;
}

const createRandomMessage = () => {
  let arr = [];
  return () => {
    const randomNumberSentences = getRandomInteger(1, 2);
    const array = [];
    arr = [];
    for (let i = 0; i < randomNumberSentences; i++) {
      let randomIndex;
      // Проверка, чтобы значение randomIndex не повторялось. В случае, если повторяется, то все перезапустится
      do {
        randomIndex = Math.floor(Math.random() * REVIEW.length);
      } while (array.includes(randomIndex));

      array.push(randomIndex);
      arr.push(REVIEW[randomIndex]);
    }

    const newMessage = arr.join(' ');
    return newMessage;
  };
};

const message = createRandomMessage();

//Создание счетчика от 1 до бесконечности.
function createIdCounter() {
  let count = 0;
  function idCounter() {
    count++;
    return count;
  }
  return idCounter;
}

const incrementCounter = createIdCounter();

const createObjects = () => ([
  {
    id: getRandomId(),
    url: getRandomUrl(),
    likes: getRandomInteger(15, 200),
    comments: [{
      id: incrementCounter(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message(),
      name: NAME[getRandomInteger(0, 25)],
    },
    ],
  }]
);

for (let i = 0; i < 25; i++) {
  createObjects();
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(createObjects(), null, 2));
}
