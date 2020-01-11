# django-audio-manager

A project to demonstrate the use of django to upload, view and share audio files.

## Goal

Django Audio Manager is a demonstration project showing the use of django to upload and share media files with django.

## Running

`docker-compose up`, `docker-compose up --build`, etc...

### Running for the fist time

Start the application normally with `docker-compose up`

1. Apply migrations to the database
   `docker-compose exec backend python manage.py migrate`
2. Collect static folder
   `docker-compose exec backend python manage.py collectstatic`
3. Create a root user
   `docker-compose exec backend python manage.py createsuperuser`

## Static files

In the future, collecting static files may be part of the build process
but at present it is a manual step because then the files can be somewhere
convenient to be volumed by the nginx `reverse-proxy` image.

Additionally, these files are totally unnecessary for the public facing site
and are only relevant for the admin site, which itself should be behind an IP
Whitelist or some similar protection on any production environment.

Services:

- frontend
- backend
- reverse-proxy
- db

Technologies:

- django
- django rest framework
- django rest framework jwt
- React
- material-ui
- paper-dashboard
- nginx
- postgres

## Material UI Theme - Paper Dashboard React

https://github.com/creativetimofficial/paper-dashboard-react
