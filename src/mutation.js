import React from 'react'
import { Mutation as ApolloMutation } from 'react-apollo'
import { ApolloError } from 'apollo-client'

/**
 * function that returns component that exposes to children a mutate function or a object with functions defined by `exposeAs`
 * additionally each input to mutate is mapped to {variables: {input: ...}} by default via `mapInput` function
 *
 * eg. exposeAs: (mutation) => ({
 *   onPublish: (input) => mutation(input).then(({data}) => ...)
 * })
 */
const mutation = ({
  mutationQuery,
  exposeAs,
  mapInput = (input, fixedVariables) => ({ input: { ...input, ...fixedVariables } }),
  LoadingComponent = () => null,
}) => {
  return ({ fixedVariables = {}, children }) => (
    <ApolloMutation mutation={mutationQuery}>
      {(mutate, props) => {
        if (props.error instanceof ApolloError) {
          console.error(props.error)
        }
        if (props.loading && !props.called) {
          return <LoadingComponent {...props} />
        }

        const mappedMutate = (input, mutationProps) =>
          mutate({ variables: mapInput(input, fixedVariables), ...mutationProps })

        return children(exposeAs ? exposeAs(mappedMutate) : mappedMutate)
      }}
    </ApolloMutation>
  )
}

export default mutation
