import { Switch, Route } from 'react-router-dom'
import MyReviews from './components/MyReviews'
import MovieShow from './components/MovieShow'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MyReviews />
        </Route>
        <Route path="/movies/:id">
          <MovieShow />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
