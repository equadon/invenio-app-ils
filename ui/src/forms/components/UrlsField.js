import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AccordionField,
  ArrayField,
  StringField,
  GroupField,
  BooleanField,
  VocabularyField,
} from '../core';
import { DeleteActionButton } from './DeleteActionButton';

export class UrlsField extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    const objectPath = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        border
        widths="equal"
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <StringField label="Url" fieldPath={`${objectPath}.value`} />
        <StringField
          label="Description"
          fieldPath={`${objectPath}.description`}
        />
        {this.props.withAccess && (
          <>
            <BooleanField
              toggle
              fieldPath={`${objectPath}.open_access`}
              label="Open Access"
            />
            <VocabularyField
              type="series_url_access_restriction"
              fieldPath={`${objectPath}.access_restriction`}
              label="Access Restriction"
            />
          </>
        )}
      </GroupField>
    );
  }

  render() {
    const { defaultNewValue, fieldPath, label } = this.props;
    return (
      <AccordionField
        label={label}
        fieldPath={fieldPath}
        content={
          <ArrayField
            fieldPath={fieldPath}
            defaultNewValue={defaultNewValue}
            renderArrayItem={this.renderFormField.bind(this)}
            addButtonLabel="Add new url"
          />
        }
      />
    );
  }
}

UrlsField.propTypes = {
  defaultNewValue: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  withAccess: PropTypes.bool,
};

UrlsField.defaultProps = {
  defaultNewValue: { value: '', description: '' },
  fieldPath: 'urls',
  label: 'Urls',
  withAccess: false,
};
