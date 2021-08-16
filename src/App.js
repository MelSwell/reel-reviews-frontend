import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import MyReviews from './components/MyReviews'
import MovieShow from './components/MovieShow'
import Search from './components/Search'
import Recommendations from './components/Recommendations'
import LoggedOut from './components/LoggedOut'
import Header from './components/Header'
import UserShow from './components/UserShow'

function App() {
  const [reviews, setReviews] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const token = window.localStorage.getItem("token")
  
  useEffect(() => {
    if (currentUser.id) {
      setIsLoading(true)
      fetch(process.env.REACT_APP_BASE_API_URL + `users/${currentUser.id}/reviews`)
      .then(resp => resp.json())
      .then(reviews => {
        setReviews(reviews)
        setIsLoading(false)
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      fetch(process.env.REACT_APP_BASE_API_URL + '/auto-login', {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then(resp => resp.json())
      .then(user => {
        setCurrentUser(user)
      })
    }
  }, [token])
  
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
    if (reviews.length > 0) {
      setReviews([newReview, ...reviews])
    } else {
      setReviews([newReview])
    }
  }

  return (
    <div className="App">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      {(!token) ? (
        <LoggedOut setCurrentUser={setCurrentUser} />
      ) : (
        <Switch>
          <Route exact path="/">
            <MyReviews
              isLoading={isLoading}
              currentUser={currentUser} 
              reviews={reviews}
              updateReviews={updateReviews}
              deleteReview={deleteReview}
            />
          </Route>
          <Route path="/movies/:id">
            <MovieShow 
              reviews={reviews}
              currentUser={currentUser}
              addReview={addReview}
              updateReviews={updateReviews}
              deleteReview={deleteReview}
            />
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
          <Route path="/users/:id/reviews">
            <UserShow 
              currentUser={currentUser}
            />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
