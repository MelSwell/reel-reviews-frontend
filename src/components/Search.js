import { Form, Button } from 'semantic-ui-react'
import ResultsRenderer from './ResultsRenderer'


function Search({ 
  currentUser,
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
    if (searchTerm.length > 0) {
      fetch(`http://localhost:3000/search?search_term=${searchTerm}`)
      .then(resp => resp.json())
      .then(setSearchResults)
    }
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
      <div className="results">
        <ResultsRenderer
          currentUser={currentUser} 
          reviews={reviews}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
          addReview={addReview}
          searchResults={searchResults}
        />
      </div>
    </>
  )
}

export default Search