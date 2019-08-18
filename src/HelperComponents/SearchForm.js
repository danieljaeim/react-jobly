import React, { Component } from 'react'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleSubmit(evt) {
    evt.preventDefault();
    // If search is looking for job
    this.props.search({ search: this.state.filter });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="filter"></label>
            <input className="form-control" name="filter" id="filter" value={this.state.filter} onChange={this.handleChange} ></input>
            <button className="btn btn-info">Search</button>
          </div>
        </form>
      </div>
    )
  }
}
