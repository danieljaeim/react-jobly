/**
 * Companies component renders a list of companies
 */

import React, { Component } from 'react';
import JoblyApi from '../JoblyApi';
import Companycard from '../CompanyComponents/Companycard';
import SearchForm from '../HelperComponents/SearchForm';


class Companies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies: []
    }

    this.getCompanies = this.getCompanies.bind(this);
  }

  async componentDidMount() {
    let result = await JoblyApi.getCompanies()
    this.setState({ companies: result })
  }

  componentWillUnmount() {
    this.setState({ companies: [] });
  }

  async getCompanies(search) {
    let result = await JoblyApi.getCompanies(search)
    this.setState({ companies: result })
  }

  render() {
    return (
      <div>
        <SearchForm id="company" search={this.getCompanies} />
        {this.state.companies.map(company => (<Companycard key={company.handle} handle={company.handle} {...company} />))}
      </div>
    )
  }
}


export default Companies
