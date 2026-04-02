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

class MovieItemDetails extends Component {
  state = {
    movieDetails: null,
    status: STATUS.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    if (match.params.id !== prevProps.match.params.id) {
      this.getMovieDetails()
    }
  }

  getMovieDetails = async () => {
    this.setState({status: STATUS.loading})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies/${id}`,
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        },
      )
      const data = await response.json()
      if (response.ok) {
        const movie = data.movie_details
        this.setState({
          movieDetails: {
            title: movie.title,
            backdropPath: movie.backdrop_path,
            overview: movie.overview,
            releaseDate: movie.release_date,
            adult: movie.adult,
            runtime: movie.runtime,
            genres: movie.genres,
            spokenLanguages: movie.spoken_languages,
            voteCount: movie.vote_count,
            voteAverage: movie.vote_average,
            budget: movie.budget,
            similarMovies: movie.similar_movies,
          },
          status: STATUS.success,
        })
      } else {
        this.setState({status: STATUS.failed})
      }
    } catch (e) {
      this.setState({status: STATUS.failed})
    }
  }

  getRuntime = minutes => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs}h ${mins}m`
  }

  getReleaseYear = releaseDate => {
    if (!releaseDate) return ''
    const parts = releaseDate.split(' ')
    if (parts.length === 3) {
      return parts[2]
    }
    return releaseDate.split('-')[0]
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
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {movieDetails} = this.state
    const {
      title,
      backdropPath,
      overview,
      releaseDate,
      adult,
      runtime,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      similarMovies,
    } = movieDetails

    return (
      <>
        <div
          className="movie-banner"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <div className="overlay">
            <h1 className="title">{title}</h1>
            <div className="movie-meta">
              <p>{this.getRuntime(runtime)}</p>
              <p className="cert">{adult ? 'A' : 'U/A'}</p>
              <p>{this.getReleaseYear(releaseDate)}</p>
            </div>
            <p className="description">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>

        <div className="bottom-section">
          <div>
            <h1>genres</h1>
            <ul>
              {genres.map(each => (
                <li key={each.id}>
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Audio Available</h1>
            <ul>
              {spokenLanguages.map(each => (
                <li key={each.id}>
                  <p>{each.english_name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Rating Count</h1>
            <p>{voteCount}</p>
            <h1>Rating Average</h1>
            <p>{voteAverage}</p>
          </div>
          <div>
            <h1>Budget</h1>
            <p>{budget}</p>
            <h1>Release Date</h1>
            <p>{releaseDate}</p>
          </div>
        </div>

        <div className="more-like-this">
          <h1 className="more-title">More like this</h1>
          <ul className="similar-movies-container">
            {similarMovies.map(each => (
              <li key={each.id}>
                <Link to={`/movies/${each.id}`}>
                  <img
                    src={each.poster_path}
                    alt={each.title}
                    className="similar-img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {status} = this.state
    return (
      <>
        <Header />
        <div className="movie-details-container">
          {status === STATUS.loading && this.renderLoader()}
          {status === STATUS.failed && this.renderFailure()}
          {status === STATUS.success && this.renderSuccess()}
        </div>
        <Footer />
      </>
    )
  }
}

export default MovieItemDetails
