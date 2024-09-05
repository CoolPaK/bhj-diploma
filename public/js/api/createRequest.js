/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = { url, data, method, callback }) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (options.method === "GET") {
        if (typeof (options.data) === "string") {
            options.url += "/" + options.data
        }
        else {
            options.url += "?";
            for (prop in options.data) {
                options.url += prop + "=" + (options.data)[prop] + "&";
            }
        }
    }
    
    else {
        formData = new FormData;

        for (prop in options.data) {
            formData.append(prop, (options.data)[prop]);
        }
    }
    xhr.open(options.method, options.url);


    if (options.method === "GET") {
        xhr.send();
    }
    else {
        xhr.send(formData);
    }

    
    xhr.addEventListener("load", (e) => {
        if (xhr.response.success) {
            options.callback(null, xhr.response);
        }
        else {
            options.callback(new Error(xhr.response.error), null);
        }
    });

    xhr.addEventListener("error", (e) => {
        options.callback(new Error(xhr.statusText), null);
    });

};