export default class Planet {
  #title;
  #customer;
  #degrees;
  #travelTime;
  #about;
  #image;
  #color;

  constructor(json) {
    this.#title = json.title;
    this.#customer = json.customer;
    this.#degrees = json.degrees;
    this.#travelTime = json.travelTime;
    this.#about = json.about;
    this.#image = json.image;
    this.#color = json.color;
  }

  getTitle = () => this.#title;
  getDegrees = () => this.#degrees;
  getTravelTime = () => this.#travelTime;
  getCustomer = () => this.#customer;
  getImage = () => this.#image;
  getAbout = () => this.#about;
  getColor = () => this.#color;
}
