import { useState, useEffect } from 'react'
import SearchResultCard from './SearchResultCard'
import ReviewCard from './ReviewCard'

function ResultsRenderer({
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
    
    //temporarily hold the categorized movies during the course of forEach loop.
    //use them to set state at the end of the loop
    const tempReviewedResults = []
    const tempUnReviewedResults = []
    

    
    //helper checks if movie is already amongst the user's reviews, 
    //returns the review object itself when movie is already reviewed
    function alreadyReviewed(searchOrRecResult) {
      return reviews.find(review => review.movie.id === searchOrRecResult.id)
    }

    //the job for the forEach. Calls alreadyReviewed on each result and 
    //pushes movie into appropr. array. Calls on finish() after evaluating each result
    function checkIfReviewed(result, callback) {
      let review = alreadyReviewed(result)
      if (review) {
        tempReviewedResults.push(review)
      } else {
        tempUnReviewedResults.push(result)
      }
      callback()
    }
    
    //callback to pass to checkIfReviewed; keeps a count of how many results need 
    //to still be evaluated, and sets state with temp arrays when there are none left
    let waiting
    if (searchResults) {
      waiting = searchResults.length
    }
    if (recommendationResults) {
      waiting = recommendationResults.length
    }
    function finish(){
      waiting--
      if (waiting === 0){
        setReviewedResults(tempReviewedResults)
        setUnReviewedResults(tempUnReviewedResults)
      }
    }
    
    if (searchResults) {
      searchResults.forEach(result => checkIfReviewed(result, finish))
    }

    if (recommendationResults) {
      recommendationResults.forEach(result => checkIfReviewed(result, finish))
    }

  }, [searchResults, reviews, recommendationResults])
  
  let reviewCards
  if (reviewedResults.length > 0){
    reviewCards = reviewedResults.map(review => {
      return (
        <ReviewCard 
          key={review.id}
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
  } else {
    searchCards = unReviewedResults.map(result => {
      return (
        <SearchResultCard
          key={result.id}
          {...result}
          addReview={addReview}
        />
      )
    })
  }

  return (
    <>
      <div className="cards-container">
        {searchCards}
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