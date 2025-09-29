export default class Planet {
  #title;
  #customer;
  #degrees;
  #travelTime;

  constructor(json) {
    this.#title = json.title;
    this.#customer = json.customer;
    this.#degrees = json.degrees;
    this.#travelTime = json.travelTime;
  }

  getTitle = () => this.#title;
  getDegrees = () => this.#degrees;
  getTravelTime = () => this.#travelTime;
  getCustomer = () => this.#customer;
}
