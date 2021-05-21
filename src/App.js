import { Switch, Route } from 'react-router-dom'
import MyReviews from './components/MyReviews'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MyReviews />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
