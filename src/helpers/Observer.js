
/**
 * Observable interface.
 */
export class Observer {
  update(subject) {
    return subject
  }
}

/**
 * Subject abstract class.
 */
export class Subject {

  #observers

  constructor() {
    this.#observers = new Array();
  }

  sub(observer) {
    this.#observers.push(observer)
  }

  notify() {
    this.#observers.forEach((observer) => {
      observer.update(this)
    })
  }

}
