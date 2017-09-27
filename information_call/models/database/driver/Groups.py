__author__ = 'Destiny'

# !/usr/bin/python
# -*- coding: utf-8 -*-

from models.database.tables import groups

class SysGroups:
    def __init__(self, _id=None, name=None):
        self._id = _id
        self.name = name

    def insert(self):
        try:
            y = self.search_by_name()
            if y == {} :
                id = groups.insert(name=self.name).execute()
                return id
            else:
                return 0
        except Exception, e:
            print (e)
            return 0

    def search_all(self):
        try:
            phone = groups.select().where(groups.name != u'\u0634\u0645\u0627\u0631\u0647 \u06cc \u0627\u0635\u0644\u06cc \u062f\u0627\u0646\u0634\u06af\u0627\u0647')
            list_ = []
            for info in phone:
                list_.append({"id": info.id, "name": info.name,})
            return list_
        except Exception, e:
            print e
            return {}

    def search_by_id(self):
        try:
            info = groups.get(groups.id == self._id)
            return {"id": info.id, "name": info.name}
        except Exception, e:
            print e
            return {}

    def search_by_name(self):
        try:
            info = groups.get(groups.name == self.name)
            return {"id": info.id, "name": info.name}
        except Exception, e:
            print e
            return {}

    def update(self):
        try:
            groups.update(name=self.name).where(groups.id == self._id).execute()
            return True
        except Exception, e:
            print (e)
            return False


    def delete(self):
        try:
            groups().delete().where(groups.id == self._id).execute()
            return True
        except Exception, e:
            print e
            return False
