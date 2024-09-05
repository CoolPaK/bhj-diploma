/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const  {url, data, method, callback } = options;

    //Формирования строки запроса для метода GET
    if (method === 'GET' && data) {
        const queryString = URLSearchParams(data).toString();
        xhr.open(method, `${url}?${queryString}`);
    } else {
        xhr.open(method, url);
    }

    xhr.responseType = 'JSON';

    //Обработка ответа
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, xhr.response);
        } else {
            callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
        }
    };

    xhr.onerror = () => {
        callback(new Error('Сетевая ошибка'));
    };

    //Отправка данных
    if (method !== 'GET' && data) {
        const formData = new formData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        xhr.send(formData);
    } else {
        xhr.send();
    }
};
