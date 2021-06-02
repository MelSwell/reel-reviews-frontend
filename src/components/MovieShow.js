import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Icon, Segment, Label, Button, Item } from 'semantic-ui-react'
import LoaderSpinner from './LoaderSpinner'
import MovieShowReview from './MovieShowReview'
import CreateReviewForm from './CreateReviewForm'

function MovieShow({ reviews, currentUser, addReview, updateReview, deleteReview }) {
  const [movie, setMovie] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isReviewedByUser, setIsReviewedByUser] = useState(false)
  let { id } = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
    .then(resp => resp.json())
    .then((movie) => {
      setMovie(movie)
      setIsLoading(false)
      setIsReviewedByUser(movie.reviews.some(r => r.userId === currentUser.id))
    })
  }, [id, reviews, currentUser])

  let keywords
  if (!isLoading) {
    keywords = movie.keywords.split(", ").map((kw, idx) => {
      return (
        <Label key={kw+idx}>
          {kw}
        </Label>
      )
    })
  }
  
  let movieShowReviews
  if (!isLoading) {
    movieShowReviews = movie.reviews.map(review => {
      return (
        <MovieShowReview 
          key={review.id}
          {...review}
          currentUser={currentUser}
        />
      )
    })
  }

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
        ) : (
          <div className="movie-show-container">
            <div className="movie-show-header">
              <div className="movie-header-backdrop">
                <img className="movie-backdrop" src={movie.backdropImg} alt={`${movie.title} background`} />
              </div>
              <div className="background-image-overlay"></div>
              <div className="movie-header-overlay">
                <div className="movie-poster">
                  <img src={movie.posterImg} alt={`${movie.title} poster`} />
                </div>
                <div className="movie-header-details">
                  <div className="movie-title">
                    <h1>{movie.title} ({movie.releaseDate})</h1>
                  </div>
                  <div className="movie-rating">
                    <h3>Average Rating: <Icon name="star" size="small" color="yellow"/>{movie.averageTmdbRating}</h3>
                  </div>
                  <div className="movie-director">
                    <h3>Directed By: {movie.director !== "none" ? `${movie.director}` : 'unknown'}</h3>
                  </div>
                  {movie.cast !== "" ? (
                    <div className="movie-cast">
                      <h3>Starring: </h3>
                      <p><i>{movie.cast}</i></p>
                    </div> 
                  ) : (
                    null
                  )}
                  <div className="movie-summary">
                    <h3>Plot Summary:</h3>
                    <p>{movie.overview}</p>
                  </div>
                  {movie.genres !== "" ? (
                    <div className="movie-genres">
                      <h3>Genres: </h3>
                      <p><i>{movie.genres}</i></p>
                    </div>
                  ) : (
                    null
                  )}
                  <div className="recommendations-button">
                    <Link to={`/recommendations/${movie.tmdbId}/${movie.title}`}>
                      <Button color='green'>Get Recommendations!</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="movie-show-details">
              {movie.trailer !== "none" && (
                <iframe 
                width="560" 
                height="315" 
                src={movie.trailer} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                >
                </iframe>
              )}
              <Segment className="movie-keywords">
                <div className="keywords-inner">
                  <h5>Keywords:</h5>
                  {movie.keywords !== "" ? <>{keywords}</> : <h3>None Found</h3>}
                </div>
              </Segment>
              {!isReviewedByUser && (
                <div className="movie-show-reviews">
                  <CreateReviewForm movieId={movie.id} addReview={addReview}/>
                </div>
              )}
              { movie.reviews.length > 0 &&
                <Item.Group className="movie-show-reviews">
                  <h3>Reviews:</h3>
                  {movieShowReviews}
                </Item.Group>
              }
            </div>
          </div>
        )}
      </>
    )
}

export default MovieShow

