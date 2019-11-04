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
    showForm: false,
  };

  onRemove = (values, index, setFieldValue, setShowForm) => {
    setShowForm(false);
    setFieldValue('authors', values.authors.filter((_, i) => i !== index));
  };

  onSubmit = (values, index, setFieldValue, setShowForm) => {
    for (const key in values.authors) {
      setFieldValue(`authors.${key}`, values.authors[key]);
    }
    setShowForm(false);
  };

  renderFormField = props => {
    const {
      form: { values, setFieldValue, errors },
    } = props;
    const authorValues = cloneDeep(values.authors);

    return (
      <ObjectListField
        fieldPath={this.props.fieldPath}
        keyField="full_name"
        renderItem={(index, setShowForm) => {
          const initialValues = {
            authors: {
              [index]: getIn(authorValues, index, {}),
            },
          };
          return (
            <GroupField border grouped>
              <SubForm
                basePath={`authors.${index}`}
                initialValues={initialValues}
                initialErrors={errors}
                initialStatus={errors}
                removeButtonText="Remove author"
                submitButtonText="Save author"
                onSubmit={(values, actions) =>
                  this.onSubmit(values, index, setFieldValue, setShowForm)
                }
                onRemove={() =>
                  this.onRemove(values, index, setFieldValue, setShowForm)
                }
                render={(basePath, errors) => (
                  <AuthorForm basePath={basePath} errors={errors} />
                )}
              />
            </GroupField>
          );
        }}
      />
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
