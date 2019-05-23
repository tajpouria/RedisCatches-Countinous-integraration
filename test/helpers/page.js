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
  }

  async getContextOf(selector) {
    const context = await this.page.$eval(selector, el => el.innerHTML);
    return context;
  }
}

module.exports = CustomPage;
