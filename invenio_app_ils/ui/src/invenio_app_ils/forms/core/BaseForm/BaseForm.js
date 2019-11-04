import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, getIn } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { Form, Button, Grid, Header, Container } from 'semantic-ui-react';
import { ES_DELAY } from '../../../common/config';
import { ErrorMessage } from '../ErrorMessage';

export class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.initialValues = props.initialValues;
    this.successSubmitMessage = props.successSubmitMessage;
    this.successCallback = props.successCallback;
    this.createApiMethod = props.createApiMethod;
    this.editApiMethod = props.editApiMethod;
    this.title = props.title;
    this.pid = props.pid;
    this.validationSchema = props.validationSchema;
  }

  submitSerializer = values => {
    const { _submitButton, ...rawValues } = values;
    const serializedValues = this.props.submitSerializer
      ? this.props.submitSerializer(rawValues)
      : { ...rawValues };
    return [serializedValues, _submitButton];
  };

  onSubmit = async (values, actions) => {
    const [submittingValues, submitButton] = this.submitSerializer(values);
    try {
      actions.setSubmitting(true);
      const response = this.pid
        ? await this.editApiMethod(this.pid, submittingValues)
        : await this.createApiMethod(submittingValues);

      setTimeout(() => {
        this.props.sendSuccessNotification(
          'Success!',
          this.successSubmitMessage
        );
        if (this.successCallback) {
          this.successCallback(response, submitButton);
        }
      }, ES_DELAY);
    } catch (error) {
      const errors = getIn(error, 'response.data.errors', []);

      if (isEmpty(errors)) {
        const message = getIn(error, 'response.data.message', null);
        if (message) {
          actions.setSubmitting(false);
          actions.setErrors({ message });
        } else {
          throw error;
        }
      } else {
        const errorData = error.response.data;
        const payload = {};
        for (const fieldError of errorData.errors) {
          payload[fieldError.field] = fieldError.message;
        }
        actions.setErrors(payload);
        actions.setSubmitting(false);
      }
    }
  };

  submitForm = (event, buttonName, submitForm, values) => {
    if (values) {
      values._submitButton = buttonName;
    }
    submitForm();
  };

  renderButtons = (isSubmitting, submitForm, values) => {
    const buttons = getIn(this.props, 'buttons', []);

    return (
      <>
        {buttons.map(({ name, ...props }) => (
          <Button
            key={name}
            name={name}
            disabled={isSubmitting}
            type="button"
            onClick={(event, button) =>
              this.submitForm(event, button.name, submitForm, values)
            }
            {...props}
          />
        ))}
      </>
    );
  };

  render() {
    const { buttons } = this.props;
    return (
      <Container>
        {this.title && (
          <Grid>
            <Grid.Row centered>
              <Header>{this.title}</Header>
            </Grid.Row>
          </Grid>
        )}
        <Formik
          initialValues={this.initialValues}
          onSubmit={this.props.onSubmit || this.onSubmit}
          validationSchema={this.validationSchema}
          render={({ isSubmitting, handleSubmit, submitForm, values }) => (
            <Form
              onSubmit={event =>
                this.submitForm(event, 'submit', submitForm, values)
              }
              loading={isSubmitting}
            >
              <ErrorMessage />
              {this.props.children}
              {buttons ? (
                this.renderButtons(isSubmitting, submitForm, values)
              ) : (
                <Button
                  color="green"
                  disabled={isSubmitting}
                  name="submit"
                  type="submit"
                  content="Submit"
                />
              )}
            </Form>
          )}
        />
      </Container>
    );
  }
}

BaseForm.propTypes = {
  initialValues: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  successCallback: PropTypes.func,
  createApiMethod: PropTypes.func,
  editApiMethod: PropTypes.func,
  submitSerializer: PropTypes.func,
  title: PropTypes.string,
  pid: PropTypes.string,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};
