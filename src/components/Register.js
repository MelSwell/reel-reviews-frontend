import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

function Register({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState([])

  let history = useHistory()

  function handleChange(e) {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })
    setErrors([])
  }

  function handleSubmit() {
    fetch(process.env.REACT_APP_BASE_API_URL + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.id) {
        setCurrentUser(data)
        history.push("/")
      } else {
        setErrors(data)
      }
    })
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Username</label>
        <input 
          value={formData.username}
          name="username" 
          placeholder="username" 
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          value={formData.email}
          name="email"
          placeholder="email"
          onChange={handleChange} 
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input 
          type="password"
          name="password" 
          value={formData.password} 
          placeholder="password"
          onChange={handleChange} 
          />
      </Form.Field>
      {errors && errors.map(error => {
        return <p style={{ color: "red" }}>{error}</p>
      })}
      <Button type="submit">Register</Button>
    </Form>
  )
}

export default Register