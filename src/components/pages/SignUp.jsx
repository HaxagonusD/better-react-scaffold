import React, { Component } from 'react'
import { signUp, signInUser } from '../../services/auth'
import { Link } from 'react-router-dom'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isError: false,
      errorMsg: ''
    }
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })

  onSignUp = event => {
    event.preventDefault()
    const { history, setUser } = this.props
    signUp(this.state)
      .then(() => signInUser(this.state))
      .then(res => setUser(res.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({
          email: '',
          password: '',
          passwordConfirmation: '',
          isError: true,
          errorMsg: 'Sign Up Details Invalid'
        })
      })
  }

  renderError = () => {
    const toggleForm = this.state.isError ? 'danger' : ''
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      )
    } else {
      return <button type="submit">Sign In</button>
    }
  }

  render() {
    const { email, username, password, passwordConfirmation } = this.state
    return (
      <div className="row">
        <div className="form-container">
          <h3>Sign Up</h3>
          <form onSubmit={this.onSignUp}>
            <label>Username</label>
            <input
              required
              type="text"
              name="username"
              value={username}
              placeholder="Enter username"
              onChange={this.handleChange}
            />
            <label>Email address</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <label>Password Confirmation</label>
            <input
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
            {this.renderError()}
            <Link to={'/sign-in'} style={{ textDecoration: 'none' }}>
              <h4>Already Have an Account? <br /> Sign-In Here.</h4>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp