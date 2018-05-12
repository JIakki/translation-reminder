const ctrls = {
  translate: require('./translate')
}

module.exports = class Controllers {
  constructor(ctrl) {
    // now this controller has access to this
    this.ctrl = ctrls[ctrl];
    this.services = {};
  }

  service(name, service) {
    this.services[name] = service;

    return this;
  }

  exec(data) {
    this.ctrl(data);
  }

  getService(name) {
    return this.services[name];
  }
  
}
