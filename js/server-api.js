const URL_FOR_RECEIPT = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const ERROR_MESSAGE = 'Не удалось загрузить данные';

const fetchData = () => fetch(`${URL_FOR_RECEIPT}`)
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error(ERROR_MESSAGE)); // Чтобы остановить дальнейшую обработку
    }
    return response.json();
  });

export { fetchData };
