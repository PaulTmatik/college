import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

import PageJournalHome from './PageJournalHome';
import PageJournalGroupDetail from './PageJournalGroupDetail';
import PageLogin from './PageLogin';

import {checkAuthorization} from '../actions';

let isAuthentecate = false;

class Pages extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(checkAuthorization());
  }
  
  render() {
    const { auth } = this.props;
    isAuthentecate = !_.isEmpty(auth.selectedUser);
    return (
      <div className="application_body">
        <PrivateRoute exact path="/" component={PageJournalHome} />
        <PrivateRoute path="/journal/group/:guid" component={PageJournalHome} />
        <Route path="/:type/login" component={PageLogin} />
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthentecate
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/e/login',
        state: { from: props.location }
      }} />
  )} />
);


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Pages);