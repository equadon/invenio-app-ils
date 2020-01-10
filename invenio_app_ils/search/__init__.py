# -*- coding: utf-8 -*-
#
# Copyright (C) 2018 CERN.
#
# invenio-app-ils is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Invenio App ILS search module."""

from werkzeug.datastructures import MultiDict


def multi_search_factory(self, search):
    """Search factory."""
    return search, MultiDict()
