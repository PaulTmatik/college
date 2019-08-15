import React, { Component } from 'react';

export class DropDownItemAdapter {
  constructor(id, firstLine, secondLine) {
    this.id = id;
    this.firstLine = firstLine;
    this.secondLine = secondLine;
  }
}

class DropDownSelector extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false }

    this.drawItem = this.drawItem.bind(this);
    this.drawItems = this.drawItems.bind(this);
    this.onOpenList = this.onOpenList.bind(this);
  }

  render() {
    const { selected } = this.props;
    return (
      <div className="drop-down__selector">
        <ul className="drop-down__pane">
          {selected
            ? this.drawItem(selected.id, selected.firstLine, selected.secondLine)
            : null}
          {this.drawItems()}
        </ul>
      </div>
    );
  }

  drawItems() {
    const { items } = this.props;
    return items.map(item => this.drawItem(item.id, item.firstLine, item.secondLine));
  }

  drawItem(id, firstLine, secondLine) {
    return (
      <li key={id} className="drop-down__item">
        <button
          className="drop-down__button"
          onClick={() => this.onOpenList(id)}
        >
          <div className="drop-down__first_line">{firstLine}</div>
          <div className="drop-down__second_line">{secondLine}</div>
        </button>
      </li>
    );
  }

  onOpenList(id) {
    const { onSelect } = this.props;
    const { isOpen } = this.state;
    if (isOpen) onSelect(id);
    this.setState({ isOpen: !isOpen });
  }
}

export default DropDownSelector;