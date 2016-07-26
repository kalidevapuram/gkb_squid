
web: python gkb_squid/manage.py collectstatic --noinput; bin/gunicorn_django --workers=4 --bind=0.0.0.0:$PORT gkb_squid/settings.py