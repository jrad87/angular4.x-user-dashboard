import { UserDashboardPage } from './app.po';

describe('user-dashboard App', () => {
  let page: UserDashboardPage;

  beforeEach(() => {
    page = new UserDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
