const User = require('../models/User');
const Page = require('./helpers/page');

jest.setTimeout(30000);

describe('Navbar', () => {
  let page;

  beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:5000');
  });

  afterEach(async () => {
    await page.close();
    await User.deleteMany({});
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

  it('should show signOut whenever user successfully signIn', async () => {
    await page.login();

    const text = await page.getContextOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
  });
});
