import { expect, Locator, Page, Selectors } from '@playwright/test';

export const getTextboxByLabel = (page: Page, label: string) => {
  return page.locator(`//label[text()="${label}"]/ancestor::div[contains(@class,"oxd-input-group")]//input`);
};

export const getCheckboxByLabel = (page: Page, label: string) => {
  return page.locator(`//label[text()="${label}"]/ancestor::div[contains(@class,"oxd-input-group")]//input[@type="checkbox"]`);
};

export const getSelectByLabel = (page: Page, label: string) => {
  return page.locator(`//label[text()="${label}"]/ancestor::div[contains(@class,"oxd-input-group")]//div[@class="oxd-select-wrapper"]`);
};

export const getSelectOptionByLabel = (page: Page, optionText: string) => {
  return page.locator(`//div[contains(@class,"oxd-select-option")]//span[text()="${optionText}"]`);
};

export const getAutocompleteOptionByLabel = (page: Page, optionText: string) => {
  return page.locator(`//div[@class="oxd-autocomplete-option"]//span[text()="${optionText}"]`);
};

export const getRowInTable = async (page: Page, columnName: string, cellValue: string): Promise<Locator> => {
  const table = page.locator('//div[@role="table"]');
  await expect(table.locator(`//div[@role="columnheader" and text()="${columnName}"]`)).toBeVisible();
  const columnHeaderContents = await table.locator(`//div[@role="columnheader"]`).allInnerTexts();
  const columnIndex = columnHeaderContents.findIndex((headerContent) => headerContent.includes(columnName));
  const rows = await table.locator(`//div[@role="row"]`).all();
  for (const row of rows) {
    const rowCells = await row.locator(`//div[@role="cell"]`).allInnerTexts();
    if (rowCells[columnIndex] === cellValue) {
      return row;
    }
  }
  throw new Error(`Row with cell value "${cellValue}" in column "${columnName}" not found.`);
};

export const getEditButtonInRowOfTable = async (page: Page, columnName: string, cellValue: string): Promise<Locator> => {
  const row = await getRowInTable(page, columnName, cellValue);
  return row.locator(`//i[contains(@class,"pencil")]/parent::button`);
};

export const getDeleteButtonInRowOfTable = async (page: Page, columnName: string, cellValue: string): Promise<Locator> => {
  const row = await getRowInTable(page, columnName, cellValue);
  return row.locator(`//i[contains(@class,"trash")]/parent::button`);
};
