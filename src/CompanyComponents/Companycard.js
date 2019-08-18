import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import unHyphenate from '../HelperFunctions/hyphen'

export default class Companycard extends Component {

  render() {
    return (
      <div id={this.props.id} className="card mt-3">
        <Link exact="true" className="link" to={`/companies/${this.props.handle}`}>
          <h5 className="card-header">{unHyphenate(this.props.handle)}</h5>
      </Link>
          <div className="card-body">
            <h5 className="card-title">{this.props.title} </h5>
            <p className="card-text">{this.props.description}</p>
          </div>
        </div>
    )
  }
}
