import os
import psycopg2
from flask import Flask, jsonify

app = Flask(__name__)

# Настроим подключение к базе данных PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL")


@app.route('/data', methods=['GET'])
def get_data():
    # Устанавливаем соединение с базой данных и создаем курсор
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # Выполняем запрос
    cur.execute("SELECT * FROM employers_2unit")  # Замените на вашу таблицу
    rows = cur.fetchall()

    # Закрываем соединение
    cur.close()
    conn.close()

    # Преобразуем строки в формат JSON
    return jsonify(rows)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
