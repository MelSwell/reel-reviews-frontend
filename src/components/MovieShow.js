import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Icon, Segment, Label } from 'semantic-ui-react'
import LoaderSpinner from './LoaderSpinner'

function MovieShow() {
  const [movie, setMovie] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  let { id } = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
    .then(resp => resp.json())
    .then((movie) => {
      setMovie(movie)
      setIsLoading(false)
    })
  }, [id])

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
            </div>
          </div>
        )}
      </>
    )
}

export default MovieShow

