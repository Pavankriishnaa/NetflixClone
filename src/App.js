import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login'
import Account from './components/Account'
import NotFound from './components/NotFound'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import SearchContext from './context/SearchContext' // Update path if needed
import './App.css'

const STATUS = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
  noResults: 'NO_RESULTS',
}

class App extends Component {
  state = {
    searchInput: '',
    moviesList: [],
    status: STATUS.initial,
  }

  onChangeSearchInput = text => {
    this.setState({searchInput: text})
  }

  getSearchResults = async () => {
    const {searchInput} = this.state
    if (searchInput.trim() === '') return

    this.setState({status: STATUS.loading})
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

  render() {
    const {searchInput, moviesList, status} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          moviesList,
          status,
          onChangeSearchInput: this.onChangeSearchInput,
          getSearchResults: this.getSearchResults,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
