#!/bin/bash

echo "Running Django migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Starting Gunicorn..."
gunicorn expensetracker.wsgi:application --bind=0.0.0.0:$PORT --timeout 600