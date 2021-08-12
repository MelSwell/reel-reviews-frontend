import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
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
    fetch(process.env.REACT_APP_BASE_API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.id) {
        setCurrentUser(data)
        window.sessionStorage.setItem("currentUserId", data.id)
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
        <label>Password</label>
        <input 
          type="password"
          name="password" 
          value={formData.password} 
          placeholder="password"
          onChange={handleChange} 
          />
      </Form.Field>
      {errors && <p style={{ color: "red" }}>{errors[0]}</p>}
      <Button type="submit">Login</Button>
    </Form>
  )
}

export default Login