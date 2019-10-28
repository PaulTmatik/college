import React, {Component} from 'react';

import "../../css/edit-journal-form.css";

class EditJournalForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onCloseFrom = this.onCloseFrom.bind(this);
  }
  render() {
    return (
      <form
        onSubmit={this.onSubmitForm}
        className="edit-journal__form"
      >
        <div className="edit-journal__components-group">
          <h2 className="edit-journal__title">Новый журнал</h2>
          <div className="edit-journal__input-group">
            <div className="styled_input">
              <input
                id="edit-gournal-begin-date"
                type="date"
                className="styled_input__input"
              />
              <label
                htmlFor="edit-gournal-begin-date"
                className="styled_input__label"
              >
                Начало
              </label>
            </div> –
            <div className="styled_input">
              <input
                id="edit-gournal-end-date"
                type="date"
                className="styled_input__input"
              />
              <label
                htmlFor="edit-gournal-end-date"
                className="styled_input__label"
              >
                Окончание
              </label>
            </div>
          </div>
          <div className="edit-journal__input-group">
            <label
              htmlFor="edit-journal-hours-count-lbl"
              className="edit-journal__hours-label"
            >
              Количество часов в периоде
            </label>
            <div className="styled_input edit-journal__hours-input">
              <input
                id="edit-journal-hours-count-lbl"
                type="text"
                className="styled_input__input"
                maxLength="3"
                defaultValue="1"
              />
            </div>
          </div>
          <div className="edit-journal__input-group edit-journal--right">
            <button
              className="button"
              type="submit"
            >
              Подтвердить
            </button>
            <button
              className="button button--bordered"
              type="reset"
              onClick={this.onCloseFrom}
            >
              Отмена
            </button>
          </div>
        </div>
      </form>
    );
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.onCloseFrom();
  }

  onCloseFrom() {
    const {onCloseEvent} = this.props;
    onCloseEvent();
  }
}

export default EditJournalForm;