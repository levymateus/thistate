import { Subject, Observer } from './Observer'

/**
 * An Subject State.
 */
class State extends Subject {

  #value

  constructor(initialValue) {
    super()
    this.#value = initialValue
  }

  set value(value) {
    this.#value = value
    this.notify(this)
  }

  get value() {
    return this.#value
  }
}

/**
 * An observale state.
 */
export class StateListener extends Observer {

  #listener
  #subject

  constructor(subject) {
    super()

    this.#subject = subject
    this.#listener = []

    subject.sub(this)
  }

  get value() { return this.#subject.value }

  set value(value) { this.#subject.value = value }

  addEventListener(hanlder) {
    this.#listener.push(hanlder)
  }

  removeEventListener(handler) {
    const index = this.#listener.findIndex(value => value === handler)
    if (index) {
      this.#listener.slice(index)
    }
  }

  update(subject) {
    if (this.#listener.length) {
      this.#listener.forEach(notify => notify(subject))
    }
  }
}

/**
 * The store.
 */
class Store {

  #value

  constructor() {
    this.#value = new Map()
  }

  get value() {
    return this.#value
  }

  put(key, initialValue) {
    const value = this.#value.get(key)
    if (!value) {
      const stateListener = new StateListener(
        new State(initialValue),
        initialValue
      )
      this.#value.set(key, stateListener)
      return stateListener
    }
    return value
  }

  get(key) {
    return this.#value.get(key)
  }

}

export default Store