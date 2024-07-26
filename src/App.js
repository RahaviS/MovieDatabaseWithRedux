import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetail from './components/MovieDetail'
import SearchedMovies from './components/SearchedMovies'
import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/movies/:id" component={MovieDetail} />
    <Route exact path="/searched-movies" component={SearchedMovies} />
  </Switch>
)

export default App
