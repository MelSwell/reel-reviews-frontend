import {Card, Image, Rating} from 'semantic-ui-react'

function ReviewCard({
  id,
  rating,
  writtenReview,
  movie
}) {

  return (
    <Card>
      <Image className="poster" src={movie.posterImg} />
      <Card.Content>
        <Card.Header className="card">{movie.title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <p>My Rating:</p>
        <Rating icon='star' defaultRating={rating} maxRating={10} disabled />
      </Card.Content>
    </Card>
  )

}

export default ReviewCard