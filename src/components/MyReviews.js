import { useState } from 'react'
import ReviewCard from './ReviewCard'
import LoaderSpinner from './LoaderSpinner'
import ReviewsFilter from './ReviewsFilter'

function MyReviews({ 
  currentUser, 
  reviews, 
  updateReviews, 
  deleteReview, 
  isLoading 
}) {
  const [filterTerm, setFilterTerm] = useState("")
  const [sortTerm, setSortTerm] = useState("default")

  let filteredReviews
  if (reviews.length > 0) {
    filteredReviews = reviews.filter(review => {
      return review.movie.title.toLowerCase().includes(filterTerm.toLowerCase())
    })
  }

  let sortedReviews
  if (reviews.length > 0) {
    switch (sortTerm) {
      case "default":
        sortedReviews = [...filteredReviews]
        break;
      case "oldest": 
        sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_a.id - rev_b.id)
        break;
      case "year asc":
        sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_a.movie.releaseDate - rev_b.movie.releaseDate)
        break;
      case "year desc": 
        sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_b.movie.releaseDate - rev_a.movie.releaseDate)
        break;
      case "rating asc": 
        sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_a.rating - rev_b.rating)
        break;
      case "rating desc":
        sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_b.rating - rev_a.rating)
        break;
      default:
        sortedReviews = [...filteredReviews]
    }
  }
  
  
  let reviewCards
  if (reviews.length > 0) {
    reviewCards = sortedReviews.map(review => {
      return (
        <ReviewCard 
          currentUser={currentUser} 
          key={review.id}
          review={review}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
        />
      )
    })
  }

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <ReviewsFilter 
            filterTerm={filterTerm}
            setFilterTerm={setFilterTerm}
            sortTerm={sortTerm}
            setSortTerm={setSortTerm}
          />
          <main className="cards-container">
            {!currentUser.id && <LoaderSpinner />}
            {reviews.error ? (
              <h1 className="welcome">You haven't reviews any movies yet. Try searching for a movie on the search page!</h1> 
              ) : (
              reviewCards
            )}
          </main>
        </>
      )}
    </>
  )
}

export default MyReviews