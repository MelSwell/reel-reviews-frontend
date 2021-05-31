import { useState } from 'react'
import { Divider, Grid, Segment, Button } from 'semantic-ui-react'
import Login from './Login'
import Register from './Register'

function LoggedOut ({ setCurrentUser }) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  function toggleMode() {
    setIsLoginMode(isLoginMode => !isLoginMode)
    setIsRegisterMode(isRegisterMode => !isRegisterMode)
  }

  return (
    <div className="login">
      <Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
            {isLoginMode && <Login setCurrentUser={setCurrentUser} />}
            {isRegisterMode && <Button onClick={toggleMode}>Login</Button>}
          </Grid.Column>
          <Grid.Column>
            {isRegisterMode && <Register setCurrentUser={setCurrentUser}/>}
            {isLoginMode && <Button onClick={toggleMode}>Register</Button>}
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  )
}

export default LoggedOut