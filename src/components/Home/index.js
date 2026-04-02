import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const STATUS = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {
    trendingList: [],
    originalList: [],
    trendingStatus: STATUS.initial,
    originalsStatus: STATUS.initial,
    bannerMovie: null,
  }

  componentDidMount() {
    this.trendingFetching()
    this.orginalsFetching()
  }

  trendingFetching = async () => {
    this.setState({trendingStatus: STATUS.loading})
    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/trending-movies',
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        },
      )
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.results.map(each => ({
          id: each.id,
          title: each.title,
          posterPath: each.poster_path,
        }))
        this.setState({
          trendingList: updatedData,
          trendingStatus: STATUS.success,
        })
      } else {
        this.setState({trendingStatus: STATUS.failed})
      }
    } catch (e) {
      this.setState({trendingStatus: STATUS.failed})
    }
  }

  orginalsFetching = async () => {
    this.setState({originalsStatus: STATUS.loading})
    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/originals',
        {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        },
      )
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.results.map(each => ({
          id: each.id,
          title: each.title,
          posterPath: each.poster_path,
          backdropPath: each.backdrop_path,
          overview: each.overview,
        }))
        const randomIndex = Math.floor(Math.random() * updatedData.length)
        this.setState({
          originalList: updatedData,
          originalsStatus: STATUS.success,
          bannerMovie: updatedData[randomIndex],
        })
      } else {
        this.setState({originalsStatus: STATUS.failed})
      }
    } catch (e) {
      this.setState({originalsStatus: STATUS.failed})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <div className="loader" />
    </div>
  )

  renderFailure = retryFn => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/doeoev3ce/image/upload/v1774850162/Group_vzo5gc.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={retryFn}>
        Try Again
      </button>
    </div>
  )

  renderSlider = list => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {list.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <img src={each.posterPath} alt={each.title} className="movie-img" />
          </Link>
        ))}
      </Slider>
    )
  }

  renderBanner = () => {
    const {bannerMovie} = this.state
    return (
      <div
        className="background-container"
        style={{
          backgroundImage: bannerMovie
            ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url(${bannerMovie.backdropPath})`
            : 'none',
        }}
      >
        <h1 className="banner-title">{bannerMovie ? bannerMovie.title : ''}</h1>
        <p className="banner-overview">
          {bannerMovie ? bannerMovie.overview : ''}
        </p>
        <button type="button" className="show-play">
          Play
        </button>
      </div>
    )
  }

  renderTrendingSection = () => {
    const {trendingStatus, trendingList} = this.state
    switch (trendingStatus) {
      case STATUS.loading:
        return this.renderLoader()
      case STATUS.failed:
        return this.renderFailure(this.trendingFetching)
      case STATUS.success:
        return this.renderSlider(trendingList)
      default:
        return null
    }
  }

  renderOriginalsSection = () => {
    const {originalsStatus, originalList} = this.state
    switch (originalsStatus) {
      case STATUS.loading:
        return this.renderLoader()
      case STATUS.failed:
        return this.renderFailure(this.orginalsFetching)
      case STATUS.success:
        return this.renderSlider(originalList)
      default:
        return null
    }
  }

  render() {
    const {trendingStatus, originalsStatus} = this.state
    const isLoading =
      trendingStatus === STATUS.loading || originalsStatus === STATUS.loading

    return (
      <>
        <Header />
        {isLoading ? (
          <div className="loader-container" testid="loader">
            <div className="loader" />
          </div>
        ) : (
          <>
            {this.renderBanner()}
            <div className="list-container">
              <h1>Trending Now</h1>
              <div className="sliding-box">{this.renderTrendingSection()}</div>
              <h1>Originals</h1>
              <div className="sliding-box">{this.renderOriginalsSection()}</div>
            </div>
          </>
        )}
        <Footer />
      </>
    )
  }
}

export default Home
