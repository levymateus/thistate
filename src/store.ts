import Store, { StateListener } from './helpers/Store'

type GlobalThis = { store?: null | Store }

const global: GlobalThis = (globalThis as any) as GlobalThis

/**
 * Retrieves an single instance of an Store of states.
 * @returns an instance of Store object
 */
export function getStore (): Store {
  if (global && !global.store) {
    const store = global.store = new Store()
    return store
  }
  return global.store as Store
}

type StateProps = { key: string, defaultValue: any }

/**
 * Create an state entry on the store.
 * @param {{ key: string, defaultValue: any }} param0 - the creation properties.
 * @returns an `StateListener`
 */
export function create<StateType>({ key, defaultValue }: StateProps): StateListener<StateType> {
  const store = getStore()
  return store.put<StateType>(key, defaultValue)
}

/**
 * Retriveve the `StateListener` by key.
 * @param {string} key - the state key in the store.
 */
export function get(key: string): StateListener<any> | undefined {
  const store = getStore()
  return store.get(key)
}

const store = getStore()

export default store
