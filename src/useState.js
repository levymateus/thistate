import React from 'react'

import { StateListener } from './helpers/Store'
import { get } from './store'

/**
 * Returns a statefull value and function to update it.
 * @param {StateListener|string} initializer - an key or an observable state.
 */
export function useState(initializer) {
  let globalState = null

  if (initializer instanceof StateListener) {
    globalState = initializer
  }
  if (typeof initializer === 'string') {
    globalState = get(initializer)
  }

  const initialState = globalState.value

  const [state, setState] = React.useState(initialState)

  const set = React.useCallback((value) => {
   globalState.value = value
  },[])

  React.useEffect(() => {
    const handleEvent = state => setState(state.value)

    globalState.addEventListener(handleEvent)

    return () => globalState.removeEventListener(handleEvent)
  }, [])

  return [state, set]
}
