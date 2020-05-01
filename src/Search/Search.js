import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    query: ''
  };

  handleOnChange = e => {
    this.setState({ query: e.target.value })
  };

  handleOnSubmit = e => {
    e.preventDefault();
    // todo
    console.log(this.state.query);
    this.setState({ query: '' })
  };

  render() {
    return (
      <div className="Search">
        <form onSubmit={this.handleOnSubmit}>
          <input onChange={this.handleOnChange} value={this.state.query} />
          <button>Search</button>
        </form>
      </div>
    );
  }
}