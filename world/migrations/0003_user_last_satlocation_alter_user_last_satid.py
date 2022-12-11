# Generated by Django 4.1.2 on 2022-12-11 18:40

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0002_user_last_satid'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_satLocation',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326, verbose_name='Last Satellite Location'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_satId',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Last Satellite ID'),
        ),
    ]
