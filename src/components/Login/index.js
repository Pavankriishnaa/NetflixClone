import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774602853/logo.png"
          alt="login website logo"
          className="login-website-logo"
        />
        <div className="login-box-container">
          <div className="login-box">
            <p className="login-title">Login</p>

            <form onSubmit={this.onSubmitLogin}>
              <div className="input-container">
                <label className="login-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  className="login-input"
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>

              <div className="input-container">
                <label className="login-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="login-input"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
              </div>

              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
