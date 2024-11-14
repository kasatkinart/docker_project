import json
import os
import psycopg2
import redis
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow all domains to access the API

# Подключение к PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL")
# Подключение к Redis
REDIS_URL = os.getenv("REDIS_URL")
redis_client = redis.StrictRedis.from_url(REDIS_URL, decode_responses=True)


@app.route('/data', methods=['GET'])
def get_data():
    # Принудительно удаляем кэш перед запросом к базе данных
    redis_client.delete('employers_data')

    # Пытаемся получить данные из кэша
    cached_data = redis_client.get('employers_data')
    if cached_data:
        # Если данные есть в кэше, возвращаем их с информацией о том, что данные из кеша
        print("Данные получены из кэша")
        return jsonify({
            "source": "cache",
            "data": json.loads(cached_data)
        })

    # Если данных в кэше нет, получаем их из PostgreSQL
    print("Данные получены из базы данных")
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("SELECT * FROM employers_2unit")  # Ваш SQL запрос
    rows = cur.fetchall()

    # Сохраняем данные в кэш
    redis_client.set('employers_data', json.dumps(rows), ex=60)

    # Закрываем соединение с PostgreSQL
    cur.close()
    conn.close()

    # Отправляем данные как JSON с информацией об источнике данных
    return jsonify({
        "source": "database",
        "data": rows
    })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
