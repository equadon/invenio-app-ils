import React, { Component } from 'react';
import { Dimmer, Loader as UILoader, Segment } from 'semantic-ui-react';

export class Loader extends Component {
  render() {
    const isLoading = this.props.isLoading;
    return (
      <Dimmer.Dimmable as={Segment} dimmed={isLoading}>
        <Dimmer active={isLoading} inverted>
          <UILoader active size="huge" inline="centered" />
        </Dimmer>
        {this.props.children}
      </Dimmer.Dimmable>
    );
  }
}
