import React, { useEffect } from "react"
import { Container, Heading, Button, Flex } from "theme-ui"
import netlifyIdentity from "netlify-identity-widget"

export default function Index() {
  useEffect(() => {
    netlifyIdentity.init({})
  })

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1"> TODO APP</Heading>
        <Button
          sx={{ marginTop: 3, color: "black" }}
          onClick={() => {
            alert("hello")
          }}
        >
          Log In
        </Button>
      </Flex>
    </Container>
  )
}
