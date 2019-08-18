import React, { Component } from 'react'
import JoblyApi from '../JoblyApi';
import Jobcard from '../JobComponents/Jobcard'

export default class Company extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      jobs: []
    }
  }

  async componentDidMount() {
    let result = await JoblyApi.getCompany(this.props.match.params.company)
    this.setState({
      name: result.name,
      description: result.description,
      jobs: result.jobs
    })
  }

  componentWillUnmount() {
    this.setState({
      name: '',
      descriptipn: '',
      jobs: []
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h3>{this.state.description}</h3>
        {this.state.jobs.map(job => <Jobcard key={ job.id } {...job} applyToJob={this.props.applyToJob} user={this.props.user} />)}
      </div>
    )
  }
}
