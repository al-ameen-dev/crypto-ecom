# Generated by Django 4.1.7 on 2023-04-03 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_purchasedproduct'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchasedproduct',
            name='purchased_at',
            field=models.CharField(default='Monday, 03 April 2023 06:45:08', max_length=50),
        ),
    ]
