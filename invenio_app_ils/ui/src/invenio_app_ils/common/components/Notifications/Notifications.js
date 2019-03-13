import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class IlsMessage extends Component {
  componentDidMount() {
    const { autoDismiss, onDismiss } = this.props;
    if (autoDismiss) {
      setTimeout(onDismiss, autoDismiss);
    }
  }

  render() {
    const { autoDismiss, ...props } = this.props;

    return <Message floating {...props} />;
  }
}

const ErrorMessage = ({ id, header, content, removeNotification }) => (
  <IlsMessage
    negative
    icon="exclamation"
    header={header}
    content={content}
    onDismiss={() => removeNotification(id)}
  />
);

const WarningMessage = ({ id, header, content, removeNotification }) => (
  <IlsMessage
    warning
    icon="exclamation triangle"
    header={header}
    content={content}
    onDismiss={() => removeNotification(id)}
  />
);

const SuccessMessage = ({ id, header, content, removeNotification }) => (
  <IlsMessage
    success
    icon="check"
    header={header}
    content={content}
    onDismiss={() => removeNotification(id)}
  />
);

export class Notifications extends Component {
  renderNotification(notification) {
    const { removeNotification } = this.props;

    let MessageComponent = ErrorMessage;
    if (notification.type === 'success') {
      MessageComponent = SuccessMessage;
    } else if (notification.type === 'warning') {
      MessageComponent = WarningMessage;
    }

    return (
      <MessageComponent
        id={notification.id}
        key={notification.id}
        header={notification.title}
        content={notification.content}
        removeNotification={removeNotification}
      />
    );
  }

  render() {
    const { notifications } = this.props;
    return (
      <div
        style={{
          position: 'fixed',
          top: '20px',
          zIndex: 1000,
          right: '20px',
        }}
      >
        {notifications.map(message => this.renderNotification(message))}
      </div>
    );
  }
}
