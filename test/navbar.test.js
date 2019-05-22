const sessionFactory = require('./factories/session');
const userFactory = require('./factories/user');
const User = require('../models/User');
const Page = require('./helpers/page');

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
    const user = await userFactory();
    const session = sessionFactory(user);

    await page.setCookie({
      name: 'session',
      value: session
    });
    await page.goto('localhost:5000/blogs');
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
  });
});
