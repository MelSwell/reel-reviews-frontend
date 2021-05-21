import { useState, useEffect } from 'react'
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
  
  function updateReviews(id, responseObj) {
    const index = reviews.indexOf(reviews.find(review => review.id === id))
    const updatedReviews = [...reviews]
    updatedReviews.splice(index, 1, responseObj)
    setReviews(updatedReviews)
  }

  return (
    <main className="my-reviews">
      {reviews.map(review => (
        <ReviewCard 
          key={review.id+review.rating}
          review={review}
          updateReviews={updateReviews}
        />)
      )}
    </main>
  )
}

export default MyReviews