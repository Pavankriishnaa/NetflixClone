import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const STATUS = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Popular extends Component {
  state = {
    moviesList: [],
    status: STATUS.initial,
  }

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    this.setState({status: STATUS.loading})
    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/popular-movies',
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        },
      )
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.results.map(each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }))
        this.setState({moviesList: updatedData, status: STATUS.success})
      } else {
        this.setState({status: STATUS.failed})
      }
    } catch (e) {
      this.setState({status: STATUS.failed})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
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
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.fetchPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

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
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="popular-container">{this.renderContent()}</div>
        <Footer />
      </>
    )
  }
}

export default Popular
