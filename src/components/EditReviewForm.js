import { useState } from 'react'
import { Form, Button, Rating } from 'semantic-ui-react'

function EditReviewForm({ id, rating, writtenReview, setIsEditMode, updateReviews, setOpen }) {
  const [formData, setFormData] = useState({
    rating: rating,
    writtenReview: writtenReview
  })

  const currentUserId = window.sessionStorage.getItem("currentUserId")

  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(){
    fetch(`http://localhost:3000/users/${currentUserId}/reviews/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((updatedReview) => {
      updateReviews(id, updatedReview)
      setIsEditMode(false)
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
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
      <Form.Field>
        <label>Your Review</label>
        <textarea 
          cols="75"
          name="writtenReview" 
          value={formData.writtenReview} 
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit">Submit Changes</Button>
    </Form>
  )
}

export default EditReviewForm