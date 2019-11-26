import React, { Component } from 'react';
import { connect } from 'react-redux';

import {setEvaluation} from '../actions';

import "../../css/rating-journal-item.css";

class RatingGournalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      recived: props.recived
    }
    this.onChangeRating = this.onChangeRating.bind(this);
  }
  render() {
    const { student } = this.props;
    const { rating } = this.state;
    return (
      <li className="rating-journal__item">
        <div className="journal-item__student">
          {student.fullName}
        </div>
        <div className="journal-item__rating">
          <input
            type="text"
            className="journal-item__input"
            onChange={e => this.onChangeRating(e, student.guid)}
            value={rating.avg_eval}
            data-type="avg_eval"
          />
          <div className="journal-item__calc-value">
            {Number(rating.evaluation).toFixed(2)}
          </div>
          <input
            type="text"
            className="journal-item__input"
            onChange={e => this.onChangeRating(e, student.guid)}
            value={rating.avg_test}
            data-type="avg_test"
          />
          <div className="journal-item__calc-value">
            {Number(rating.testEvaluation).toFixed(2)}
          </div>
          <input
            type="text"
            className="journal-item__input"
            onChange={e => this.onChangeRating(e, student.guid)}
            value={rating.visit_count}
            data-type="visit_count"
          />
          <div className="journal-item__calc-value">
            {Number(rating.visited).toFixed(2)}
          </div>
          <input
            type="text"
            className="journal-item__input"
            onChange={e => this.onChangeRating(e, student.guid)}
            value={rating.without_delay}
            data-type="without_delay"
          />
          <div className="journal-item__calc-value">
            {Number(rating.withoutDelayed).toFixed(2)}
          </div>
          <input
            type="text"
            className="journal-item__input"
            onChange={e => this.onChangeRating(e, student.guid)}
            value={rating.eval_count}
            data-type="eval_count"
          />
          <div className="journal-item__calc-value">
            {Number(rating.evaluationStats).toFixed(2)}
          </div>
          <input
            type="text"
            className="journal-item__input"
            onChange={e => this.onChangeRating(e, student.guid)}
            value={rating.outclass}
            data-type="outclass"
          />
          <div className="journal-item__calc-value">
            {Number(rating.outclassWork).toFixed(2)}
          </div>
          <div className="journal-item__calc-value calc-value__total">
            {Number(rating.total).toFixed(2)}
          </div>
        </div>
      </li>
    );
  }

  onChangeRating(e, studentGuid) {
    const { rating } = this.state;
    const { lessons, dispatch} = this.props;
    rating[e.target.dataset.type] = e.target.value;
    this.setState({rating: rating});
    dispatch(setEvaluation(
      lessons.selectedJournal.lh_guid, 
      studentGuid, 
      e.target.dataset.type, 
      Number(e.target.value)));
  }
}

const mapStateToProps = state => ({
  lessons: state.lessons
});

export default connect(mapStateToProps)(RatingGournalItem);