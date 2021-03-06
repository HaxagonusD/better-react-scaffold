import React, { Component } from 'react'
import { signInUser } from '../../services/auth'
import { Link } from 'react-router-dom'

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMsg: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })
  }

  onSignIn = event => {
    event.preventDefault()
    const { history, setUser } = this.props
    signInUser(this.state)
      .then(res => setUser(res.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({
          isError: true,
          errorMsg: 'Invalid Credentials',
          username: '',
          password: ''
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
      return <button type="submit">Click Here</button>
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <div className="row">
        <div className="form-container">
          <h3>Sign In</h3>
          <form onSubmit={this.onSignIn}>
            <label>Username</label>
            <input
              required
              type="text"
              name="username"
              value={username}
              placeholder="Enter Username"
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
            {this.renderError()}
            <Link to={'/sign-up'} style={{ textDecoration: 'none' }}>
              <h4>Dont Have an Account? <br /> Sign-Up Here.</h4>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn