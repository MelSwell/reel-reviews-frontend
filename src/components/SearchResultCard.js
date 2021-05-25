import { useState } from 'react'
import { Card, Image, Modal, Button, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CreateReviewForm from './CreateReviewForm'

function SearchResultCard({
  id,
  title,
  posterImg,
  overview,
  releaseDate,
  director,
  averageTmdbRating,
  addReview 
}) {
  const [open, setOpen] = useState(false)
  const [isReviewMode, setisReviewMode] = useState(false)

  let displayDirector
  if (director === "none"){
    displayDirector = <p>Director Unknown</p>
  } else {
    displayDirector = <p>Directed by {director}</p>
  }

  return (
    <div className="card-overlay">
      <Card>
        <Image className="poster" src={posterImg} />
        <Card.Content>
          <Card.Header className="card">{title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <p>
            Average Rating:<br/>
            <Icon name="star" color="yellow"/>
            <span><b>{averageTmdbRating}</b></span>
          </p>
        </Card.Content>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger = {
            <Button color='black'>View</Button>
          }
        >
          <Modal.Header>Overview of {title}</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={posterImg} wrapped />
            <Modal.Description>
              {!isReviewMode ? (
              <>
                <Header>
                  <p>{releaseDate}</p>
                  {displayDirector}
                </Header>
                <p>{overview}</p>
                <p><i>Average Rating: {averageTmdbRating}</i></p>
              </>
              ) : (
                <CreateReviewForm movieId={id} addReview={addReview}/>
              )}
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Link to={`/movies/${id}`}>
              <Button color='black'>
                View Movie Details
              </Button>
            </Link>
            {!isReviewMode ? (
              <Button color='black' onClick={() => setisReviewMode(true)}>
                Write a Review
              </Button>
            ) : (
              <Button color="black" onClick={() => setisReviewMode(false)}>
                Cancel Review
              </Button>
            )}
          </Modal.Actions>
        </Modal>
      </Card>
    </div>
  )
}

export default SearchResultCard