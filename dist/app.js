"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Функция для получения данных из API
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:5001/data'); // Ваш API URL
            const data = yield response.json(); // Преобразуем ответ в JSON
            // Проверка источника данных
            if (data.source === 'cache') {
                displayData(data.data, 'Данные получены из кеша');
            }
            else {
                displayData(data.data, 'Данные получены из другого источника');
            }
        }
        catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    });
}
// Функция для отображения данных на странице
function displayData(data, sourceLabel) {
    const container = document.getElementById('data-container');
    if (container) {
        // Отображаем заголовок с источником данных
        const sourceHeader = `<h2>${sourceLabel}</h2>`;
        // Преобразуем данные в HTML
        container.innerHTML = sourceHeader + data.map(item => `
            <div class="data-item">
                <p><strong>ID:</strong> ${item[0]}</p>  <!-- ID -->
                <p><strong>Name:</strong> ${item[1]}</p> <!-- Name -->
                <p><strong>Value:</strong> ${item[2]}</p> <!-- Value -->
            </div>
        `).join('');
    }
}
// Вызов функции для получения данных при загрузке страницы
window.onload = fetchData;
