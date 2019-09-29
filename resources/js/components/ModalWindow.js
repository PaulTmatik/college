import React, { Component } from 'react';

class ModalWindow extends Component {
  render() {
    const { title, content } = this.props;
    return (
      <div className="modal_window__wrapper">
        <div className="modal_window">
          {title ? (<div className="modal_window__title">{title}</div>) : null}
          <div className="modal_window__body">
            
          </div>
        </div>
      </div>
    );
  }
}