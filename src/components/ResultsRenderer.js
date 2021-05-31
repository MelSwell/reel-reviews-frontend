import { useState, useEffect } from 'react'
import SearchResultCard from './SearchResultCard'
import ReviewCard from './ReviewCard'

function ResultsRenderer({
  currentUser,
  reviews,
  updateReviews, 
  deleteReview, 
  addReview,
  searchResults,
  recommendationResults
}) {
  const [reviewedResults, setReviewedResults] = useState([])
  const [unReviewedResults, setUnReviewedResults] = useState([])

  useEffect(() => {
    const tempReviewedResults = []
    const tempUnReviewedResults = []
     
    function alreadyReviewed(searchOrRecResult) {
      return reviews.find(review => review.movie.id === searchOrRecResult.id)
    }

    function categorizeResult(result) {
      let review = alreadyReviewed(result)
      if (review) {
        tempReviewedResults.push(review)
      } else {
        tempUnReviewedResults.push(result)
      }
    }
  
    if (searchResults) {
      searchResults.forEach(result => categorizeResult(result))
    }

    if (recommendationResults) {
      recommendationResults.forEach(result => categorizeResult(result))
    }

    setReviewedResults(tempReviewedResults)
    setUnReviewedResults(tempUnReviewedResults)

  }, [searchResults, reviews, recommendationResults])
  
  let reviewCards
  if (reviewedResults.length > 0){
    reviewCards = reviewedResults.map(review => {
      return (
        <ReviewCard 
          key={review.id+review.movie.id+review.movie.tmdbId}
          currentUser={currentUser}
          review={review}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
        />
      )
    })
  }
    
  let searchCards
  if (searchResults && searchResults[0] === "Sorry, we could not find a match. Please try again.") {
    searchCards = <h1>{searchResults[0]}</h1>
  } 
  else if (recommendationResults && recommendationResults[0] === "Sorry, we could not find any recommendations based on this movie."){
    searchCards = <h3>{recommendationResults[0]}</h3>
  } else {
    searchCards = unReviewedResults.map(result => {
      return (
        <SearchResultCard
          key={result.tmdbId}
          {...result}
          addReview={addReview}
        />
      )
    })
  }

  return (
    <>
      <div className="cards-container">
        {recommendationResults && recommendationResults.length > 0 ? searchCards.reverse() : searchCards}
      </div>
      {reviewCards && (
        <>
          <h1>Results you've already reviewed</h1>
          <div className="cards-container reviewed">
            {reviewCards}
          </div>
        </>
      )}
    </>
  )
}

export default ResultsRenderer