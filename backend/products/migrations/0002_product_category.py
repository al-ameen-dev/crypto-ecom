# Generated by Django 4.1.7 on 2023-03-05 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(default='watch', max_length=100),
            preserve_default=False,
        ),
    ]
