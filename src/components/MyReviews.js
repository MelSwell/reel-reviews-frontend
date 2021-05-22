import { useState, useEffect } from 'react'
import { Rating } from 'semantic-ui-react'
import ReviewCard from './ReviewCard'

function MyReviews() {
  const [reviews, setReviews] = useState([])
  window.sessionStorage.setItem("currentUserId", 40)
  const currentUserId = parseInt(window.sessionStorage.getItem("currentUserId"))

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUserId}/reviews`)
    .then(resp => resp.json())
    .then(setReviews)
  }, [currentUserId])
  
  function updateReviews(id, updatedReview) {
    const index = reviews.indexOf(reviews.find(review => review.id === id))
    const updatedReviews = [...reviews]
    updatedReviews.splice(index, 1, updatedReview)
    setReviews(updatedReviews)
  }

  function deleteReview(id) {
    setReviews(reviews.filter(review => review.id !== id))
  }

  return (
    <main className="my-reviews">
      {reviews.map(review => (
        <ReviewCard 
          key={review.id+review.writtenReview+review.rating}
          review={review}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
        />)
      )}
    </main>
  )
}

export default MyReviews