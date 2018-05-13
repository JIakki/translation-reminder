

module.exports = class Controller {
  constructor() {
    this.services = {};
  }

  service(name, service) {
    this.services[name] = service;

    return this;
  }

  getService(name) {
    return this.services[name];
  }
  
}
