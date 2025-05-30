import { Page } from '@playwright/test';
import { SideMenuModule } from '../modules/side-menu-module';
import { HeaderModuleObject } from '../modules/objects/header-module-object';
import { BasePageObject } from './objects/base-page-object';

export class BagePage {
  readonly basePageObject: BasePageObject;
  readonly sideMenuModuleObject: SideMenuModule;
  readonly headerModuleObject: HeaderModuleObject;
  constructor(readonly page: Page) {
    this.page = page;
    this.basePageObject = new BasePageObject(page);
    this.sideMenuModuleObject = new SideMenuModule(page);
    this.headerModuleObject = new HeaderModuleObject(page);
  }

  async navigateToHomePage() {
    await this.page.goto('/');
  }

  async navigateToAdminPage() {
    await this.page.goto('/');
    await this.sideMenuModuleObject.sideMenuModuleObject.adminMenuItem.click();
  }

  async navigateToPIMPage() {
    await this.page.goto('/');
    await this.sideMenuModuleObject.sideMenuModuleObject.pimMenuItem.click();
  }
}
