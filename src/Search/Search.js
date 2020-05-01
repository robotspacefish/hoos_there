import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    query: ''
  };

  handleOnChange = e => {
    this.props.updateQuery(e.target.value)
  };

  handleOnSubmit = e => {
    e.preventDefault();
    // todo
    console.log(this.state.query);
    // this.setState({ query: '' })
  };

  render() {
    return (
      <div className="Search">
        <input name="query" onChange={this.handleOnChange} value={this.props.query} />
        <label>Search</label>
      </div>
    );
  }
}