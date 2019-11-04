import React from 'react';
import PropTypes from 'prop-types';
import { Field, getIn } from 'formik';
import cloneDeep from 'lodash/cloneDeep';
import { AuthorForm } from './AuthorForm';
import {
  SubForm,
  GroupField,
  ObjectListField,
} from '../../../../../../../../../forms';

export class AuthorsField extends React.Component {
  state = {
    activeIndex: null,
    showForm: false,
  };

  onRemove = (values, index, setFieldValue) => {
    this.setState({ showForm: false });
    setFieldValue('authors', values.authors.filter((_, i) => i !== index));
  };

  onSubmit = (values, index, setFieldValue) => {
    for (const key in values.authors) {
      setFieldValue(`authors.${key}`, values.authors[key]);
    }
  };

  onAuthorChange = (author, index) => {
    this.setState({ activeIndex: index, showForm: index !== null });
  };

  renderSubForm = (values, errors, setFieldValue) => {
    const activeIndex = this.state.activeIndex;
    const authors = cloneDeep(values.authors);
    const initialValues = {
      authors: {
        [activeIndex]: getIn(authors, activeIndex, {}),
      },
    };

    return (
      <GroupField border grouped>
        <SubForm
          basePath={`authors.${activeIndex}`}
          initialValues={initialValues}
          initialErrors={errors}
          initialStatus={errors}
          removeButtonText="Remove author"
          submitButtonText="Save author"
          onSubmit={(values, actions) =>
            this.onSubmit(values, activeIndex, setFieldValue)
          }
          onRemove={() => this.onRemove(values, activeIndex, setFieldValue)}
          render={(basePath, errors) => (
            <AuthorForm basePath={basePath} errors={errors} />
          )}
        />
      </GroupField>
    );
  };

  renderFormField = props => {
    const {
      form: { values, setFieldValue, errors },
    } = props;
    const { showForm } = this.state;

    return (
      <>
        <ObjectListField
          fieldPath={this.props.fieldPath}
          keyField="full_name"
          onItemChange={this.onAuthorChange}
        />
        {showForm && this.renderSubForm(values, errors, setFieldValue)}
      </>
    );
  };

  render() {
    return (
      <Field name={this.props.fieldPath} component={this.renderFormField} />
    );
  }
}

AuthorsField.propTypes = {
  fieldPath: PropTypes.string,
};
