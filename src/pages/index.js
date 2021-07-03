import React from "react"
import { Container, Heading, Button, Flex, NavLink } from "theme-ui"
import { Link } from "gatsby"
import { IdentityContext } from "../../identity-context"

export default function Index() {
  const { user, identity: netlifyIdentity } = React.useContext(IdentityContext)

  return (
    <Container>
      <Flex as="nav" sx={{ padding: 3 }}>
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/App"} p={2}>
          DashBoard
        </NavLink>

        {user && (<NavLink p={2}>{user.user_metadata.full_name}</NavLink>)}
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1"> TODO APP</Heading>
        <p>Your Data is stored in faunadb database 'serverless-netlify-todo-new' controlled by Junaid Rasheed</p>
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