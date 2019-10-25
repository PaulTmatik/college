import React, { Component } from 'react';
import { connect } from 'react-redux';

class SideTabs extends Component {
  render() {
    return (
      <div className="side-tabs">
        <button className="side-tabs__add-button">
          <svg
            className="svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8V7H9V1H8v6H2v1h6v6h1V8h6z"
              fillRule="nonzero"
              fillOpacity="1"
              fill="#000"
              stroke="none"
            ></path>
          </svg>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lessons: state.lessons
});

export default connect(mapStateToProps)(SideTabs);