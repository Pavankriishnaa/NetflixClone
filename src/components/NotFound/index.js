import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <h1 style={{fontSize: '60px', marginBottom: '20px'}}>Lost Your Way</h1>
        <p style={{margin: '0px'}}>
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <Link to="/">
          <button className="go-home-button" type="button">
            Go to Home
          </button>
        </Link>
      </div>
    )
  }
}

export default NotFound
