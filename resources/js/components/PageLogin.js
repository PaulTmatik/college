import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import { getUsersEmployees, selectEmployeeByGuid } from '../actions';

import DropDownSelector from './DropDownSelector';
import { employeeDropdownAdapter } from '../helpers';

import { authorize } from '../actions';

import "../../css/auth-panel.css";

class PageLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }

    const { dispatch } = props;
    dispatch(getUsersEmployees());

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSelectEmployee = this.onSelectEmployee.bind(this);
    this.onAuthenticate = this.onAuthenticate.bind(this);
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    const { auth } = this.props;
    if (!_.isEmpty(auth.selectedUser)) return <Redirect to={from} />;
    const { match } = this.props;
    const workForm = match.params.type === 'e'
      ? this.drawEmployeesForm()
      : null;

    return (
      <div className="page login">
        <div className="auth_panel">
          <h2>Авторизация</h2>
          <div className="nav-tabs">
            <NavLink
              activeClassName="tab--active"
              className="nav-tabs__tab"
              to="/e/login"
            >Сотрудники
            </NavLink>
            <NavLink
              activeClassName="tab--active"
              className="nav-tabs__tab"
              to="/s/login"
            >Студенты
            </NavLink>
          </div>
          {workForm}
        </div>
      </div>
    )
  }

  drawEmployeesForm() {
    const { auth } = this.props;
    const employees = auth.employees.map(
      item => employeeDropdownAdapter(item)
    );
    let curentEmployee = null;
    if (auth.selectedEmployee) 
      curentEmployee = employeeDropdownAdapter(auth.selectedEmployee);
    return (
      <form onSubmit={this.onAuthenticate} className="auth_panel__input-form">
        <DropDownSelector
          items={employees}
          selected={curentEmployee}
          onSelect={this.onSelectEmployee}
        />
        <div className="styled_input">
          <input
            autoFocus
            type="password"
            id="current_input"
            className="styled_input__input"
            required
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <label
            htmlFor="current_input"
            className="styled_input__label"
          >
            Введите пароль
          </label>
        </div>
        <div className="text--info">Если забыли пароль, для замены обратитесь к&nbsp;системному администратору.</div>
        <button
          className="button"
          type="submit"
        >
          Вход
        </button>
      </form>
    );
  }

  onSelectEmployee(employee_guid) {
    const { dispatch } = this.props;
    dispatch(selectEmployeeByGuid(employee_guid));
  }

  onAuthenticate(e) {
    e.preventDefault();
    const { auth, dispatch } = this.props;
    if (this.state.password && auth.selectedEmployee) {
      dispatch(authorize(auth.selectedEmployee, this.state.password));
    }
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PageLogin);