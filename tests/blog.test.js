const Page = require('./helpers/page');
const Blog = require('../models/Blog');

jest.setTimeout(30000);

describe('Blogs', () => {
  let page;

  beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:5000');
  });

  afterEach(async () => {
    await page.close();
  });

  describe('user loggedIn ', () => {
    beforeEach(async () => {
      await page.login();
      await page.click('a[href="blogs/new"]');
    });

    afterEach(async () => {
      await page.close();
      await Blog.deleteMany({});
    });

    it('should appear form title label on screen whenever user clicked the add button', async () => {
      const label = await page.getContextOf('label.form-label');
      expect(label).toEqual('Title');
    });

    describe('and using valid input', () => {
      beforeEach(async () => {
        await page.type('input.form-control', 'myTitle');
        await page.type('textarea.form-control', 'myContent');
        await page.click('#done');

        it('should redirect to blogs url and show show list of blogs', async () => {
          const text = await page.getContextOf('p');

          expect(text).toEqual('myContent');
        });
      });
    });

    describe('and using invalid input', () => {
      beforeEach(async () => {
        await page.waitFor('#done');
        await page.click('#done');
      });

      it('should appear error massage on screen when user not fill forms', async () => {
        await page.waitFor('div.fade.alert');
        const text = await page.getContextOf('div.fade.alert');
        expect(text).toEqual('Value Must Be Provided');
      });
    });
  });

  describe('user NOT loggedIn ', () => {
    it('should return an error when user not loggedIn and try to post a blog.', async () => {
      const result = await page.evaluate(() => {
        return fetch('/api/blogs', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: 'T', content: 'C' })
        }).then(res => res.json());
      });
      expect(result).toEqual({ error: 'require login' });
    });

    it('should return an error when user not loggedIn and try to send a get request to blogs', async () => {
      const result = await page.evaluate(() =>
        fetch('/api/blogs').then(res => res.json())
      );
      expect(result).toEqual({ error: 'require login' });
    });
  });
});
