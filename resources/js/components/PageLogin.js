import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import DropDownSelector from './DropDownSelector';

class PageLogin extends Component {
  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferer } = this.state;

    if (redirectToReferer) return <Redirect to={from} />;

    return (
      <div className="page login">
        <DropDownSelector />
      </div>
    )
  }
}

export default PageLogin;