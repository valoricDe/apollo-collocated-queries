import createFragmentContainer, { useFragment } from 'src/fragment'
import gql from 'graphql-tag'

// example for useFragment

const fragments = {
  todo: gql`
      fragment Todo_todo on Todo {
          name
          priority
      }
  `
}

const dataMapper = ({ name, priority }) => ({ name, isUrgent: priority > 6 })

export default function Todo({ data }) {
  const { name, isUrgent } = useFragment(data, fragments.todo, dataMapper)

  return <div>
    <p>Name: {name}</p>
    <p>IsUrgent: {isUrgent ? '✓' : '✕'}</p>
  </div>
}
Todo.fragments = fragments


// example for createFragmentContainer

const Component2 = createFragmentContainer(
  function Todo({ name, isUrgent }) {
    return <div>
      <p>Name: {name}</p>
      <p>IsUrgent: {isUrgent ? '✓' : '✕'}</p>
    </div>
  },
  {
    todo: gql`
        fragment Todo_todo on Todo {
          name
          priority
        }
      `
  },
  ({ name, priority }) => ({ name, isUrgent: priority > 6 }),
)
