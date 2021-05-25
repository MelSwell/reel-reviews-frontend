import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import MyReviews from './components/MyReviews'
import MovieShow from './components/MovieShow'
import Search from './components/Search'

function App() {
  window.sessionStorage.setItem("currentUserId", 39)
  const [reviews, setReviews] = useState([])
  const currentUserId = parseInt(window.sessionStorage.getItem("currentUserId"))
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUserId}/reviews`)
    .then(resp => resp.json())
    .then(setReviews)
  }, [currentUserId])
  
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
      <Switch>
        <Route exact path="/">
          <MyReviews 
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
      </Switch>
    </div>
  );
}

export default App;
