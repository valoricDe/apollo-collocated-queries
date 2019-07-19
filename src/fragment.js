import { filter } from 'graphql-anywhere'

export function useFragment(data, fragment, dataMapper = (data) => data) {
  return useMemo(() => dataMapper(filter(fragment, data)), [fragment, data])
}

export function fragment(Component, fragmentObject, dataMapper = (data) => data) {
  const defaultFragment =
    Object.keys(fragmentObject).length === 1 ? Object.values(fragmentObject)[0] : null

  const WrapperComponent = ({ data, fragment = defaultFragment, ...props }) => {
    if (!fragment) console.error('Please specify one fragment out of: ', fragmentObject)

    return <Component {...props} data={dataMapper(filter(fragment, data))} />
  }

  WrapperComponent.fragments = fragmentObject

  return WrapperComponent
}
