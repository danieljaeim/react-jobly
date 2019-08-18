import React, { Component } from 'react'
import JoblyApi from '../JoblyApi';
import Jobcard from './Jobcard';
import SearchForm from '../HelperComponents/SearchForm';

export default class Jobs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jobs: []
    }

    this.getJobs = this.getJobs.bind(this);
  }

  async componentDidMount() {
    let result = await JoblyApi.getJobs()
    this.setState({ jobs: result })
  }

  componentWillUnmount() {
    this.setState({ companies: [] });
  }

  async getJobs(search) {
    let result = await JoblyApi.getJobs(search)
    this.setState({jobs: result})
  }

  render() {
    return (
      <div>
        <SearchForm id='job' search={this.getJobs} />
        {this.state.jobs.map(job => (<Jobcard key={job.id} {...job} applyToJob={this.props.applyToJob} user={this.props.user}/>))}
      </div>
    )
  }
}
