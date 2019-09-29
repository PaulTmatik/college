import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import "../../css/titlebar.css";

import {logOut} from '../actions';

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false
    }
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }
  render() {
    if (this.state.isRedirect) 
      return (<Redirect to="/e/login" />);
    const { title, children } = this.props;
    return (
      <div className="title_bar">
        <div className="title_bar__app_title">
          {title ? title : null}
        </div>
        <div className="title_bar__button_group">
          {children}
          <button
            className="button button--bordered"
            onClick={this.onLogoutHandler}
          >
            Выход
          </button>
        </div>
      </div>
    );
  }

  onLogoutHandler() {
    this.setState({ isRedirect: true });
    this.props.dispatch(logOut());
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TitleBar);
