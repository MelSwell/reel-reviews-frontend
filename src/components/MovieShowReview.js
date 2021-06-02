import { useState } from 'react'
import { Segment, Item, Rating, Button } from 'semantic-ui-react'

function MovieShowReview({ id, rating, writtenReview, username, userId, currentUser }) {
  const [isUsers,] = useState(userId === currentUser.id)
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <Segment>
      <Item>
        <Item.Content>
          <Item.Header>{username}</Item.Header>
          <Item.Meta><Rating key={rating} icon='star' defaultRating={rating} maxRating={10} disabled /></Item.Meta>
          <Item.Description>
            {writtenReview}
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
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    </Segment>
  )
}

export default MovieShowReview