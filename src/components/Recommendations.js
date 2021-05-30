import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ResultsRenderer from './ResultsRenderer'

function Recommendations({ reviews, addReview, updateReviews, deleteReview }){
  const [recommendationResults, setRecommendationResults] = useState([])
  let { tmdbId } = useParams()
  let { movie_title } = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:3000/recommendations?tmdb_id=${tmdbId}`)
    .then(resp => resp.json())
    .then(setRecommendationResults)
  }, [tmdbId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tmdbId])

  return (
    <>
      <h1>Recommendations based on <i>{movie_title}</i></h1> 
      <div className="results">
        <ResultsRenderer 
          reviews={reviews}
          addReview={addReview}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
          recommendationResults={recommendationResults}
        />
      </div>
    </>
  )
}

export default Recommendations