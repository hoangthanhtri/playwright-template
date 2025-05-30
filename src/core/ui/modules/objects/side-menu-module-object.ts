import { Page } from '@playwright/test';

export class SideMenuModuleObject {
  constructor(private page: Page) {}

  get sideMenuContainer() {
    return this.page.locator('//nav[@aria-label="Sidepanel"]');
  }

  get seachInput() {
    return this.sideMenuContainer.getByPlaceholder('Search');
  }

  get adminMenuItem() {
    return this.sideMenuContainer.getByText('Admin', { exact: true });
  }

  get pimMenuItem() {
    return this.sideMenuContainer.getByText('PIM', { exact: true });
  }

  get leaveMenuItem() {
    return this.sideMenuContainer.getByText('Leave', { exact: true });
  }

  get recruitmentMenuItem() {
    return this.sideMenuContainer.getByText('Recruitment', { exact: true });
  }

  get timeMenuItem() {
    return this.sideMenuContainer.getByText('Time', { exact: true });
  }

  get myInfoMenuItem() {
    return this.sideMenuContainer.getByText('My Info', { exact: true });
  }

  get performanceMenuItem() {
    return this.sideMenuContainer.getByText('Performance', { exact: true });
  }

  get dashboardMenuItem() {
    return this.sideMenuContainer.getByText('Dashboard', { exact: true });
  }

  get directoryMenuItem() {
    return this.sideMenuContainer.getByText('Directory', { exact: true });
  }

  get maintenanceMenuItem() {
    return this.sideMenuContainer.getByText('Maintenance', { exact: true });
  }

  get claimMenuItem() {
    return this.sideMenuContainer.getByText('Claim', { exact: true });
  }

  get buzzMenuItem() {
    return this.sideMenuContainer.getByText('Buzz', { exact: true });
  }
}
