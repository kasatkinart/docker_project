// Функция для получения данных из API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5001/data'); // Ваш API URL
        const data = await response.json(); // Преобразуем ответ в JSON

        // Проверка источника данных
        if (data.source === 'cache') {
            displayData(data.data, 'Данные получены из кеша');
        } else {
            displayData(data.data, 'Данные получены из другого источника');
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

// Функция для отображения данных на странице
function displayData(data: any[], sourceLabel: string) {
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
