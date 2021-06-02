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
    if (sortTerm === "default") {
      sortedReviews = [...filteredReviews]
    }
    if (sortTerm ==="oldest") {
      sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_a.id - rev_b.id)
    }
    if (sortTerm === "year asc") {
      sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_a.movie.releaseDate - rev_b.movie.releaseDate)
    }
    if (sortTerm === "year desc") {
      sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_b.movie.releaseDate - rev_a.movie.releaseDate)
    }
    if (sortTerm === "rating asc") {
      sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_a.rating - rev_b.rating)
    }
    if (sortTerm === "rating desc") {
      sortedReviews = [...filteredReviews].sort((rev_a, rev_b) => rev_b.rating - rev_a.rating)
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
            {reviews.length > 0 ? (
              <>{reviewCards}</>
              ) : (
                <h1 className="welcome">
                You haven't reviewed any movies yet. Head over to the search page and get reviewin'!
              </h1>
            )}
          </main>
        </>
      )}
    </>
  )
}

export default MyReviews