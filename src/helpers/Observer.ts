
/**
 * Observable interface.
 */
export class Observer {
  update(observable: Observable): void {
    return void observable
  }
}

/**
 * Observable abstract class.
 */
export class Observable {

  #observers: Observer[]

  constructor() {
    this.#observers = new Array();
  }

  sub<T extends Observer>(observer: T): void {
    this.#observers.push(observer)
  }

  /**
   * Notify all observers.
   */
  notify(): void {
    this.#observers.forEach((observer) => {
      observer.update(this)
    })
  }

}
