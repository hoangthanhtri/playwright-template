import { Page } from '@playwright/test';
import { SideMenuModuleObject } from './objects/side-menu-module-object';

export class SideMenuModule {
  readonly sideMenuModuleObject: SideMenuModuleObject;
  constructor(private page: Page) {
    this.page = page;
    this.sideMenuModuleObject = new SideMenuModuleObject(page);
  }

  async searchInSideMenu(searchText: string) {
    await this.sideMenuModuleObject.seachInput.fill(searchText);
  }
}
