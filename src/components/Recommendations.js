import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SearchResultCard from './SearchResultCard'
import ReviewCard from './ReviewCard'

function Recommendations({ addReview }){
  const [recommendationResults, setRecommendationResults] = useState([])
  let { tmdbId } = useParams()
  let { movie_title } = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:3000/recommendations?tmdb_id=${tmdbId}`)
    .then(resp => resp.json())
    .then(setRecommendationResults)
  }, [tmdbId])

  const results = recommendationResults.map(result => {
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
      <h1>Recommendations based on <i>{movie_title}</i></h1> 
      <div className="cards-container">
        {results.reverse()}
      </div>
    </>
  )
}

export default Recommendations