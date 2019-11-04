import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field } from 'formik';
import { Form, Card, Icon, Label } from 'semantic-ui-react';
import { ESSelector } from '../../common/components/ESSelector';
import isEmpty from 'lodash/isEmpty';

export class SelectorField extends Component {
  constructor(props) {
    super(props);

    const {
      fieldPath,
      errorPath,
      emptyHeader,
      emptyDescription,
      label,
      required,
      multiple,
      optimized,
      placeholder,
      serializer,
      renderGroup,
      renderSelection,
      ...selectorProps
    } = props;
    this.fieldPath = fieldPath;
    this.errorPath = errorPath;
    this.emptyHeader = emptyHeader;
    this.emptyDescription = emptyDescription;
    this.label = label;
    this.required = required;
    this.multiple = multiple;
    this.optimized = optimized;
    this.renderGroup = renderGroup || this.defaultRenderGroup;
    this.renderSelection = renderSelection || this.defaultRenderSelection;
    this.serializer = serializer;
    this.placeholder = placeholder;
    this.selectorProps = selectorProps;

    this.state = {
      value: null,
    };
  }

  renderEmpty = () => (
    <Card header={this.emptyHeader} description={this.emptyDescription} />
  );

  defaultRenderSelection = (selection, removeSelection) => {
    return (
      <Card fluid={!this.multiple} key={selection.id}>
        <Card.Content>
          <Card.Header as="a" onClick={() => removeSelection(selection)}>
            {selection.title}
            <Icon color="red" name="delete" />
          </Card.Header>
          <Card.Meta>{selection.extra}</Card.Meta>
          <Card.Description>{selection.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  };

  defaultRenderGroup = (selections, renderSelection, removeSelection) => {
    if (isEmpty(selections)) {
      return this.renderEmpty();
    }

    return (
      <Card.Group>
        {selections.map(selection =>
          renderSelection(selection, removeSelection)
        )}
      </Card.Group>
    );
  };

  onSelectionsUpdate = (selections, setFieldValue) => {
    this.setState({ value: selections });
    if (this.multiple) {
    } else {
      setFieldValue(
        this.fieldPath,
        selections.length > 0 ? selections[0].metadata : {}
      );
    }
  };

  hasFieldError(errors, name, value) {
    const error = errors[name];
    return !isEmpty(error);
  }

  renderFormField = ({ form: { errors, setFieldValue, values } }) => {
    const selections = [];
    const value = values[this.fieldPath];
    if (this.multiple) {
      for (const record of value) {
        if (!isEmpty(record)) {
          selections.push(this.serializer({ metadata: record }));
        }
      }
    } else {
      if (!isEmpty(value)) {
        selections.push(this.serializer({ metadata: value }));
      }
    }
    const hasFieldError = this.hasFieldError(errors, this.errorPath, value);
    const error = errors[this.errorPath];
    const placeholder = !this.multiple && selections.length > 0 ? selections[0].title : this.placeholder;
    return (
      <Form.Field required={this.required} error={hasFieldError}>
        {this.label && <label htmlFor={this.fieldPath}>{this.label}</label>}
        {hasFieldError && !isEmpty(error) && (
          <Label prompt pointing="below">
            {error}
          </Label>
        )}
        <ESSelector
          id={this.fieldPath}
          name={this.fieldPath}
          multiple={this.multiple}
          initialSelections={selections}
          renderSelections={this.renderGroup}
          renderSelection={this.renderSelection}
          onSelectionsUpdate={selections =>
            this.onSelectionsUpdate(selections, setFieldValue)
          }
          serializer={this.serializer}
          placeholder={placeholder}
          {...this.selectorProps}
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

SelectorField.propTypes = {
  emptyDescription: PropTypes.string,
  emptyHeader: PropTypes.string,
  errorPath: PropTypes.string.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  optimized: PropTypes.bool,
  serializer: PropTypes.func.isRequired,
  renderGroup: PropTypes.func,
  renderSelection: PropTypes.func,
  required: PropTypes.bool,
};

SelectorField.defaultProps = {
  emptyHeader: 'Nothing selected',
  emptyDescription: 'Please select a value before saving.',
  optimized: false,
};
