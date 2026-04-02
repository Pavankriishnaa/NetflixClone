import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Account extends Component {
  onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <>
        <Header />
        <div className="logout-container">
          <div className="profile-data-container">
            <h1 style={{margin: '0px'}}>Account</h1>
            <hr style={{color: 'rgba(203, 213, 225, 1)'}} />

            <div
              style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}
            >
              <p style={{color: 'rgba(148, 163, 184, 1)'}}>Member ship</p>
              <div>
                <p style={{color: 'rgba(30, 41, 59, 1)'}}>rahul@gmail.com</p>
                <p style={{color: 'rgba(100, 116, 139, 1)'}}>Password</p>
              </div>
            </div>

            <hr style={{color: 'rgba(203, 213, 225, 1)'}} />

            <div
              style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}
            >
              <p style={{color: 'rgba(148, 163, 184, 1)'}}>Plan details </p>
              <div>
                <p style={{color: 'rgba(30, 41, 59, 1)'}}>Premium</p>
                <p
                  style={{
                    color: 'rgba(30, 41, 59, 1)',
                    border: '1px solid rgba(30, 41, 59, 1)',
                    padding: '2px 6px',
                    display: 'inline-block',
                  }}
                >
                  Ultra HD
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={this.onLogOut}
              className="button-center"
              style={{
                backgroundColor: 'rgba(229, 9, 20, 1)',
                color: 'white',
                border: '0px',
                padding: '7px 10px',
                margin: 'auto',
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default withRouter(Account)
