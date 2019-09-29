import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBar from './TitleBar';

class PageJournalHome extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="page journal__home">
        <TitleBar title="Главная журнала">
          <button className="button button--borderless">
            <svg
              className="svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 8V7H9V1H8v6H2v1h6v6h1V8h6z"
                fill-rule="nonzero"
                fill-opacity="1"
                fill="#000"
                stroke="none"
              ></path>
            </svg>
          </button>
        </TitleBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(mapStateToProps)(PageJournalHome);