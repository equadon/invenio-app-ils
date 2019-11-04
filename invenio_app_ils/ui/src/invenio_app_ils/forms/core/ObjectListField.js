import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getIn } from 'formik';
import { Form, List, Icon } from 'semantic-ui-react';

export class ObjectListField extends Component {
  state = {
    activeIndex: null,
    showForm: false,
  };

  onItemClick = index => {
    const activeIndex = this.state.activeIndex;
    const showForm = index === activeIndex ? !this.state.showForm : true;

    this.setState({ activeIndex: index, showForm });
  };

  setShowForm = showForm => this.setState({ showForm });

  getListItemIcon = (index, errors) => {
    for (const errorPath in errors) {
      if (errorPath.startsWith(`${this.props.fieldPath}.${index}`)) {
        return <Icon name="warning sign" color="red" />;
      }
    }
    return <Icon name="list" />;
  };

  renderFormField = props => {
    const { fieldPath, keyField } = this.props;
    const {
      form: { errors, values },
    } = props;
    const items = getIn(values, fieldPath, []);
    const { activeIndex, showForm } = this.state;

    return (
      <Form.Field className="object-list-field">
        <label>Authors</label>
        <List horizontal divided relaxed>
          {items.map((item, index) => (
            <List.Item
              key={index}
              as="a"
              active={showForm && activeIndex === index}
              onClick={() => this.onItemClick(index)}
            >
              <List.Content>
                {this.getListItemIcon(index, errors)}
                {item[keyField]}
              </List.Content>
            </List.Item>
          ))}

          <List.Item
            as="a"
            active={showForm && activeIndex === items.length}
            onClick={() => this.onItemClick(items.length)}
          >
            <List.Content>
              <Icon name="add" />
              New author
            </List.Content>
          </List.Item>
        </List>
        {showForm && this.props.renderItem(activeIndex, this.setShowForm)}
      </Form.Field>
    );
  };

  render() {
    return (
      <Field name={this.props.fieldPath} component={this.renderFormField} />
    );
  }
}

ObjectListField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
};
