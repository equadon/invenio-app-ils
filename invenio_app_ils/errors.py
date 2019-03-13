# -*- coding: utf-8 -*-
#
# Copyright (C) 2019 CERN.
#
# Invenio-App-Ils is free software; you can redistribute it and/or modify
# it under the terms of the MIT License; see LICENSE file for more details.

"""ILS exceptions."""

import json

from flask import current_app
from invenio_rest.errors import RESTException


class IlsException(RESTException):
    """Base Exception for ILS module, inherit, don't raise."""

    code = 400

    @property
    def name(self):
        """The status name."""
        return type(self).__name__

    def __init__(self, **kwargs):
        """Initialize exception."""
        super(IlsException, self).__init__(**kwargs)

    def get_response(self, environ=None, **kwargs):
        """Intercept response to add info and log the error."""
        resp = super(IlsException, self).get_response(environ=environ)
        data = json.loads(resp.data.decode('utf-8'))
        data["error_module"] = "ILS"
        data["error_class"] = self.name
        resp.data = json.dumps(data)
        current_app.logger.exception(self)
        return resp


class UnauthorizedSearch(IlsException):
    """The user performing the search is not authorized."""

    code = 403
    description = "Search `{query}` not allowed by `patron_pid:{pid}`"

    def __init__(self, query, patron_pid, **kwargs):
        """Initialize UnauthorizedSearch exception.

        :param query: Unauthorized search query.
        :param patron_pid: Patron that performed the unauthorized search.
        """
        super(UnauthorizedSearch, self).__init__(**kwargs)
        self.description = self.description.format(query=query, pid=patron_pid)


class InvalidSearchQuery(IlsException):
    """Invalid query syntax."""

    description = "Invalid query syntax: '{query}'"

    def __init__(self, query, **kwargs):
        """Initialize UnauthorizedSearch exception.

        :param query: Invalid search query.
        """
        super(InvalidSearchQuery, self).__init__(**kwargs)
        self.description = self.description.format(query=query)


class PatronNotFound(IlsException):
    """A patron could not be found."""

    code = 404
    description = "Patron with PID `{patron_pid}` was not found."

    def __init__(self, patron_pid, **kwargs):
        """Initialize PatronNotFound exception."""
        super(PatronNotFound, self).__init__(**kwargs)
        self.description = self.description.format(patron_pid=patron_pid)


class PatronHasLoanOnItem(IlsException):
    """A patron already has an active loan or a loan request on an item."""

    description = ("Patron `patron_pid:{patron_pid}` already has an active loan"
                   " or a loan request on item `item_pid{item_pid}`")

    def __init__(self, patron_pid, item_pid, **kwargs):
        """Initialize PatronHasActiveLoanOnItem exception.

        :param loan_params: Loan request parameters.
        :param prop: Missing property from loan request.
        """
        super(PatronHasLoanOnItem, self).__init__(**kwargs)
        self.description = self.description.format(
            patron_pid=patron_pid, item_pid=item_pid)


class NotImplementedIls(IlsException):
    """Exception raised when function is not implemented."""

    description = (
        "Function is not implemented. Implement this function in your module "
        "and pass it to the config variable"
    )

    def __init__(self, config_variable=None, **kwargs):
        """Initialize exception."""
        super(NotImplementedIls, self).__init__(**kwargs)
        self.description = "{} '{}'".format(self.description, config_variable)
