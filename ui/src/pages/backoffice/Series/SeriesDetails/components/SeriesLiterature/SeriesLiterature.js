import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Loader, Error, ResultsTable } from '@components';
import { document as documentApi } from '@api';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@pages/backoffice/components/buttons';
import { recordToPidType } from '@api/utils';
import get from 'lodash/get';

export default class SeriesLiterature extends Component {
  constructor(props) {
    super(props);
    this.seriesPid = props.seriesDetails.metadata.pid;
    this.seriesType = props.seriesDetails.metadata.mode_of_issuance;
    this.relationName = this.seriesType.toLowerCase();
  }

  componentDidMount() {
    this.props.fetchSeriesLiterature(this.seriesPid, this.seriesType);
  }

  seeAllButton = () => {
    const path = BackOfficeRoutes.documentsListWithQuery(
      documentApi
        .query()
        .withSeriesPid(this.seriesPid, this.seriesType)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    const detailsForPid =
      recordToPidType(row) === 'docid'
        ? BackOfficeRoutes.documentDetailsFor
        : BackOfficeRoutes.seriesDetailsFor;
    return (
      <Button
        as={Link}
        to={detailsForPid(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  renderTypeColumn = ({ row }) => {
    const pidType = recordToPidType(row);
    switch (pidType) {
      case 'docid':
        return 'Document';
      case 'serid':
        return row.metadata.mode_of_issuance === 'SERIAL'
          ? 'Serial'
          : 'Multipart monograph';
      default:
        return pidType;
    }
  };

  renderVolumeColumn = ({ row }) => {
    const relations = get(row, `metadata.relations.${this.relationName}`, []);
    for (const serial of relations) {
      if (serial.pid_type === 'serid' && serial.pid === this.seriesPid) {
        return serial.volume;
      }
    }
    return '-';
  };

  render() {
    const { showMaxDocuments, seriesLiterature, isLoading, error } = this.props;
    const columns = [
      { title: '', field: '', formatter: this.viewDetails },
      { title: 'ID', field: 'metadata.pid' },
      {
        title: 'Volume',
        field: `metadata.relations.${this.relationName}.volume`,
        formatter: this.renderVolumeColumn,
      },
      { title: 'Type', field: '', formatter: this.renderTypeColumn },
      { title: 'Title', field: 'metadata.title' },
    ];
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <ResultsTable
            data={seriesLiterature.hits}
            columns={columns}
            totalHitsCount={seriesLiterature.total}
            title={'Literature included in this series'}
            name={'series or documents'}
            seeAllComponent={this.seeAllButton()}
            showMaxRows={showMaxDocuments}
          />
        </Error>
      </Loader>
    );
  }
}

SeriesLiterature.propTypes = {
  showMaxDocuments: PropTypes.number,
};

SeriesLiterature.defaultProps = {
  showMaxDocuments: 5,
};
