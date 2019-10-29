import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

export class BooleanField extends Component {
  constructor(props) {
    super(props);

    const { fieldPath, label, optimized, ...uiProps } = props;
    this.fieldPath = fieldPath;
    this.label = label;
    this.optimized = optimized;
    this.uiProps = uiProps;
  }

  renderError(errors, name, direction = 'left') {
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
      form: { values, handleChange, handleBlur, errors },
    } = props;
    return (
      <Form.Group inline>
        <label htmlFor={this.fieldPath}>{this.label}</label>
        <Form.Checkbox
          id={this.fieldPath}
          name={this.fieldPath}
          onChange={handleChange}
          onBlur={handleBlur}
          checked={getIn(values, this.fieldPath, '') || false}
          error={this.renderError(errors, this.fieldPath)}
          {...this.uiProps}
        ></Form.Checkbox>
      </Form.Group>
    );
  };
  render() {
    const FormikField = this.props.optimized ? FastField : Field;
    return (
      <FormikField name={this.fieldPath} component={this.renderFormField} />
    );
  }
}

BooleanField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  optimized: PropTypes.bool,
};

BooleanField.defaultProps = {
  label: '',
  optimized: true,
};
