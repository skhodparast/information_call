#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.web
from models.database.driver.Groups import SysGroups
from models.database.driver.Phones import SysPhones

class UpdateHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        print("get_Update")
        select_qroup = SysGroups().search_all()
        university = SysPhones(groups_id=1).search()
        self.dict_ = {}
        self.dict_['select_qroup'] = select_qroup
        self.dict_['university'] = university
        print self.dict_
        self.render("Update.html", **self.dict_)

    def post(self, *args, **kwargs):
        print("post_Update")
        fun = self.get_argument('fun', '')
        if fun == 'button_phone_university':
            phone_university = self.get_argument('phone_university', '')
            answer_update = SysPhones(groups_id=1, phone=phone_university).update_university()
            response_ = {'answer_update': answer_update}
            self.write(response_)

        elif fun == 'insert_group':
            input_insert_group = self.get_argument('input_insert_group', '')
            id_group = SysGroups(name=input_insert_group).insert()
            id_group = int(id_group)
            response_ = {'id_group': id_group, 'input_insert_group': input_insert_group}
            self.write(response_)

        elif fun == 'fun_group':
            id_group = self.get_argument('id_group', '')
            name_group = SysGroups(_id=id_group).search_by_id()
            phone_group = SysPhones(groups_id=id_group).search()
            res_ = {'phone_group': phone_group, 'name_group': name_group, 'id_group': id_group}
            self.write(res_)
        elif fun == 'fun_update_insert':
            title_update_insert = self.get_argument('title_update_insert', '')
            phone_update_insert = self.get_argument('phone_update_insert', '')
            id_group_update_insert = self.get_argument('id_group_update_insert', '')
            insert = SysPhones(groups_id=id_group_update_insert, title=title_update_insert,
                               phone=phone_update_insert).insert()
            res_ = {'insert': insert}
            self.write(res_)
        elif fun == 'fun_save_update':
            id_update = self.get_argument('id_update', '')
            title_update = self.get_argument('title_update', '')
            phone_update = self.get_argument('phone_update', '')
            update = SysPhones(_id=id_update, title=title_update, phone=phone_update).update()
            res_ = {'update': update}
            self.write(res_)
        elif fun == 'fun_save_update_group':
            id_update_group = self.get_argument('id_update_group', '')
            group_update = self.get_argument('group_update', '')
            update = SysGroups(_id=id_update_group, name=group_update).update()
            res_ = {'update': update}
            self.write(res_)

    def delete(self, *args, **kwargs):
        print("delete_test1")
        fun = self.get_argument('fun', '')
        if fun == 'fun_delete':
            id_dalete = self.get_argument('id_dalete', '')
            delete = SysPhones(_id=id_dalete).delete()
            res_ = {'delete': delete}
            self.write(res_)
        elif fun == 'delete_table':
            id_delete_group = self.get_argument('id_delete_group', '')
            delete_phons = SysPhones(groups_id=id_delete_group).delete_group()
            if SysPhones(groups_id=id_delete_group).search() == []:
                SysGroups(_id=id_delete_group).delete()
                delete_group = 'true'
            else:
                delete_group = SysGroups(_id=id_delete_group).delete()
            if delete_phons == 1 and delete_group == 'true':
                res_ = {'delete': 'true'}
            else:
                res_ = {'delete': 'false'}
            self.write(res_)
