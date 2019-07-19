import * as React from 'react'
import mutation from 'src/mutation'
import Todo from 'example/fragment'

const TodoMutation = mutation({
  mutationQuery: gql`
    mutation updateTodo($input: UpdateTodoInput!) {
      updateTodo(input: $input) {
        ...Todo_todo
      }
    }
    ${Todo.fragments.todo}
  `,
  mapInput: (input) => ({ input }),
  exposeAs: (mutation) => ({
    updateTodo: (input) => mutation(input).then(({ data }) => data.updateTodo),
  }),
})

export default function Component() {
  return (
    <TodoMutation>
      {({ updateTodo }) => (
        <ModifyTodoNoteItem
          scope={scope}
          document={todo}
          notify={triggerNotification}
          updateNote={(note) => updateTodo({ id, note })}
        />
      )}
    </TodoMutation>
  )
}
