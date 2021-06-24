import React, { useContext } from "react"
import { Router } from "@reach/router"
import { IdentityContext } from "../../identity-context"
import { Container, Heading, Button, Flex, NavLink } from "theme-ui"
import { Link } from "gatsby"

//If user is logged in below function will execute
let Dash = props => {
  const {user, identity: netlifyIdentity } = useContext(IdentityContext)

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/App"} p={2}>
          DashBoard
        </NavLink>
        {user && (
          <NavLink
            p={2}
            sx={{ cursor:'pointer' }}
            onClick={() => {
              netlifyIdentity.logout()
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
    </Container>
  )
}

//If user is not logged in below function will execute
let DashLoggedOut = props => {
  const { identity: netlifyIdentity } = useContext(IdentityContext)

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Get Stuff Done</Heading>
        <Button
          sx={{ marginTop: 2, color: "black" }}
          onClick={() => {
            netlifyIdentity.open()
          }}
        >
          Log In
        </Button>
      </Flex>
    </Container>
  )
}

function App() {
  const { user } = useContext(IdentityContext)
  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/App" />
      </Router>
    )
  }

  return (
    <Router>
      <Dash path="/App" />
    </Router>
  )
}

export default App

// if (!user) {
//   return (
//     <Router>
//       <DashLoggedOut path="/App" />
//     </Router>
//   )
// } else
// return (
//   <Router>
//     <Dash path="/App" />
//   </Router>
// )
