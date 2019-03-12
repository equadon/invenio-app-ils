# -*- coding: utf-8 -*-
#
# Copyright (C) 2018-2019 CERN.
#
# invenio-app-ils is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Resolvers common."""

from invenio_pidstore.errors import PersistentIdentifierError
from flask import current_app


def get_field_value_for_record(record_cls, record_pid, field_name):
    """Return the given field value for a given record PID."""
    record = {}
    try:
        record = record_cls.get_record_by_pid(record_pid)
    except PersistentIdentifierError as ex:
        current_app.logger.exception(ex)
        raise ex
    except AttributeError as ex:
        current_app.logger.exception(
            "The class {} does not define the method"
            " `get_record_by_pid`".format(record_cls)
        )
        raise ex

    if not record or field_name not in record:
        message = "{0} not found in record {1}".format(field_name, record_pid)
        current_app.logger.error(message)
        raise KeyError(message)

    return record[field_name]
