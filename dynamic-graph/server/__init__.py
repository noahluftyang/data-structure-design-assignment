#!/usr/bin/env python3

from flask import Flask


def create_server():
    server = Flask(__name__)

    @server.route('/')
    def hello_world():
        return 'hello world123'

    return server
