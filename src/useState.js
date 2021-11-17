import React from 'react'

import { StateListener } from './helpers/Store'
import { get } from './store'

/**
 * Returns a statefull value and function to update it.
 * @param {StateListener|string} initializer - a key or an observable state.
 */
export function useState(initializer) {
  let globalState = null

  if (!initializer) {
    throw new TypeError('Invalid arguments')
  }

  if (initializer instanceof StateListener) {
    globalState = initializer
  }

  if (typeof initializer === 'string') {
    globalState = get(initializer)

  }

  if (!globalState) {
    throw new Error('Global state was not declared')
  }

  const initialState = globalState.value

  const [state, setState] = React.useState(initialState)

  const set = React.useCallback((value) => {
   globalState.value = value
  },[])

  React.useEffect(() => {
    let unmount = false

    const handleEvent = state => {
      if (!unmount) {
        setState(state.value)
      }
    }

    globalState.addEventListener(handleEvent)

    return () => {
      globalState.removeEventListener(handleEvent)
      unmount = true
    }
  }, [])

  return [state, set]
}

export default useState
