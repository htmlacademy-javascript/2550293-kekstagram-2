import { createMiniatures } from './create-miniatures.js';
import { initGallery } from './gallery.js';
import './submit-form.js';
import { closeForm } from './submit-form.js';
import { setUserFormSubmit } from './submit-form.js';
import { fetchData } from './server-api.js';
import { uploadErrorTemplate } from './alerts.js';

fetchData()
  .then((photos) => {
    createMiniatures(photos);
    initGallery(photos);
  })
  .catch(uploadErrorTemplate);

setUserFormSubmit(closeForm);

/*++++++
№1
++++++Получение данных:
  Доработайте модуль для отрисовки фотографий так,
    чтобы в качестве данных использовались не случайно сгенерированные объекты,
    а те данные, которые вы загрузите с удалённого сервера:
      4.1. Загрузка изображений от других пользователей производится сразу после открытия страницы
        с удалённого сервера: https://31.javascript.htmlacademy.pro/kekstagram/data.


+++++Добавьте обработку возможных ошибок при загрузке.
        4.2. Если при загрузке данных с сервера произошла ошибка запроса,
        нужно показать соответствующее сообщение. Разметку сообщения,
        которая находится в блоке #data-error внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
        Сообщение удаляется со страницы через 5 секунд.
*/
