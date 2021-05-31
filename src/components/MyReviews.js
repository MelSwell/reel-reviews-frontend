import ReviewCard from './ReviewCard'
import LoaderSpinner from './LoaderSpinner'

function MyReviews({ 
  currentUser, 
  reviews, 
  updateReviews, 
  deleteReview, 
  isLoading 
}) {

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
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <main className="cards-container">
          {reviews.length > 0 ? (
            <>{reviewCards}</>
          ) : (
            <h1 className="welcome">
              You haven't reviewed any movies yet. Head over to the search page and get reviewin'!
            </h1>
          )}
        </main>
      )}
    </>
  )
}

export default MyReviews