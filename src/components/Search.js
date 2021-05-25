// import { useState } from 'react'
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
  
  function searchSubmit() {
    fetch(`http://localhost:3000/search?search_term=${searchTerm}`)
    .then(resp => resp.json())
    .then(setSearchResults)
  }

  function alreadyReviewed(searchResult) {
    return reviews.find(review => review.movie.id === searchResult.id)
  }

  let results 
  if (searchResults[0] === "Sorry, we could not find a match. Please try again.") {
    results = <h1>{searchResults[0]}</h1>
  } else {
    results = searchResults.map(result => {
      const review = alreadyReviewed(result)
      if (review) {
        return (
          <ReviewCard 
            key={review.id}
            review={review}
            updateReviews={updateReviews}
            deleteReview={deleteReview}
          />
        )
      } else {
        return (
          <SearchResultCard
            key={result.id}
            {...result}
            addReview={addReview}
          />
        )
      }
    })
  }

  
  
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
      <div className="cards-container">
        {results}
      </div>
    </>
  )
}

export default Search