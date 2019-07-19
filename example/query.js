import * as React from 'react'
import query from 'src/query'
import Todo from 'example/fragment'

const TodoQuery = query({
  query: gql`
    query fetchTodo($input: TodoInput!) {
      getTodo(input: $input) {
        ...Todo_todo
      }
    }
    ${Todo.fragments.todo}
  `,
  variablesMapper: (input) => ({ input }),
})

export default function Component() {
  return (
    <TodoQuery variables={{ id, version }} pollInterval={5000}>
      {({
        data: { getTodo: todo },
        // refetch,
        // subscribeToMore,
      }) => (
        <div>
          <h1>Todo Details</h1>
          <Todo data={todo} />
        </div>
      )}
    </TodoQuery>
  )
}
