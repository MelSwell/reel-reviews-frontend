import ReviewCard from './ReviewCard'

function MyReviews({ reviews, updateReviews, deleteReview}) {
  return (
    <main className="cards-container">
      {reviews.map(review => (
        <ReviewCard 
          key={review.id}
          review={review}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
        />)
      )}
    </main>
  )
}

export default MyReviews