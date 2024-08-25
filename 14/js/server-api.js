const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу.',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз.',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const fetchData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

//Просто проверка ---->

// -----> const sendData = (formData) => fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
//   method: 'POST',
//   body: formData,
// })
//   .then((response) => {
//     console.log('Response status:', response.status); // Логируем статус ответа
//     if (!response.ok) {
//       throw new Error(`${response.status}: ${response.statusText}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log('Server response data:', data); // Логируем ответ сервера
//     return data;
//   });

export { fetchData, sendData };
