import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const links = [
    {
      id: 1,
      path: "/",
      text: "Home",
    },
    {
      id: 2,
      path: "/about",
      text: "About",
    },
  ]

  //could use setNavbarOpen(!navbarOpen) but it may
  //depend on the previous value, so not reliable
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setNavbarOpen(false)
  }

  //<Link> and <NavLink> are used in single-page apps so that the page
  //doesnt refresh upon naviating to another page
  //add a showMenu class to the ul only if the state variable navbarOpen is true else remove the class.
  return (
    <nav className="navBar">
      <button onClick={handleToggle}>
        {navbarOpen ?
          (<MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />) :
          (<FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />)
        }
      </button>
      <ul className={`menuNav${navbarOpen ? " showMenu" : ""}`}>
        {links.map(link => {
          return (
            <li key={link.id}>
              <NavLink
                to={link.path}
                activeClassName='active-link'
                onClick={() => closeMenu()}
                exact>
                  {link.text}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
