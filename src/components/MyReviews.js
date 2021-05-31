import ReviewCard from './ReviewCard'

function MyReviews({ currentUser, reviews, updateReviews, deleteReview }) {

  let reviewCards
  if (reviews.length > 0) {
    reviewCards= reviews.map(review => {
      return (
        <ReviewCard 
          currentUser={currentUser} 
          key={review.id}
          review={review}
          updateReviews={updateReviews}
          deleteReview={deleteReview}
        />
      )
    })
  }

  return (
    <main className="cards-container">
      {reviews.length > 0 ? (
        <>{reviewCards}</>
      ) : (
        <h1 className="welcome">
          You haven't reviewed any movies yet. Head over to the search page and get reviewin'!
        </h1>
      )}
    </main>
  )
}

export default MyReviews