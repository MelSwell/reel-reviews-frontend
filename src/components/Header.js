import logo from '../assets/images/logo.png'
import NavMenu from './NavMenu'

function Header({ currentUser, setCurrentUser }) {
  return (
    <header>
      <img src={logo} alt="ReelReviews Logo"/>
      {currentUser.id ? <NavMenu setCurrentUser={setCurrentUser}/> : null}
    </header>
  )
}

export default Header