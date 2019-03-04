# -*- coding: utf-8 -*-
#
# Copyright (C) 2018 CERN.
#
# invenio-app-ils is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Test errors."""

import pytest

from invenio_app_ils.errors import InvalidSearchQuery, NotImplementedIls, \
    PatronHasLoanOnItem, PatronNotFound, UnauthorizedSearch


def test_unauthorized_search(app):
    """Test UnauthorizedSearch."""
    query = "test query"
    pid = "1"
    msg = "Search `{query}` not allowed by `patron_pid:{patron_pid}`"
    with pytest.raises(UnauthorizedSearch) as ex:
        raise UnauthorizedSearch(query=query, patron_pid=pid)
    assert ex.value.code == UnauthorizedSearch.code
    assert ex.value.description == msg.format(query=query, patron_pid=pid)


def test_invalid_search_query(app):
    """Test InvalidSearchQuery."""
    query = "invalid query"
    msg = "Invalid query syntax: '{query}'"
    with pytest.raises(InvalidSearchQuery) as ex:
        raise InvalidSearchQuery(query=query)
    assert ex.value.code == InvalidSearchQuery.code
    assert ex.value.description == msg.format(query=query)


def test_not_implemented(app):
    """Test NotImplementedIls."""
    config_variable = 'CONFIG_VAR'
    msg = (
        "Function is not implemented. Implement this function in your module "
        "and pass it to the config variable '{}'".format(config_variable)
    )
    with pytest.raises(NotImplementedIls) as ex:
        raise NotImplementedIls(config_variable="CONFIG_VAR")
    assert ex.value.code == NotImplementedIls.code
    assert ex.value.description == msg


def test_patron_not_found(app):
    """Test PatronNotFound."""
    patron_pid = "1"
    msg = "Patron with PID `{patron_pid}` was not found."
    with pytest.raises(PatronNotFound) as ex:
        raise PatronNotFound(patron_pid)
    assert ex.value.code == PatronNotFound.code
    assert ex.value.description == msg.format(patron_pid=patron_pid)


def test_patron_has_loan_on_item(app):
    """Test PatronHasLoanOnItem."""
    patron_pid = "1"
    item_pid = "2"
    msg = ("Patron `patron_pid:{patron_pid}` already has an active loan"
           " or a loan request on item `item_pid{item_pid}`")
    with pytest.raises(PatronHasLoanOnItem) as ex:
        raise PatronHasLoanOnItem(patron_pid, item_pid)
    assert ex.value.code == PatronHasLoanOnItem.code
    assert ex.value.description == msg.format(
        patron_pid=patron_pid, item_pid=item_pid)
