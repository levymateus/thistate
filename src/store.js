import Store from './helpers/Store'

/**
 * Retrieves an single instance of an Store of states.
 * @returns an instance of Store object
 */
export function getStore () {
  if (globalThis && !globalThis.store) {
    const store = globalThis.store = new Store()
    return store
  }
  return globalThis.store
}

/**
 * Create an state entry on the store.
 * @param {{ key: string, defaultValue: any }} param0 - the creation properties.
 * @returns an `StateListener`
 */
export function create({ key, defaultValue }) {
  const store = getStore()
  return store.put(key, defaultValue)
}

/**
 * Retriveve the `StateListener` by key.
 * @param {string} key - the state key in the store.
 */
export function get(key) {
  const store = getStore()
  return store.get(key)
}

const store = getStore()

export default store
