import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Header extends Component {
  state = {
    showSearchBar: false,
  }

  componentDidMount() {
    // If we refresh and are already on the search page, keep the bar open
    const {history} = this.props
    if (history.location.pathname === '/search') {
      this.setState({showSearchBar: true})
    }
  }

  toggleSearchBar = () => {
    this.setState(prevState => ({showSearchBar: !prevState.showSearchBar}))
  }

  onClickClose = () => {
    const {history} = this.props
    this.setState({showSearchBar: false})
    history.goBack() // Goes back to the past site
  }

  render() {
    const {showSearchBar} = this.state
    const {history} = this.props

    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput, onChangeSearchInput, getSearchResults} = value

          const onChangeInput = event => {
            onChangeSearchInput(event.target.value)
          }

          const onSearch = () => {
            if (searchInput !== '') {
              getSearchResults()
              if (history.location.pathname !== '/search') {
                history.push('/search')
              }
            }
          }

          const onKeyDown = event => {
            if (event.key === 'Enter') {
              onSearch()
            }
          }

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
                {showSearchBar ? (
                  <div className="search-input-container">
                    <input
                      type="search"
                      placeholder="Search"
                      className="search-input"
                      value={searchInput}
                      onChange={onChangeInput}
                      onKeyDown={onKeyDown}
                    />
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="search-btn"
                      onClick={onSearch}
                    >
                      <HiOutlineSearch size={20} />
                    </button>
                    <button
                      type="button"
                      className="search-btn"
                      onClick={this.onClickClose}
                    >
                      <MdClose size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="button-hide"
                    data-testid="searchButton"
                    onClick={this.toggleSearchBar}
                  >
                    <HiOutlineSearch size={25} />
                  </button>
                )}

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
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
