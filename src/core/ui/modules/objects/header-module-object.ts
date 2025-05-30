export class HeaderModuleObject {
  readonly page: any;

  constructor(page: any) {
    this.page = page;
  }

  get breadcrumbs() {
    return this.page.locator('//span[@class="oxd-topbar-header-breadcrumb"]');
  }

  get upgradeButton() {
    return this.page.getByRole('button', {
      name: ' Upgrade',
      exact: true
    });
  }

  get userProfileDropdown() {
    return this.page.locator('//span[@class="oxd-userdropdown-tab"]');
  }

  get userProfileDropdownOptions() {
    return this.page.locator('//a[@role="menuitem"]');
  }
}
