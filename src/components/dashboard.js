import React, { useContext, useRef, useReducer } from "react"
import {
  Container,
  Flex,
  Heading,
  Button,
  Input,
  Label,
  NavLink,
  Checkbox
} from "theme-ui"
import { useMutation, gql, useQuery, refetch } from "@apollo/client"
import { Link } from "@reach/router"
import { IdentityContext } from "../../identity-context"

const ADD_TODOS = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`
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
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE)
  const { loading, error, data } = useQuery(GET_TODOS)
  const [todos, dispatch] = useReducer(todosReducer, [])
  const [addTodo] = useMutation(ADD_TODOS)
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
        onSubmit={async e => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } })
          // dispatch({ type: "addTodo", payload: inputRef.current.value })
          inputRef.current.value = ""
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span style={{ paddingTop: "10px" }}>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1, color: "black" }}>Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>loading ...</div> : null}
        {error ? <div>{error.message} </div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {todos.map(todo => (
              <Flex
                as="li"
                onClick={async () => {
                  console.log("updateTodoDone");
                  await updateTodoDone({ variables: { id: todo.id } });
                  console.log("refetching");
                  await refetch();
                }}
              >
                <Flex as="li">
                  <Checkbox checked={todo.done} />
                  <span>{todo.value}</span>
                </Flex>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  )
}
