FROM python:3.8

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app
COPY ./django_audio_manager /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt
