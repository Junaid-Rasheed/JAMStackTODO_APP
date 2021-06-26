import React, { useContext, useRef, useReducer } from "react"
import {
  Container,
  Flex,
  Button,
  Input,
  Label,
  NavLink,
  Checkbox,
} from "theme-ui"
import { Link } from "@reach/router"
import { IdentityContext } from "../../identity-context"


//Reducer Actions
const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state]
    case "toggleTodoDone":
      const newState = [...state]
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      }
      return newState
  }
}

export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext)

  const [todos, dispatch] = useReducer(todosReducer, [])
  
  const inputRef = useRef()


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
            sx={{ cursor: "pointer" }}
            onClick={() => {
              netlifyIdentity.logout()
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex
        as="form"
        onSubmit={e => {
          e.preventDefault()
          dispatch({ type: "addTodo", payload: inputRef.current.value })
          inputRef.current.value = ""
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span style={{ paddingTop: "10px" }}>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1, color: "black" }}>Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        <ul sx={{ listStyleType: "none" }}>
          {todos.map((todo, i) => (
            <Flex
              as="li"
              onClick={() => {
                dispatch({
                  type: "toggleTodoDone",
                  payload: i,
                })
              }}
            >
              <Checkbox checked={todo.done} />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  )
}
