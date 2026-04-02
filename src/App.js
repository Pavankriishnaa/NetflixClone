import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Account from './components/Account'
import NotFound from './components/NotFound'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/search" component={Search} />
        <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
