import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const STATUS = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
  noResults: 'NO_RESULTS',
}

class Search extends Component {
  state = {
    moviesList: [],
    status: STATUS.initial,
    searchInput: '',
    searchValue: '',
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = async () => {
    const {searchInput} = this.state
    if (searchInput.trim() === '') return

    this.setState({status: STATUS.loading, searchValue: searchInput})
    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        },
      )
      const data = await response.json()

      if (response.ok) {
        if (data.results.length === 0) {
          this.setState({status: STATUS.noResults, moviesList: []})
        } else {
          const updatedData = data.results.map(each => ({
            id: each.id,
            title: each.title,
            posterPath: each.poster_path,
          }))
          this.setState({moviesList: updatedData, status: STATUS.success})
        }
      } else {
        this.setState({status: STATUS.failed})
      }
    } catch (e) {
      this.setState({status: STATUS.failed})
    }
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.onClickSearch()
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="loader" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774850162/Group_vzo5gc.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something went wrong. Please try again</h1>
      <button type="button" className="retry-btn" onClick={this.onClickSearch}>
        Try Again
      </button>
    </div>
  )

  renderNoResults = () => {
    const {searchValue} = this.state
    return (
      <div className="no-results-container">
        <img
          src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774850162/Group_vzo5gc.png"
          alt="no movies"
          className="failure-img"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderMovies = () => {
    const {moviesList} = this.state
    return (
      <ul className="movies-grid">
        {moviesList.map(each => (
          <li key={each.id}>
            <Link to={`/movies/${each.id}`}>
              <img
                src={each.posterPath}
                alt={each.title}
                className="movie-img"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {status} = this.state
    switch (status) {
      case STATUS.loading:
        return this.renderLoader()
      case STATUS.failed:
        return this.renderFailure()
      case STATUS.success:
        return this.renderMovies()
      case STATUS.noResults:
        return this.renderNoResults()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="search-page-container">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearch}
              onKeyDown={this.onKeyDown}
              className="search-input"
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.onClickSearch}
            >
              <HiOutlineSearch size={20} />
            </button>
          </div>
          {this.renderContent()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Search
