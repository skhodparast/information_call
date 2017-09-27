__author__ = 'Destiny'
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from peewee import *

my_database = MySQLDatabase("info_calls", host="localhost", user="root", passwd="", port=3306)


class PeeweeBaseModel(Model):
    class Meta:
        database = my_database

class groups(PeeweeBaseModel):
    id = PrimaryKeyField()
    name = CharField()

class phones(PeeweeBaseModel):
    id = PrimaryKeyField()
    groups = ForeignKeyField(groups,to_field=groups.id)
    title = CharField()
    phone = CharField()