import { Observable, Observer } from './Observer'

/**
 * An Observable State.
 */
class State<Type = any> extends Observable {

  #value: Type

  constructor(initialValue: Type) {
    super()
    this.#value = initialValue
  }

  set value(value) {
    this.#value = value
    this.notify()
  }

  get value(): Type {
    return this.#value
  }
}

export type Listener<StateType> = ((state: StateType) => void)

/**
 * An observale state.
 */
export class StateListener<StateType> extends Observer {

  #state: State<StateType>
  #listener: Array<Listener<StateType>>

  constructor(state: State<StateType>) {
    super()

    this.#state = state
    this.#listener = []

    state.sub(this)
  }

  get value() { return this.#state.value }

  set value(value) { this.#state.value = value }

  addEventListener(listener: Listener<StateType>): void {
    this.#listener.push(listener)
  }

  removeEventListener(listener: Listener<StateType>): void {
    const index = this.#listener.findIndex(value => value === listener)
    if (index) {
      this.#listener.slice(index)
    }
  }

  update(state: State<StateType>): void {
    if (this.#listener.length) {
      const stateValue: StateType = state.value
      this.#listener.forEach(notify => notify(stateValue))
    }
  }
}

/**
 * The store.
 */
class Store {

  #value: Map<string, StateListener<any>>

  constructor() {
    this.#value = new Map()
  }

  get value() {
    return this.#value
  }

  put<StateType>(key: string, initialValue: StateType): StateListener<StateType> {
    const value = this.#value.get(key)
    if (!value) {
      const stateListener = new StateListener(new State<StateType>(initialValue))
      this.#value.set(key, stateListener)
      return stateListener
    }
    return value
  }

  get(key: string): StateListener<any> | undefined {
    return this.#value.get(key)
  }

}

export default Store
