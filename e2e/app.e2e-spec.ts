import { ImpexPage } from './app.po';

describe('impex App', function() {
  let page: ImpexPage;

  beforeEach(() => {
    page = new ImpexPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
