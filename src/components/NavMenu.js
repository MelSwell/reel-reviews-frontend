import { NavLink } from 'react-router-dom'

function NavMenu({ setCurrentUser }) {
  function handleLogout() {
    window.sessionStorage.removeItem("currentUserId")
    window.localStorage.removeItem("token")
    setCurrentUser({})
  }

  return (
    <div className="nav-menu">
      <NavLink
        to="/"
        exact
        activeStyle = {{
          background: "rgba(99, 96, 96, 0.466)"
        }}
      >
        MyReviews
      </NavLink>
      <NavLink
        to="/search"
        exact
        activeStyle = {{
          background: "rgba(99, 96, 96, 0.466)"
        }}
      >
        Search
      </NavLink>
      <a href="/" onClick={handleLogout}>Logout</a>
    </div>
  )
}

export default NavMenu