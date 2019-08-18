import React, { Component } from 'react';
import JoblyApi from '../JoblyApi';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      loggingIn: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.toggleLoginForm = this.toggleLoginForm.bind(this);

  }

  registeringUser() {
    this.setState({ loggingIn: false })
  }

  toggleLoginForm(evt) {
    if (evt.target.name === 'login') {
      this.setState({ loggingIn: true })
    } else {
      this.setState({ loggingIn: false })
    }
  }

  async registerSubmit(evt) {
    try {
      evt.preventDefault();
      let { username, password, first_name, last_name, email } = this.state;
      const token = await JoblyApi.registerUser({ username, password, first_name, last_name, email });
      this.loginWithToken(token, username)
    } catch (err) {
      console.log(err)
    }
  }

  async loginSubmit(evt) {
    try {
      evt.preventDefault();
      let token = await JoblyApi.loginUser({ username: this.state.username, password: this.state.password })
      this.loginWithToken(token, this.state.username)
    } catch (err) {
      console.log(err)
    }
  }

  loginWithToken(token, username) {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('username', username)
      this.props.logIn();
      this.props.history.push('/jobs')
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {

    const loginForm =
      (
        <div>
          <form onSubmit={this.loginSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username </label>
            <input className="form-control" name="username" id="username" value={this.state.username} onChange={this.handleChange} ></input>
            <label htmlFor="password">Password </label>
            <input className="form-control" type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} ></input>
            <button className="btn btn-info">Log In!</button>
            </div>
          </form>
        </div>
      );
    const registerForm =
      (
        <div>
          <form onSubmit={this.registerSubmit}>
            <label htmlFor="username">Username </label>
            <input className="form-control" name="username" id="username" value={this.state.username} onChange={this.handleChange} ></input>
            <label htmlFor="password">Password </label>
            <input className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleChange} ></input>
            <label htmlFor="first_name">Firstname </label>
            <input className="form-control" name="first_name" id="first_name" value={this.state.first_name} onChange={this.handleChange} ></input>
            <label htmlFor="last_name">Lastname </label>
            <input className="form-control" name="last_name" id="last_name" value={this.state.last_name} onChange={this.handleChange} ></input>
            <label htmlFor="email">Email </label>
            <input className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} ></input>
            <button className="btn btn-info">Register!</button>
          </form>
        </div>
      );

    let loggingIn = this.state.loggingIn;

    return (
      <div>
        <button className="btn btn-primary" name='login' onClick={this.toggleLoginForm} >Login</button><button className="btn btn-primary" name='register' onClick={this.toggleLoginForm}>Sign Up</button>
        {loggingIn ? loginForm : registerForm}
      </div>
    );
  }
}
