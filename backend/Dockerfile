FROM python:3.10-slim

# Evita que Python escriba archivos .pyc y almacene en búfer las salidas
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copiar e instalar las dependencias de Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del backend al contenedor
COPY . /app/

EXPOSE 8000