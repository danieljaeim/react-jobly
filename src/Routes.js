import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Companies from "./CompanyComponents/Companies"
import Company from "./CompanyComponents/Company"
import Jobs from "./JobComponents/Jobs"
import Home from "./ProfileComponents/Home"
import Login from "./ProfileComponents/Login"
import Profile from "./ProfileComponents/Profile"

class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/companies" render={() => <Companies />} />
          <Route exact path="/companies/:company" render={props => <Company {...props} applyToJob={this.props.applyToJob} user={this.props.user}/>} />
          <Route exact path="/jobs" render={() => <Jobs logOut={ this.props.logOut } applyToJob={this.props.applyToJob} user={this.props.user}/>} />
          <Route exact path="/login" render={props => <Login logIn={ this.props.logIn } {...props} />} />
          <Route exact path="/profile" render={() => <Profile user={this.props.user} updateUser={ this.props.updateUser } />} />
          <Redirect to="/" />
        </Switch>
    )
  }
}

export default Routes;