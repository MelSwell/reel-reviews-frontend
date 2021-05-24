import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Rating, Modal, Header, Button } from 'semantic-ui-react'
import EditReviewForm from './EditReviewForm'

function ReviewCard({
  review: { id, writtenReview, rating, movie},
  updateReviews,
  deleteReview
}) {
  const [open, setOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const currentUserId = window.sessionStorage.getItem("currentUserId")

  function handleDelete() {
    fetch(`http://localhost:3000/users/${currentUserId}/reviews/${id}`, {
      method: 'DELETE'
    })
    
    deleteReview(id)
  }
  
  return (
    <div className="card-overlay">
      <Card>
        <Image className="poster" src={movie.posterImg} />
        <Card.Content>
          <Card.Header className="card">{movie.title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <p>My Rating:</p>
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
          <Modal.Header>Your Review of {movie.title}</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={movie.posterImg} wrapped />
            <Modal.Description>
              {!isEditMode ? (
                <>
                  <Header>
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
            {!isEditMode ? (
              <Button color='black' onClick={() => setIsEditMode(true)}>
                Edit Review
              </Button> 
            ) : ( 
              <Button color='black' onClick={() => setIsEditMode(false)}>
                Cancel Editting
              </Button>
            )}
            <Button color='red' onClick={handleDelete}>Delete Review</Button>
          </Modal.Actions>
        </Modal>
      </Card>
    </div>
  )

}

export default ReviewCard