#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.web
from models.database.driver.Groups import SysGroups
from models.database.driver.Phones import SysPhones


class ViewHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        print("get_View")
        self.dict_ = {}
        phone_university = SysPhones(groups_id=1).search_phone_uni()
        self.dict_['phone_university'] = phone_university
        groups_phone = SysPhones().search_groups_phone()
        self.dict_['groups_phone'] = groups_phone
        self.dict_['len_groups_phone'] = groups_phone.__len__()
        self.render("View.html", **self.dict_)

    def post(self, *args, **kwargs):
        print("post_Update")
        fun = self.get_argument('fun', '')
        if fun == 'show_table':
            id_table = self.get_argument('id_table', '')
            table = SysPhones(groups_id=id_table).search()
            response_ = {'table': table}
            print 'response_', response_
            self.write(response_)