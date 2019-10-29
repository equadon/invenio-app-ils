import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

export class SelectField extends Component {
  constructor(props) {
    super(props);

    const { fieldPath, label, multiple, optimized, ...uiProps } = props;
    this.fieldPath = fieldPath;
    this.label = label;
    this.multiple = multiple;
    this.optimized = optimized;
    this.uiProps = uiProps;
  }

  renderError(errors, name, direction = 'above') {
    const error = errors[name];
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  }

  renderFormField = props => {
    const {
      form: { values, setFieldValue, handleBlur, errors },
    } = props;
    const defaultValue = getIn(this.props, 'options.0.value', '');
    return (
      <Form.Dropdown
        fluid
        selection
        searchInput={{ id: this.fieldPath }}
        label={{ children: this.label, htmlFor: this.fieldPath }}
        multiple={this.multiple}
        name={this.fieldPath}
        onChange={(event, data) => {
          setFieldValue(this.fieldPath, data.value);
        }}
        onBlur={handleBlur}
        value={getIn(values, this.fieldPath, this.multiple ? [] : defaultValue)}
        error={this.renderError(errors, this.fieldPath)}
        {...this.uiProps}
      />
    );
  };

  render() {
    const FormikField = this.props.optimized ? FastField : Field;
    return (
      <FormikField
        name={this.props.fieldPath}
        component={this.renderFormField}
      />
    );
  }
}

SelectField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  optimized: PropTypes.bool,
};

SelectField.defaultProps = {
  multiple: false,
  optimized: true,
};
