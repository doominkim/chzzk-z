export class Chzzk {
  #messages;

  constructor() {
    this.#messages = [];
  }

  addMessage(message: string): void {
    this.#messages.push(message);
  }

  getMessages() {
    return this.#messages;
  }
}
