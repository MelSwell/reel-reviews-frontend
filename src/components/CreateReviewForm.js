import { useState } from 'react'
import { Form, Button, Rating } from 'semantic-ui-react'

function CreateReviewForm({ movieId, addReview }) {
  const currentUserId = window.sessionStorage.getItem("currentUserId")
  const [formData, setFormData] = useState({
    rating: 1,
    writtenReview: "",
    movieId: movieId,
    userId: currentUserId
  })
  const [errors, setErrors] = useState([])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit() {
    fetch(`http://localhost:3000/users/${currentUserId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(newReview => {
      if (newReview.id) {
        addReview(newReview)
      } else {
        setErrors(newReview)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        {errors && errors.map(e => <p key={e} style={{ color: "red" }}>{e}</p>)}
        <label>Rating: {formData.rating}</label>
        <input
          type='range'
          name="rating"
          min={1}
          max={10}
          value={formData.rating}
          onChange={handleChange}
        />
        <br />
        <Rating icon='star' rating={formData.rating} maxRating={10} />
      </Form.Field>
      <Form.Field className="form-review">
        <label>Your Review</label>
        <textarea 
          cols="75"
          name="writtenReview" 
          value={formData.writtenReview} 
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit">Submit Review</Button>
    </Form>
  )
}

export default CreateReviewForm