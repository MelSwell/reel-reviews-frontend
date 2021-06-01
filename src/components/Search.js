import { useState, useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import ResultsRenderer from './ResultsRenderer'
import LoaderSpinner from './LoaderSpinner'


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
  const [isLoading, setIsLoading] = useState(false)
  const [searchHeader, setSearchHeader] = useState(searchTerm)
  
  function searchSubmit() {
    if (searchTerm.length > 0) {
      setIsLoading(true)
      fetch(`http://localhost:3000/search?search_term=${searchTerm}`)
      .then(resp => resp.json())
      .then(results => {
        setSearchResults(results)
        setSearchHeader(searchTerm)
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [reviews])

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="search-form-container">
            <Form onSubmit={searchSubmit}>
              <Form.Field>
                <label htmlFor="search">Search By Title</label>
                <input 
                  placeholder="Enter a Movie Title" 
                  id="search" 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm} 
                />
                <Button type='submit'>Submit</Button>
              </Form.Field>
            </Form>
          </div>
          <div className="results">
            {(typeof searchResults[0] !== 'string' && searchResults.length > 0) 
              && <h1>Results for <i>{searchHeader}</i></h1>}
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
      )}
    </>
  )
}

export default Search