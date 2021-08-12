import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Rating, Modal, Header, Button } from 'semantic-ui-react'
import EditReviewForm from './EditReviewForm'

function ReviewCard({
  currentUser,
  review: { id, writtenReview, rating, movie, userId, username},
  updateReviews,
  deleteReview
}) {
  const [open, setOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isUsers,] = useState(currentUser.id === userId)

  function handleDelete() {
    fetch(process.env.REACT_APP_BASE_API_URL + `users/${currentUser.id}/reviews/${id}`, {
      method: 'DELETE'
    })
    
    deleteReview(id)
  }

  let displayDirector
  if (movie.director === "none"){
    displayDirector = <p>Director Unknown</p>
  } else {
    displayDirector = <p>Directed by {movie.director}</p>
  }

  
  return (
    <div className="card-overlay">
      <Card>
        <Image className="poster" src={movie.posterImg} />
        <Card.Content>
          <Card.Header className="card">{movie.title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <p>{isUsers ? 'My Rating:' : `${username}'s Rating:`}</p>
          <Rating key={rating} icon='star' defaultRating={rating} maxRating={10} disabled />
        </Card.Content>
      
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger = {
            <Button color='black'>View</Button>
          }
        >
          <Modal.Header>{isUsers ? "Your" : `${username}'s`} Review of {movie.title}</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={movie.posterImg} wrapped />
            <Modal.Description>
              {!isEditMode ? (
                <>
                  <Header>
                    <p>{movie.releaseDate}</p>
                    {displayDirector}
                    <Rating icon='star' defaultRating={rating} maxRating={10} disabled />
                    {rating}/10 
                  </Header>
                  <p>{writtenReview}</p>
                </>
              ) : (
                <EditReviewForm 
                  id={id}
                  rating={rating}
                  writtenReview={writtenReview}
                  setIsEditMode={setIsEditMode}
                  updateReviews={updateReviews}
                  setOpen={setOpen}
                />
              )}
            </Modal.Description>
          </Modal.Content>
          
          <Modal.Actions>
            <Link to={`/movies/${movie.id}`}>
              <Button color='black'>
                View Movie Details
              </Button>
            </Link>
            {isUsers &&
              <>
                {!isEditMode ? (
                    <Button color='black' onClick={() => setIsEditMode(true)}>
                      Edit Review
                    </Button> 
                  ) : ( 
                    <Button color='black' onClick={() => setIsEditMode(false)}>
                      Cancel Editting
                    </Button>
                  )
                }
              </>
            }
            <Link to={`/recommendations/${movie.tmdbId}/${movie.title}`}>
              <Button color='green'>Get Recommendations!</Button>
            </Link>
            {isUsers && <Button color='red' onClick={handleDelete}>Delete Review</Button>}
          </Modal.Actions>
        </Modal>
      </Card>
    </div>
  )

}

export default ReviewCard