const puppeteer = require('puppeteer');

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
      get: function(target, key) {
        return customPage[key] || browser[key] || page[key];
      }
    });
  }
}

module.exports = CustomPage;
