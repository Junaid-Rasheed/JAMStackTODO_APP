import React, { useContext } from "react"
import { Router } from "@reach/router"
import { IdentityContext } from "../../identity-context"
import { Container, Heading, Button, Flex, NavLink } from "theme-ui"
import { Link } from "gatsby"
import Dash from "../components/dashboard"

let DashLoggedOut = props => {
  const { identity: netlifyIdentity } = useContext(IdentityContext)

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <NavLink as={Link} to="/" p={2}>
          Back To Home
        </NavLink>
        <Heading as="h1" sx={{ padding: 3 }}>
          Get Stuff Done
        </Heading>
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