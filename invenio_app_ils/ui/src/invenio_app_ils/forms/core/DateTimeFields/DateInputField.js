import React from 'react';
import PropTypes from 'prop-types';
import { CalendarInputField } from './CalendarInputField';
import {
  DateInput,
} from 'semantic-ui-calendar-react';

export class DateInputField extends React.Component {
  renderFormField = props => {
    return (
      <DateInput
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

DateInputField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

DateInputField.defaultProps = {
  label: '',
  placeholder: '',
};
