import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard'
import LoaderSpinner from './LoaderSpinner'

function UserShow({ currentUser }) {
  const [usersReviews, setUsersReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  let { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3000/users/${id}/reviews`)
    .then(resp => resp.json())
    .then(reviews => {
      setUsersReviews(reviews)
      fetch(`http://localhost:3000/users/${id}`)
      .then(resp => resp.json())
      .then(user => {
        setUsername(user.username)
        setIsLoading(false)
      })
    })
  }, [id])

  let reviewCards
  if (usersReviews.length > 0) {
    reviewCards = usersReviews.map(review => {
      return (
        <ReviewCard 
          key={review.id}
          review={review}
          currentUser={currentUser}
        />
      )
    })
  }

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
        <h2 className="user-show-header">{username}'s Reviews</h2>
        <main className="cards-container">
          {usersReviews.length > 0 ? (
            <>{reviewCards}</>
          ) : (
            <h1 className="welcome">
              {username} hasn't reviewed any movies yet.
            </h1>
          )}
        </main>
        </>
      )}
    </>
  )
}

export default UserShow