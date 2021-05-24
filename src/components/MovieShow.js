import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

  let actors
  let genres
  let keywords
  if (!isLoading){
    if (movie.cast !== ""){
      actors = movie.cast.split(", ").map((actor, idx) => <li key={actor+idx}>{actor}</li>)
    }
    if (movie.genres !== ""){
      genres = movie.genres.split(", ").map((g, idx) => <li key={g+idx}>{g}</li>)
    }
    if (movie.keywords !== ""){
      keywords = movie.keywords.split(", ").map((k, idx) => <li key={k+idx}>{k}</li>)
    }
  }


  return (
    <div className="movie-show-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-show-header">
          <h1>{movie.title}</h1>
          {movie.director !== "none" && <iframe 
          width="560" 
          height="315" 
          src={movie.trailer} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          >
          </iframe>}
          <h3>Plot Summary:</h3>
          <p>{movie.overview}</p>
          <h3>Average Rating:</h3>
          <p>{movie.averageTmdbRating}</p>
          <h3>Directed By:</h3>
          {movie.director !== "none" ? <p>{movie.director}</p> : <p>unknown</p>}
          {actors !== undefined && <><h3>Starring:</h3><ul>{actors}</ul></>}
          {genres !== undefined && <><h3>Genres:</h3><ul>{genres}</ul></>}
          {keywords !== undefined && <><h3>Keywords:</h3><ul>{keywords}</ul></>}
        </div>
      )}
    </div>
    )
}

export default MovieShow

