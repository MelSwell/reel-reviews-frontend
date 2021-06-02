import { useState } from 'react'
import { Segment, Item, Rating, Button } from 'semantic-ui-react'
import EditReviewForm from './EditReviewForm'

function MovieShowReview({ 
  id, 
  rating, 
  writtenReview, 
  username, 
  userId, 
  currentUser, 
  updateReviews,
  deleteReview
}) {
  const [isUsers,] = useState(userId === currentUser.id)
  const [isEditMode, setIsEditMode] = useState(false)

  function handleDelete() {
    fetch(`http://localhost:3000/users/${currentUser.id}/reviews/${id}`, {
      method: 'DELETE'
    })
    
    deleteReview(id)
  }

  return (
    <Segment>
      <Item>
        <Item.Content>
          <Item.Header>{username}</Item.Header>
          {!isEditMode && 
            <Item.Meta><Rating key={rating} icon='star' defaultRating={rating} maxRating={10} disabled /></Item.Meta>
          }
          <Item.Description>
            {!isEditMode ? (
              <>
                {writtenReview}
              </>
            ) : (
              <EditReviewForm 
                id={id}
                rating={rating}
                writtenReview={writtenReview}
                setIsEditMode={setIsEditMode}
                updateReviews={updateReviews}
              />
            )}  
          </Item.Description>
          {isUsers && (
            <Item.Extra>
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
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    </Segment>
  )
}

export default MovieShowReview