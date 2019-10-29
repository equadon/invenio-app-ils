import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IsoLanguages from 'iso-639-1';
import { SelectField } from '../core';

export class LanguagesField extends Component {
  constructor(props) {
    super(props);
    this.languageCodes = this.getLanguageCodes();
    this.fieldPath = props.fieldPath;
  }

  getLanguageCodes = () => {
    return IsoLanguages.getAllCodes().map((code, index) => ({
      text: code,
      value: code,
    }));
  };

  render() {
    return (
      <SelectField
        search
        multiple={this.props.multiple}
        label={this.props.multiple ? 'Languages' : 'Language'}
        fieldPath={this.fieldPath}
        options={this.languageCodes}
        upward={false}
      />
    );
  }
}

LanguagesField.propTypes = {
  fieldPath: PropTypes.string,
  multiple: PropTypes.bool,
};

LanguagesField.defaultProps = {
  fieldPath: 'languages',
  multiple: false,
};
