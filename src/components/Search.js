import { useState, useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import SearchResultCard from './SearchResultCard'
import ReviewCard from './ReviewCard'


function Search({ 
  reviews, 
  updateReviews, 
  deleteReview, 
  addReview,  
  searchTerm, 
  setSearchTerm, 
  searchResults,
  setSearchResults 
}) {
  const [reviewedResults, setReviewedResults] = useState([])
  const [unReviewedResults, setUnReviewedResults] = useState([])
  
  function searchSubmit() {
    fetch(`http://localhost:3000/search?search_term=${searchTerm}`)
    .then(resp => resp.json())
    .then(setSearchResults)
  }

  
  useEffect(() => {
    function alreadyReviewed(searchResult) {
      return reviews.find(review => review.movie.id === searchResult.id)
    }

    const tempReviewedResults = []
    const tempUnReviewedResults = []

    function checkIfReviewed(result, callback) {
      let review = alreadyReviewed(result)
      if (review) {
        tempReviewedResults.push(review)
      } else {
        tempUnReviewedResults.push(result)
      }
      callback()
    }
    
    let waiting = searchResults.length
    function finish(){
      waiting--
      if (waiting === 0){
        setReviewedResults([ ...tempReviewedResults])
        setUnReviewedResults([ ...tempUnReviewedResults])
      }
    }

    searchResults.forEach(result => checkIfReviewed(result, finish))
  }, [searchResults, reviews])
  
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

  const searchCards = unReviewedResults.map(result => {
    return (
      <SearchResultCard
        key={result.id}
        {...result}
        addReview={addReview}
      />
    )
  })

  return (
    <>
      <Form onSubmit={searchSubmit}>
        <Form.Field>
          <label htmlFor="search">Find Movies</label>
          <input 
            placeholder="Enter a Movie Title" 
            id="search" 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm} 
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      <div className="results">
        <div className="cards-container">
          {searchCards}
        </div>
        {reviewCards && (
          <>
            <h1>Results You've Already Reviewed</h1>
            <div className="cards-container reviewed">
              {reviewCards}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Search