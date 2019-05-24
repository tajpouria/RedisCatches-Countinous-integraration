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
    const actions = [
      {
        method: 'get',
        path: '/api/blogs'
      },
      {
        method: 'post',
        path: '/api/blogs',
        data: { title: 'T', content: 'C' }
      }
    ];

    it('prohibited actions', async () => {
      const results = await page.sendRequest(actions);

      for (result of results)
        expect(result).toEqual({ error: 'require login' });
    });
  });
});
