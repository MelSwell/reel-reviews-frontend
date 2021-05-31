import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import MyReviews from './components/MyReviews'
import MovieShow from './components/MovieShow'
import Search from './components/Search'
import Recommendations from './components/Recommendations'
import LoggedOut from './components/LoggedOut'

function App() {
  const [reviews, setReviews] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    if (currentUser.id) {
      fetch(`http://localhost:3000/users/${currentUser.id}/reviews`)
      .then(resp => resp.json())
      .then(setReviews)
    }
  }, [currentUser])
  
  function updateReviews(id, updatedReview) {
    const index = reviews.indexOf(reviews.find(review => review.id === id))
    const updatedReviews = [...reviews]
    updatedReviews.splice(index, 1, updatedReview)
    setReviews(updatedReviews)
  }
  
  function deleteReview(id) {
    setReviews(reviews.filter(review => review.id !== id))
  }
  
  function addReview(newReview){
    setReviews([...reviews, newReview])
  }

  return (
    <div className="App">
      {(!currentUser.id) ? (
        <LoggedOut setCurrentUser={setCurrentUser} />
      ) : (
        <Switch>
          <Route exact path="/">
            <MyReviews
              currentUser={currentUser} 
              reviews={reviews}
              updateReviews={updateReviews}
              deleteReview={deleteReview}
            />
          </Route>
          <Route path="/movies/:id">
            <MovieShow />
          </Route>
          <Route path="/search">
            <Search
              currentUser={currentUser} 
              reviews={reviews}
              addReview={addReview}
              updateReviews={updateReviews}
              deleteReview={deleteReview}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </Route>
          <Route path="/recommendations/:tmdbId/:movie_title">
            <Recommendations
              currentUser={currentUser} 
              reviews={reviews}
              addReview={addReview}
              updateReviews={updateReviews}
              deleteReview={deleteReview}
            />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
