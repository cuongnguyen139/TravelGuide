import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    return (
      <input
        type="checkbox"
        value={this.props.value}
        checked={this.props.isChecked}
        onChange={this.props.handleCheckboxClick}
        className="form-check-input position-static"
      />
    );
  }
}

export default Checkbox;
