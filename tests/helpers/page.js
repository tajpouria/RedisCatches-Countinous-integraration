const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/session');
const userFactory = require('../factories/user');

class CustomPage {
  constructor(page) {
    this.page = page;
  }

  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: (target, key) => {
        return customPage[key] || browser[key] || page[key];
      }
    });
  }

  async login() {
    const user = await userFactory();
    const session = sessionFactory(user);

    await this.page.setCookie({
      name: 'session',
      value: session
    });

    await this.page.goto('localhost:5000/blogs');
  }

  async getContextOf(selector) {
    const context = await this.page.$eval(selector, el => el.innerHTML);
    return context;
  }

  sendRequest(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => this[method](path, data))
    );
  }

  async get(path) {
    return this.page.evaluate(
      _path => fetch(_path).then(res => res.json()),
      path
    );
  }

  async post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_data)
        }).then(res => res.json());
      },
      path,
      data
    );
  }
}

module.exports = CustomPage;
