# !/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.ioloop
import os
from urls import *



application = tornado.web.Application(
    handlers=url_pattern,
    template_path=os.path.join(os.path.dirname(__file__), "template"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),
)

if __name__ == "__main__":
    application.listen(8889)
    tornado.ioloop.IOLoop.current().start()
