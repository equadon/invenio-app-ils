import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, List, Container, Icon, Label } from 'semantic-ui-react';
import find from 'lodash/find';
import { HitsSearch } from './HitsSearch';
import './ESSelector.scss';

const ResultSelections = ({ selections, removeSelection }) => (
  <Container>
    <List>
      {selections.map(selection => (
        <List.Item key={selection.id}>
          <Label circular as="a" onClick={() => removeSelection(selection)}>
            {selection.title}
            <Icon link name="delete" />
          </Label>
        </List.Item>
      ))}
    </List>
  </Container>
);

export class ESSelector extends Component {
  constructor(props) {
    super(props);

    this.recordSearch = null;
    this.state = { selections: this.props.selections || [], visible: false };
  }

  show = () => this.setState({ visible: true });

  hide = () => {
    this.recordSearch.clear();
    this.setState({ visible: false });
  };

  addSelection = selection => {
    const selections = this.state.selections;
    const idMatch = find(selections, sel => sel.id === selection.id);
    if (!idMatch) {
      selections.push({
        id: selection.id,
        title: selection.title,
      });
      this.setState({ selections: selections });
    }
  };

  removeSelection = selection => {
    const selections = this.state.selections.filter(
      result => selection.id !== result.id
    );
    this.setState({ selections: selections });
    if (selections.length === 0) {
      this.recordSearch.clear();
    }
  };

  save = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this.state.selections);
    }
    this.hide();
  };

  render() {
    const { multiple, triggerText, title, query } = this.props;
    const triggerButton = (
      <Button
        positive
        icon={multiple ? 'plus' : 'edit'}
        labelPosition="right"
        content={triggerText}
        onClick={this.show}
      />
    );

    return (
      <Modal
        id="es-selector"
        trigger={triggerButton}
        open={this.state.visible}
        size="tiny"
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <HitsSearch
            query={query}
            onSelect={this.addSelection}
            clearOnSelect={multiple}
            ref={element => (this.recordSearch = element)}
          />
          {multiple && (
            <ResultSelections
              selections={this.state.selections}
              removeSelection={this.removeSelection}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.hide}>
            Close
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Save"
            onClick={this.save}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ESSelector.propTypes = {
  multiple: PropTypes.bool,
};
