import { useState, useEffect } from 'react'
import ReviewCard from './ReviewCard'

function MyReviews() {
  const [reviews, setReviews] = useState([])
  window.sessionStorage.setItem("currentUserId", 38)
  const currentUserId = parseInt(window.sessionStorage.getItem("currentUserId"))

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUserId}/reviews`)
    .then(resp => resp.json())
    .then(setReviews)
  }, [currentUserId])

  const reviewCards = reviews.map(review => {
    return (
      <ReviewCard 
        key={review.id}
        {...review}
      />
    )
  })

  console.log(reviewCards)
  
  return (
    <main className="my-reviews">
      {reviewCards}
    </main>
  )
}

export default MyReviews