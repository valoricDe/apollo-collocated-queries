import React from 'react'
import { Query as ApolloQuery } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import useVariable from 'src/lib/useVariable'

/**
 * function that returns Query Component
 * @param query
 * @param variablesMapper
 * @param LoadingComponent
 * @param ErrorComponent
 * @param partialRefetch
 * @returns {function(*): *}
 */

const query = ({
  query,
  variablesMapper = (input) => input,
  LoadingComponent = () => null,
  ErrorComponent = () => console.error() || null,
  partialRefetch = true,
}) => {
  const Query = ({ variables = {}, children, pollInterval = 0 }) => {
    const [renderedOnce, setRenderedOnce] = useVariable(false)

    return (
      <ApolloQuery
        partialRefetch={partialRefetch}
        query={query}
        variables={variablesMapper(variables)}
        pollInterval={pollInterval}
      >
        {(props) => {
          if (props.error instanceof ApolloError) {
            return <ErrorComponent {...props} />
          }
          if ((props.loading && !renderedOnce) || !Object.keys(props.data).length) {
            return <LoadingComponent {...props} />
          }

          if (!renderedOnce) {
            setRenderedOnce(true)
          }
          return children(props)
        }}
      </ApolloQuery>
    )
  }
  /*Query.propTypes = {
    variables: PropTypes.any,
    children: PropTypes.any,
    data: PropTypes.any,
    error: PropTypes.any,
    loading: PropTypes.any,
    partialRefetch: PropTypes.bool,
    query: PropTypes.any,
    variablesMapper: PropTypes.func,
  }*/
  return Query
}

/*query.propTypes = {
  ErrorComponent: PropTypes.any,
  LoadingComponent: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  partialRefetch: PropTypes.bool,
  query: PropTypes.any,
  variablesMapper: PropTypes.func,
}*/

export default query
