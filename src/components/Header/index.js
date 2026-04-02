import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="nav-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774602853/logo.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <ul className="nav-links-list">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/popular" className="nav-link">
              Popular
            </Link>
          </li>
        </ul>
        <div className="nav-right">
          <Link to="/search">
            <button
              type="button"
              className="button-hide"
              data-testid="searchButton"
            >
              <HiOutlineSearch size={25} />
            </button>
          </Link>
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774681622/Avatar_wc7cdq.png"
              alt="profile"
              className="nav-profile-img"
            />
          </Link>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
