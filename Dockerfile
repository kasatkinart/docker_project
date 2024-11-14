FROM python:3.12-slim

# Установим distutils и другие необходимые пакеты
RUN apt-get update && apt-get install -y \
    python3-distutils \
    libpq-dev \
    gcc \
    python3-dev

# Установим зависимости из requirements.txt
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копируем код приложения
COPY . /app

WORKDIR /app

# Запускаем приложение
CMD ["python", "app.py"]
