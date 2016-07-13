# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-12 22:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bike_donations', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bike',
            old_name='bike_type',
            new_name='bikeType',
        ),
        migrations.RenameField(
            model_name='bike',
            old_name='bike_brand',
            new_name='brand',
        ),
        migrations.RenameField(
            model_name='bike',
            old_name='bike_cosmetic',
            new_name='cosmetic',
        ),
        migrations.RenameField(
            model_name='bike',
            old_name='bike_features',
            new_name='features',
        ),
        migrations.RenameField(
            model_name='bike',
            old_name='bike_frame',
            new_name='frame',
        ),
        migrations.RenameField(
            model_name='bike',
            old_name='bike_price',
            new_name='price',
        ),
        migrations.RenameField(
            model_name='bike',
            old_name='bike_wheel',
            new_name='wheels',
        ),
    ]