
# !/usr/bin/python
# -*- coding: utf-8 -*-

from peewee import JOIN_INNER
from models.database.tables import phones
from models.database.tables import groups
from models.database.driver.Groups import SysGroups

class SysPhones:
    def __init__(self, _id=None,
                 groups_id=None, title=None, phone=None):
        self._id = _id
        self.groups_id = groups_id
        self.title = title
        self.phone = phone

    def insert(self):
        try:
            id = phones.insert(groups=self.groups_id, title=self.title, phone=self.phone).execute()
            return id
        except Exception, e:
            print (e)
            return 0

    def search(self):
        try:
            phone = phones.select().where(phones.groups == self.groups_id)
            list_ = []
            for info in phone:
                list_.append({"id": info.id, "groups_id": info.groups_id, "title": info.title,
                              "phone": info.phone})
            return list_
        except Exception, e:
            print e
            return {}

    def search_phone_uni(self):
        try:
            info = phones.get(phones.groups == self.groups_id)
            return {"phone":info.phone}
        except Exception, e:
            print e
            return {}

    def search_groups_phone(self):
        try:
            groups = SysGroups().search_all()
            list_ = []
            for group in groups:
                list_phone = []
                phone = phones.select().where(phones.groups == group['id'])
                for info in phone:
                    list_phone.append({"title": info.title, "phone": info.phone})
                list_.append({"group_name":group['name'],"group_id":group['id'],"list_phone":list_phone})
            # print list_phone
            return list_
        except Exception, e:
            print e
            return {}

    def update(self):
        try:
            phones.update(title=self.title, phone=self.phone).where(phones.id == self._id).execute()
            return True
        except Exception, e:
            print (e)
            return False

    def update_university(self):
        try:
            phones.update(phone=self.phone).where(phones.groups == self.groups_id).execute()
            return True
        except Exception, e:
            print (e)
            return False


    def delete(self):
        try:
            phones().delete().where(phones.id == self._id).execute()
            return True
        except Exception, e:
            print e
            return False

    def delete_group(self):
        try:
            phones().delete().where(phones.groups == self.groups_id).execute()
            return True
        except Exception, e:
            print e
            return False