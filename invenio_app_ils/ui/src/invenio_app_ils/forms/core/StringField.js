import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

export class StringField extends Component {
  constructor(props) {
    super(props);
    const { fieldPath, inline, optimized, ...uiProps } = props;
    this.fieldPath = fieldPath;
    this.inline = inline;
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
      form: { values, handleChange, handleBlur, errors, status },
    } = props;

    return (
      <Form.Field inline={this.inline}>
        <Form.Input
          fluid
          id={this.fieldPath}
          name={this.fieldPath}
          onChange={handleChange}
          onBlur={handleBlur}
          value={getIn(values, this.fieldPath, '')}
          error={this.renderError(status || errors, this.fieldPath)}
          {...this.uiProps}
        />
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

StringField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  optimized: PropTypes.bool,
};

StringField.defaultProps = {
  inline: false,
  optimized: true,
};
