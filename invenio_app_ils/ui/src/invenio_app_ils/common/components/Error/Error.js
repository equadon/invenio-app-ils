import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-semantic-toasts';
// import 'react-semantic-toasts/styles/react-semantic-alert.css';
import _isEmpty from 'lodash/isEmpty';

export class Error extends Component {
  _sendNotification = error => {
    const status = error.response.status;
    const message = error.response.data.message;
    let icon = 'exclamation circle';

    switch (status) {
      case 400:
        break;
      case 403:
        icon = 'ban';
        break;
      default:
        break;
    }

    // setTimeout(() => {
    //   toast({
    //     type: 'error',
    //     icon: icon,
    //     title: status + ' ' + error.response.statusText,
    //     animation: 'bounce',
    //     description: <p>{message}</p>,
    //     time: 0,
    //   });
    // }, 10);
  };

  render() {
    const error = this.props.error;
    if (!_isEmpty(error)) {
      // this._sendNotification(error);
      return <p>Error!</p>;
    } else {
      return this.props.children;
    }
  }
}

Error.propTypes = {
  error: PropTypes.object,
};
