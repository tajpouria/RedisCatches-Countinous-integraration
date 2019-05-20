const Buffer = require('safe-buffer').Buffer;
const puppeteer = require('puppeteer');

describe('Navbar', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto('localhost:5000');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should show BlogSter logo whenever application boots up', async () => {
    const text = await page.$eval('a.navbar-brand', el => el.innerHTML);
    expect(text).toEqual('BlogSter');
  });

  it('should redirect to OAuth flow whenever signIn clicked', async () => {
    await page.click('a[href="/auth/google"]');

    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });

  it('should show signOut whenever user successfully signIn', () => {
    const sessionString = '{"passport":{"user":"5cde925b0fad38600a0a5762"}}';
    const session = Buffer.from(sessionString).toString('base64');
  });
});
