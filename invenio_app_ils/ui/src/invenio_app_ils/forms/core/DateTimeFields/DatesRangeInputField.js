import React from 'react';
import PropTypes from 'prop-types';
import { CalendarInputField } from './CalendarInputField';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

export class DatesRangeInputField extends React.Component {
  renderFormField = props => {
    return (
      <DatesRangeInput
        clearable
        closable
        autoComplete="off"
        id={this.props.fieldPath}
        iconPosition="left"
        name={this.props.fieldPath}
        error={props.error}
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={`${props.value}`}
        dateFormat="YYYY-MM-DD"
        onBlur={props.form.handleBlur}
        onChange={props.onChange}
      />
    );
  };

  render() {
    return (
      <CalendarInputField
        fieldPath={this.props.fieldPath}
        component={this.renderFormField}
      />
    );
  }
}

DatesRangeInputField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

DatesRangeInputField.defaultProps = {
  label: '',
  placeholder: '',
};
