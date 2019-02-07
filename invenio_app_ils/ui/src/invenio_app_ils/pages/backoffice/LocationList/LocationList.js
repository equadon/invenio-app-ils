import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { InternalLocationList } from './components';
import { Error, Loader, ResultsTable } from '../../../common/components';
import { invenioConfig } from '../../../common/config';

export default class LocationList extends Component {
  constructor(props) {
    super(props);
    this.fetchLocations = this.props.fetchLocations;
  }

  componentDidMount() {
    this.fetchLocations();
  }

  openEditor(url) {
    window.open(`${invenioConfig.editor.url}?url=${url}`, url);
  }

  prepareData() {
    return this.props.data.map(row => ({
      ID: row.location_pid,
      Address: row.address,
      Email: row.email,
      Name: row.name,
    }));
  }

  render() {
    let { data, hasError, isLoading } = this.props;
    const rows = this.prepareData();
    const errorData = hasError ? data : null;
    const locationsUrl = !_isEmpty(data) ? data.link : null;
    const actionComponent = <Button circular compact icon="edit" />;
    return (
      <Loader isLoading={isLoading}>
        <Error error={errorData}>
          <Container>
            <ResultsTable
              rows={rows}
              name={'Locations'}
              actionClickHandler={() => this.openEditor(locationsUrl)}
              showMaxRows={this.props.showMaxItems}
              actionComponent={actionComponent}
            />
            <InternalLocationList />
          </Container>
        </Error>
      </Loader>
    );
  }
}

LocationList.propTypes = {
  data: PropTypes.array.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  showMaxItems: PropTypes.number,
};

LocationList.defaultProps = {
  showMaxItems: 5,
};