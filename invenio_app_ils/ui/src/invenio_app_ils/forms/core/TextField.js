import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

export class TextField extends Component {
  constructor(props) {
    super(props);

    const { fieldPath, optimized, ...uiProps } = props;
    this.fieldPath = fieldPath;
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
      form: { values, handleChange, handleBlur, errors },
    } = props;
    return (
      <Form.Field>
        <Form.TextArea
          id={this.fieldPath}
          name={this.fieldPath}
          onChange={handleChange}
          onBlur={handleBlur}
          value={getIn(values, this.fieldPath, '')}
          error={this.renderError(errors, this.fieldPath)}
          {...this.uiProps}
        ></Form.TextArea>
      </Form.Field>
    );
  };

  render() {
    const FormikField = this.props.optimized ? FastField : Field;
    return (
      <FormikField name={this.fieldPath} component={this.renderFormField} />
    );
  }
}

TextField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  optimized: PropTypes.bool,
};

TextField.defaultProps = {
  optimized: true,
};
