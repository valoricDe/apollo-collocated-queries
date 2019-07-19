import { useRef } from 'react'

const useVariable = (initialValue) => {
  const ref = useRef([
    initialValue,
    (param) => {
      ref.current[0] = typeof param === 'function' ? param(ref.current[0]) : param
    },
  ])
  return ref.current
}

export default useVariable
