const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
  type Query {
    todos: [Todo]!
    type Todo{
      id:ID!
      text:String!
      done:Boolean!
    }
   type Mutation{
      addTodo(text:String!) : Todo
      UpdateTodo(id:ID!) : Todo
    }
  }
`

const todos = {}
let TodoIndex = 0;

const resolvers = {
  Query: {
    todos: () => {
      return Object.values.todos
    },
  },
  Mutation : {
    addTodo : (_, {text})=>{
      TodoIndex++;
      const id = `key-${TodoIndex}`;
      todos[id] = {id,text,done:false}
      return todos[id]
    },
    UpdateTodo : (_,{id})=>{
     todos[id].done = true;
     return todos[id]

    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
