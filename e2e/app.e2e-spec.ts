import { LgIdmWebPage } from './app.po';

describe('lg-idm-web App', function() {
  let page: LgIdmWebPage;

  beforeEach(() => {
    page = new LgIdmWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
