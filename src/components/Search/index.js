import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import SearchContext from '../../context/SearchContext' // Update path if needed
import './index.css'

const STATUS = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
  noResults: 'NO_RESULTS',
}

class Search extends Component {
  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="loader" />
    </div>
  )

  renderFailure = getSearchResults => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774850162/Group_vzo5gc.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something went wrong. Please try again</h1>
      <button type="button" className="retry-btn" onClick={getSearchResults}>
        Try Again
      </button>
    </div>
  )

  renderNoResults = searchInput => (
    <div className="no-results-container">
      <img
        src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774850162/Group_vzo5gc.png"
        alt="no movies"
        className="failure-img"
      />
      <p className="no-results-text">
        Your search for {searchInput} did not find any matches.
      </p>
    </div>
  )

  renderMovies = moviesList => (
    <ul className="movies-grid">
      {moviesList.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img src={each.posterPath} alt={each.title} className="movie-img" />
          </Link>
        </li>
      ))}
    </ul>
  )

  renderContent = (status, moviesList, searchInput, getSearchResults) => {
    switch (status) {
      case STATUS.loading:
        return this.renderLoader()
      case STATUS.failed:
        return this.renderFailure(getSearchResults)
      case STATUS.success:
        return this.renderMovies(moviesList)
      case STATUS.noResults:
        return this.renderNoResults(searchInput)
      default:
        // You can return a prompt here or leave it null if no search is active
        return null
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {status, moviesList, searchInput, getSearchResults} = value
          return (
            <>
              <Header />
              <div className="search-page-container">
                {this.renderContent(
                  status,
                  moviesList,
                  searchInput,
                  getSearchResults,
                )}
              </div>
              <Footer />
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Search
