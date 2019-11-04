import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Accordion, Form, Icon } from 'semantic-ui-react';

export class AccordionField extends Component {
  constructor(props) {
    super(props);
    this.fieldPath = props.fieldPath;
    this.label = props.label;
    this.required = props.required;
    this.state = { active: false };
    this.iconActive = (
      <Icon
        name="angle down"
        color="orange"
        size="large"
        style={{ float: 'right' }}
      />
    );
    this.iconInActive = (
      <Icon
        name="angle right"
        color="orange"
        size="large"
        style={{ float: 'right' }}
      />
    );
  }

  handleClick = showContent => {
    this.setState({ active: !showContent });
  };

  hasError(errors) {
    if (this.fieldPath in errors) {
      return true;
    }
    for (const errorPath in errors) {
      if (errorPath.startsWith(this.props.fieldPath)) {
        return true;
      }
    }
    return false;
  }

  renderAccordion = props => {
    const {
      form: { errors, status },
    } = props;
    const { active } = this.state;
    const hasError = status ? this.hasError(status) : this.hasError(errors);
    const showContent = active;

    return (
      <Accordion fluid index={0}>
        <Form.Field required={this.required}>
          <Accordion.Title
            as="label"
            onClick={() => this.handleClick(showContent)}
          >
            {hasError && <Icon name="warning sign" color="red" />}
            <label>{this.label}</label>
            <span>{showContent ? this.iconActive : this.iconInActive}</span>
          </Accordion.Title>
          <Accordion.Content active={showContent}>
            {showContent && this.props.content}
          </Accordion.Content>
        </Form.Field>
      </Accordion>
    );
  };

  render() {
    return <Field name={this.fieldPath} component={this.renderAccordion} />;
  }
}

AccordionField.propTypes = {
  content: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

AccordionField.defaultProps = {
  label: '',
  required: false,
};
