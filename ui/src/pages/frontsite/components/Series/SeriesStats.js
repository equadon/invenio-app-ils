import React, { Component } from 'react';
import { Icon, Table, Message } from 'semantic-ui-react';
import { stats } from '@api/stats';
import { recordToPidType } from '@api/utils';
import _get from 'lodash/get';

export class SeriesStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: { count: '-', unique_count: '-' },
      downloads: { count: '-', unique_count: '-' },
    };
  }

  componentDidMount() {
    this.fetchStats();
  }

  fetchStats = async () => {
    const { series } = this.props;
    const pidType = recordToPidType(series);
    try {
      const response = await stats.recordStats(pidType, series.pid);
      const views = _get(response.data, 'views', {
        count: '-',
        unique_count: '-',
      });
      const downloads = _get(response.data, 'downloads', {
        count: '-',
        unique_count: '-',
      });
      this.setState({ downloads: downloads, views: views });
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    const { series } = this.props;
    const { downloads, views } = this.state;
    return (
      <Message compact className={'series-stats-message'}>
        <Table compact basic>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name="eye" />
              </Table.Cell>
              <Table.Cell>
                Views <strong>{views.count}</strong>
              </Table.Cell>
              <Table.Cell>
                Unique Views <strong>{views.unique_count}</strong>
              </Table.Cell>
            </Table.Row>

            {series.metadata.eitems.hits.length > 0 && (
              <Table.Row>
                <Table.Cell>
                  <Icon name="download" />
                </Table.Cell>
                <Table.Cell>
                  Downloads <strong>{downloads.count}</strong>
                </Table.Cell>
                <Table.Cell>
                  Unique Downloads <strong>{downloads.unique_count}</strong>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Message>
    );
  }
}
