import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ResultsRenderer from './ResultsRenderer'
import LoaderSpinner from './LoaderSpinner'

function Recommendations({ currentUser,reviews, addReview, updateReviews, deleteReview }){
  const [recommendationResults, setRecommendationResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let { tmdbId } = useParams()
  let { movie_title } = useParams()
  
  useEffect(() => {
    setIsLoading(true)
    fetch(process.env.REACT_APP_BASE_API_URL + `recommendations?tmdb_id=${tmdbId}`)
    .then(resp => resp.json())
    .then(recommendations => {
      setRecommendationResults(recommendations)
      setIsLoading(false)
    })
  }, [tmdbId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tmdbId, reviews])

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="recommendation-header">
            <h1>Recommendations based on <i>{movie_title}</i></h1> 
          </div>
          <div className="results">
            <ResultsRenderer
              currentUser={currentUser} 
              reviews={reviews}
              addReview={addReview}
              updateReviews={updateReviews}
              deleteReview={deleteReview}
              recommendationResults={recommendationResults}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Recommendations